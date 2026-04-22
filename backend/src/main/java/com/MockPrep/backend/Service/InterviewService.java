package com.MockPrep.backend.Service;

import com.MockPrep.backend.Model.*;
import com.MockPrep.backend.Repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InterviewService {
    
    @Autowired
    private InterviewRepository interviewRepository;
    
    @Autowired
    private GeminiService geminiService;
    
    private final Map<String, Timer> activeTimers = new ConcurrentHashMap<>();
    
    @Transactional
    public InterviewSession startInterview(String userEmail, String domain, String interviewType, 
                                           String level, int durationMinutes) {
        try {
            System.out.println("Starting interview for: " + userEmail);
            System.out.println("Domain: " + domain + ", Type: " + interviewType + 
                             ", Level: " + level + ", Duration: " + durationMinutes);
            
            // Calculate number of questions based on duration
            int numberOfQuestions = calculateQuestionCount(durationMinutes);
            
            // Generate questions dynamically using Gemini
            List<Question> questions = geminiService.generateQuestions(
                domain, interviewType, level, numberOfQuestions);
            
            // Set order numbers
            for (int i = 0; i < questions.size(); i++) {
                questions.get(i).setOrderNumber(i);
            }
            
            // Create and save session
            InterviewSession session = new InterviewSession();
            session.setUserEmail(userEmail);
            session.setDomain(domain);
            session.setInterviewType(interviewType);
            session.setLevel(level);
            session.setDurationMinutes(durationMinutes);
            session.setStartTime(LocalDateTime.now());
            session.setQuestions(questions);
            session.setStatus("IN_PROGRESS");
            session.setCurrentQuestionIndex(0);
            
            InterviewSession savedSession = interviewRepository.save(session);
            System.out.println("Session created with ID: " + savedSession.getId() + 
                             ", Questions: " + savedSession.getQuestions().size());
            
            return savedSession;
            
        } catch (Exception e) {
            System.err.println("Error starting interview: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to start interview: " + e.getMessage(), e);
        }
    }
    
    private int calculateQuestionCount(int durationMinutes) {
        if (durationMinutes <= 15) return 3;
        if (durationMinutes <= 30) return 5;
        if (durationMinutes <= 45) return 7;
        return 10;
    }
    
    @Transactional
    public Question submitAnswer(String sessionId, int questionIndex, String answer, byte[] audioData) {
        InterviewSession session = interviewRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
        
        if (questionIndex >= session.getQuestions().size()) {
            throw new RuntimeException("Invalid question index");
        }
        
        Question question = session.getQuestions().get(questionIndex);
        
        // Process audio if provided
        if (audioData != null && audioData.length > 0) {
            try {
                String transcription = geminiService.transcribeAudio(audioData);
                question.setAudioTranscription(transcription);
                question.setUserAnswer(transcription);
                System.out.println("Audio transcribed: " + transcription.substring(0, Math.min(100, transcription.length())));
            } catch (Exception e) {
                System.err.println("Error transcribing audio: " + e.getMessage());
                question.setUserAnswer(answer != null ? answer : "");
            }
        } else {
            question.setUserAnswer(answer != null ? answer : "");
        }
        
        question.setAnsweredAt(LocalDateTime.now());
        
        // Calculate response time
        if (session.getStartTime() != null && question.getAnsweredAt() != null) {
            long responseTime = java.time.Duration.between(session.getStartTime(), question.getAnsweredAt()).getSeconds();
            question.setResponseTimeSeconds(responseTime);
        }
        
        // Evaluate answer using Gemini
        try {
            QuestionEvaluation evaluation = geminiService.evaluateAnswer(
                question.getText(), 
                question.getUserAnswer(),
                question.getType(),
                session.getDomain()
            );
            question.setEvaluation(evaluation);
            System.out.println("Question " + questionIndex + " evaluated - Score: " + evaluation.getScore());
        } catch (Exception e) {
            System.err.println("Error evaluating answer: " + e.getMessage());
            // Set default evaluation
            QuestionEvaluation fallback = new QuestionEvaluation();
            fallback.setScore(70);
            fallback.setAccuracy("Good");
            fallback.setFeedback("Your answer was recorded. Final analysis will be available after interview completion.");
            fallback.setStrengths(Arrays.asList("Attempted to answer"));
            fallback.setImprovements(Arrays.asList("Provide more details", "Use specific examples"));
            question.setEvaluation(fallback);
        }
        
        // Update session
        session.setCurrentQuestionIndex(questionIndex + 1);
        interviewRepository.save(session);
        
        return question;
    }
    
    @Transactional
    public CompleteInterviewAnalysis completeInterview(String sessionId) {
        InterviewSession session = interviewRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
        
        session.setEndTime(LocalDateTime.now());
        session.setStatus("COMPLETED");
        
        // Analyze complete interview with all answers
        try {
            System.out.println("Analyzing complete interview for session: " + sessionId);
            CompleteInterviewAnalysis analysis = geminiService.analyzeCompleteInterview(
                session.getQuestions(),
                session.getDomain(),
                session.getInterviewType(),
                session.getLevel()
            );
            
            session.setAnalysis(analysis);
            interviewRepository.save(session);
            
            // Cancel timer if exists
            Timer timer = activeTimers.remove(sessionId);
            if (timer != null) {
                timer.cancel();
            }
            
            return analysis;
            
        } catch (Exception e) {
            System.err.println("Error analyzing interview: " + e.getMessage());
            e.printStackTrace();
            
            // Create fallback analysis
            CompleteInterviewAnalysis fallback = createFallbackAnalysis(session);
            session.setAnalysis(fallback);
            interviewRepository.save(session);
            
            return fallback;
        }
    }
    
    private CompleteInterviewAnalysis createFallbackAnalysis(InterviewSession session) {
        CompleteInterviewAnalysis analysis = new CompleteInterviewAnalysis();
        
        // Calculate average score from answered questions
        double avgScore = session.getQuestions().stream()
            .filter(q -> q.getEvaluation() != null)
            .mapToInt(q -> q.getEvaluation().getScore())
            .average()
            .orElse(70);
        
        analysis.setOverallScore((int) avgScore);
        analysis.setOverallAccuracy(avgScore >= 90 ? "Excellent" : avgScore >= 70 ? "Good" : avgScore >= 50 ? "Average" : "Poor");
        
        Map<String, Integer> skillScores = new HashMap<>();
        skillScores.put("Technical Knowledge", (int) avgScore);
        skillScores.put("Communication", (int) avgScore);
        skillScores.put("Problem Solving", (int) avgScore);
        analysis.setSkillScores(skillScores);
        
        analysis.setOverallStrengths(Arrays.asList("Completed the interview", "Attempted all questions"));
        analysis.setAreasForImprovement(Arrays.asList("Practice more", "Provide detailed answers"));
        analysis.setDetailedAnalysis("Your interview has been completed. Review your answers to improve.");
        analysis.setRecommendations(Arrays.asList("Review technical concepts", "Practice with more questions"));
        analysis.setSummary("Good attempt! Keep practicing.");
        
        return analysis;
    }
    
    public InterviewSession getInterviewSession(String sessionId) {
        return interviewRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
    }
    
    public List<InterviewSession> getUserInterviews(String userEmail) {
        return interviewRepository.findByUserEmailOrderByStartTimeDesc(userEmail);
    }
    
    public Map<String, Object> getDashboardData(String userEmail) {
        List<InterviewSession> sessions = getUserInterviews(userEmail);
        
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalInterviews", sessions.size());
        
        // Calculate average score from completed interviews
        double avgScore = sessions.stream()
            .filter(s -> s.getAnalysis() != null && "COMPLETED".equals(s.getStatus()))
            .mapToInt(s -> s.getAnalysis().getOverallScore())
            .average()
            .orElse(0);
        dashboardData.put("averageScore", avgScore);
        
        // Get recent interviews
        List<Map<String, Object>> recentInterviews = new ArrayList<>();
        for (int i = 0; i < Math.min(10, sessions.size()); i++) {
            InterviewSession s = sessions.get(i);
            Map<String, Object> interview = new HashMap<>();
            interview.put("id", s.getId());
            interview.put("domain", s.getDomain());
            interview.put("type", s.getInterviewType());
            interview.put("level", s.getLevel());
            interview.put("startTime", s.getStartTime());
            interview.put("duration", s.getDurationMinutes());
            interview.put("status", s.getStatus());
            if (s.getAnalysis() != null) {
                interview.put("score", s.getAnalysis().getOverallScore());
                interview.put("accuracy", s.getAnalysis().getOverallAccuracy());
            }
            recentInterviews.add(interview);
        }
        dashboardData.put("recentInterviews", recentInterviews);
        
        return dashboardData;
    }
}