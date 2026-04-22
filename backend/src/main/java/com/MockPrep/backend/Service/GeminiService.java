package com.MockPrep.backend.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.MockPrep.backend.Model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class GeminiService {
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    @Value("${gemini.model:gemini-2.5-flash}")
    private String modelName;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public GeminiService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    private String callGeminiAPI(String prompt) {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;
            
            System.out.println("Calling Gemini API with model: " + modelName);
            
            // Create the request body
            Map<String, Object> requestBody = new HashMap<>();
            
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            
            List<Map<String, Object>> parts = new ArrayList<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);
            
            content.put("parts", parts);
            contents.add(content);
            requestBody.put("contents", contents);
            
         
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.7);
            generationConfig.put("maxOutputTokens", 2048);
            generationConfig.put("topP", 0.95);
            generationConfig.put("topK", 40);
            requestBody.put("generationConfig", generationConfig);
            
            
            String jsonBody = objectMapper.writeValueAsString(requestBody);
            
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
            
            
            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
            );
            
            
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode candidates = root.path("candidates");
            
            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode textNode = candidates.get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");
                
                if (!textNode.isMissingNode()) {
                    return textNode.asText();
                }
            }
            
            throw new RuntimeException("No valid response from Gemini API");
            
        } catch (Exception e) {
            System.err.println("Gemini API call failed: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Gemini API call failed: " + e.getMessage(), e);
        }
    }

    private String extractJSON(String text) {
        text = text.trim();
        if (text.startsWith("```json")) {
            text = text.substring(7);
        } else if (text.startsWith("```")) {
            text = text.substring(3);
        }
        if (text.endsWith("```")) {
            text = text.substring(0, text.length() - 3);
        }
        return text.trim();
    }
    private String mapQuestionType(String typeFromGemini) {
        String type = typeFromGemini.toUpperCase();
        if (type.contains("TECHNICAL") || type.contains("SYSTEM DESIGN") || 
            type.contains("CODING") || type.contains("ARCHITECTURE")) {
            return "TECHNICAL";
        } else if (type.contains("BEHAVIORAL") || type.contains("EXPERIENCE") || 
                   type.contains("SITUATION") || type.contains("SCENARIO")) {
            return "BEHAVIORAL";
        } else {
            return "SITUATIONAL";
        }
    }

    public List<Question> generateQuestions(String domain, String type, String level, int count) {
        String prompt = String.format(
            "Generate exactly %d interview questions for a %s interview in %s domain at %s level. " +
            "Create a mix of technical and behavioral questions appropriate for this level. " +
            "Return ONLY a valid JSON array. Each question must have 'text' and 'type' fields. " +
            "Type should be: 'Technical', 'Behavioral', or 'System Design'. " +
            "Make questions challenging, realistic, and relevant to %s. " +
            "Example format: [{\"text\": \"What is inheritance in object-oriented programming?\", \"type\": \"Technical\"}, " +
            "{\"text\": \"Tell me about a challenging project you worked on\", \"type\": \"Behavioral\"}] " +
            "Return ONLY the JSON array, no other text or explanation.",
            count, type, domain, level, domain
        );
        
        try {
            String response = callGeminiAPI(prompt);
            System.out.println("Generated questions: " + response);
            return parseGeneratedQuestions(response);
        } catch (Exception e) {
            System.err.println("Error generating questions, using fallback: " + e.getMessage());
            return getFallbackQuestions(domain, type, count);
        }
    }
    
    private List<Question> getFallbackQuestions(String domain, String type, int count) {
        List<Question> questions = new ArrayList<>();
        String[] technicalQuestions = {
            "Explain the core concepts of " + domain + " and how they apply in real-world scenarios.",
            "What are the best practices for developing scalable solutions in " + domain + "?",
            "Describe your experience with testing and quality assurance in " + domain + ".",
            "How do you handle technical debt and code maintenance in your projects?",
            "What's your approach to debugging complex issues in " + domain + "?"
        };
        
        String[] behavioralQuestions = {
            "Describe a challenging problem you solved in " + domain + " and walk me through your approach.",
            "Tell me about a time you had to learn a new technology quickly.",
            "How do you handle disagreements with team members about technical decisions?",
            "Describe a situation where you had to meet a tight deadline.",
            "How do you stay updated with the latest trends and technologies in " + domain + "?"
        };
        
        for (int i = 0; i < count; i++) {
            Question q = new Question();
            q.setId(UUID.randomUUID().toString());
            
            if (type.toUpperCase().contains("TECHNICAL") || (i % 2 == 0 && !type.toUpperCase().contains("BEHAVIORAL"))) {
                q.setText(technicalQuestions[i % technicalQuestions.length]);
                q.setType("TECHNICAL");
            } else {
                q.setText(behavioralQuestions[i % behavioralQuestions.length]);
                q.setType("BEHAVIORAL");
            }
            questions.add(q);
        }
        
        return questions;
    }

    public QuestionEvaluation evaluateAnswer(String question, String answer, String questionType, String domain) {
        String prompt = String.format(
            "You are a strict but fair technical interviewer. Evaluate this answer for a %s interview question in %s domain.\n\n" +
            "QUESTION: %s\n\n" +
            "CANDIDATE'S ANSWER: %s\n\n" +
            "INSTRUCTIONS:\n" +
            "1. First, determine if the answer is relevant to the question. If the answer is completely off-topic, unrelated, or doesn't address the question, give a score of 0-20.\n" +
            "2. If the answer is partially relevant but missing key points, give a score of 21-50.\n" +
            "3. If the answer is mostly correct but lacks depth or examples, give a score of 51-80.\n" +
            "4. If the answer is comprehensive, accurate, and well-structured, give a score of 81-100.\n\n" +
            "Return ONLY a JSON object with these exact fields:\n" +
            "- score: integer (0-100 based on relevance and accuracy)\n" +
            "- accuracy: string (Excellent, Good, Average, Poor, or Off-Topic)\n" +
            "- feedback: string (2-3 sentences explaining why the answer received this score)\n" +
            "- strengths: array of strings (what was done well, even if the answer was off-topic, mention any effort)\n" +
            "- improvements: array of strings (specific areas for improvement, including if the answer was completely wrong)\n" +
            "- suggestedAnswer: string (a short, simple, correct answer to the question, 2-3 sentences max)\n\n" +
            "CRITICAL RULES:\n" +
            "- If the answer is completely unrelated to the question, clearly state that in feedback and give a low score.\n" +
            "- Be honest but constructive. Don't sugarcoat incorrect answers.\n" +
            "- The suggested answer should be concise and easy to understand.\n" +
            "Return ONLY the JSON object, no other text.",
            questionType, domain, question, answer
        );
        
        try {
            String response = callGeminiAPI(prompt);
            return parseQuestionEvaluation(response);
        } catch (Exception e) {
            System.err.println("Error evaluating answer: " + e.getMessage());
            return getFallbackEvaluation(question);
        }
    }
    
    private QuestionEvaluation getFallbackEvaluation(String question) {
        QuestionEvaluation evaluation = new QuestionEvaluation();
        evaluation.setScore(0);
        evaluation.setAccuracy("Poor");
        evaluation.setFeedback("We couldn't evaluate your answer at this moment. Please try again or provide a more detailed answer.");
        evaluation.setStrengths(Arrays.asList("Attempted to provide an answer"));
        evaluation.setImprovements(Arrays.asList("Make sure your answer directly addresses the question", "Provide specific examples", "Be clear and concise"));
        evaluation.setSuggestedAnswer("Please provide a clear and relevant answer to the question: " + question.substring(0, Math.min(100, question.length())));
        return evaluation;
    }

    public CompleteInterviewAnalysis analyzeCompleteInterview(List<Question> questions, String domain, String type, String level) {
        StringBuilder transcript = new StringBuilder();
        transcript.append("Complete Interview Analysis\n");
        transcript.append("==========================\n");
        transcript.append("Domain: ").append(domain).append("\n");
        transcript.append("Interview Type: ").append(type).append("\n");
        transcript.append("Level: ").append(level).append("\n\n");
        
        // Calculate overall statistics
        int totalScore = 0;
        int answeredQuestions = 0;
        int offTopicCount = 0;
        
        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            transcript.append("Question ").append(i+1).append(" (").append(q.getType()).append("):\n");
            transcript.append(q.getText()).append("\n");
            transcript.append("Answer: ").append(q.getUserAnswer()).append("\n");
            if (q.getEvaluation() != null) {
                int score = q.getEvaluation().getScore();
                totalScore += score;
                answeredQuestions++;
                if (score < 30) {
                    offTopicCount++;
                }
                transcript.append("Score: ").append(score).append("/100\n");
                transcript.append("Feedback: ").append(q.getEvaluation().getFeedback()).append("\n");
            }
            transcript.append("---\n\n");
        }
        
        int averageScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
        double accuracyPercentage = (double) (answeredQuestions - offTopicCount) / answeredQuestions * 100;
        
        String overallAccuracy;
        if (averageScore >= 80) overallAccuracy = "Excellent";
        else if (averageScore >= 60) overallAccuracy = "Good";
        else if (averageScore >= 40) overallAccuracy = "Average";
        else overallAccuracy = "Poor";
        
        String prompt = String.format(
            "You are an expert interview coach. Analyze this complete interview and provide comprehensive feedback.\n\n%s\n\n" +
            "STATISTICS:\n" +
            "- Average Score: %d/100\n" +
            "- Accuracy Rate: %.1f%% of answers were relevant\n" +
            "- Questions that were off-topic: %d out of %d\n\n" +
            "Provide a detailed analysis. Return ONLY a JSON object with these exact fields:\n" +
            "- overallScore: integer (the average score %d)\n" +
            "- overallAccuracy: string (Excellent, Good, Average, or Poor based on the average score)\n" +
            "- skillScores: object with these keys (values 0-100): 'Technical Knowledge', 'Communication', 'Problem Solving', 'Clarity'\n" +
            "- overallStrengths: array of strings (2-3 main strengths demonstrated across the interview)\n" +
            "- areasForImprovement: array of strings (2-3 key areas to focus on for improvement)\n" +
            "- detailedAnalysis: string (3-4 sentences providing comprehensive analysis, mention if many answers were off-topic)\n" +
            "- recommendations: array of strings (2-3 specific, actionable recommendations for improvement)\n" +
            "- summary: string (1-2 sentences summarizing overall performance)\n\n" +
            "Be honest but constructive. If the candidate performed poorly, say so clearly but provide actionable feedback.\n" +
            "Return ONLY the JSON object, no other text.",
            transcript.toString(), averageScore, accuracyPercentage, offTopicCount, questions.size(), averageScore
        );
        
        try {
            String response = callGeminiAPI(prompt);
            return parseCompleteAnalysis(response, averageScore);
        } catch (Exception e) {
            System.err.println("Error analyzing interview: " + e.getMessage());
            return getFallbackAnalysis(averageScore);
        }
    }
    
    private CompleteInterviewAnalysis parseCompleteAnalysis(String response, int defaultScore) {
        try {
            String json = extractJSON(response);
            return objectMapper.readValue(json, CompleteInterviewAnalysis.class);
        } catch (Exception e) {
            System.err.println("Error parsing analysis: " + e.getMessage());
            return getFallbackAnalysis(defaultScore);
        }
    }
    
    private CompleteInterviewAnalysis getFallbackAnalysis(int averageScore) {
        CompleteInterviewAnalysis analysis = new CompleteInterviewAnalysis();
        analysis.setOverallScore(averageScore);
        
        if (averageScore >= 80) analysis.setOverallAccuracy("Excellent");
        else if (averageScore >= 60) analysis.setOverallAccuracy("Good");
        else if (averageScore >= 40) analysis.setOverallAccuracy("Average");
        else analysis.setOverallAccuracy("Poor");
        
        Map<String, Integer> skillScores = new HashMap<>();
        skillScores.put("Technical Knowledge", averageScore);
        skillScores.put("Communication", averageScore);
        skillScores.put("Problem Solving", averageScore);
        skillScores.put("Clarity", averageScore);
        analysis.setSkillScores(skillScores);
        
        if (averageScore < 40) {
            analysis.setOverallStrengths(Arrays.asList("Attempted to complete the interview"));
            analysis.setAreasForImprovement(Arrays.asList("Review the fundamental concepts", "Practice answering relevant questions", "Ensure answers directly address the question"));
            analysis.setDetailedAnalysis("Your performance indicates significant room for improvement. Focus on understanding the questions clearly and providing relevant answers. Consider reviewing basic concepts in your domain.");
            analysis.setRecommendations(Arrays.asList("Take time to understand each question before answering", "Practice with sample interview questions", "Review fundamental concepts"));
            analysis.setSummary("Needs improvement. Focus on providing relevant answers to questions.");
        } else if (averageScore < 60) {
            analysis.setOverallStrengths(Arrays.asList("Made an effort to answer questions", "Showed some understanding"));
            analysis.setAreasForImprovement(Arrays.asList("Provide more specific examples", "Structure answers more clearly", "Add technical depth"));
            analysis.setDetailedAnalysis("You have a basic understanding but need to improve the quality and relevance of your answers. Focus on providing specific examples and structuring your responses.");
            analysis.setRecommendations(Arrays.asList("Use the STAR method for behavioral questions", "Review technical concepts", "Practice with more questions"));
            analysis.setSummary("Good attempt, but there's room for significant improvement.");
        } else {
            analysis.setOverallStrengths(Arrays.asList("Good understanding of concepts", "Clear communication", "Relevant answers"));
            analysis.setAreasForImprovement(Arrays.asList("Add more specific examples", "Deepen technical explanations", "Improve answer structure"));
            analysis.setDetailedAnalysis("You performed well in this interview. Your answers were mostly relevant and showed good understanding. Continue practicing to reach excellence.");
            analysis.setRecommendations(Arrays.asList("Practice with advanced questions", "Work on providing more detailed examples", "Review industry best practices"));
            analysis.setSummary("Good performance! Keep practicing to become excellent.");
        }
        
        return analysis;
    }


    private List<Question> parseGeneratedQuestions(String response) {
        try {
            String json = extractJSON(response);
            System.out.println("Parsing JSON: " + json);
            JsonNode node = objectMapper.readTree(json);
            List<Question> questions = new ArrayList<>();
            
            if (node.isArray()) {
                for (JsonNode qNode : node) {
                    Question q = new Question();
                    q.setId(UUID.randomUUID().toString());
                    q.setText(qNode.path("text").asText());
                    
                    // Handle type mapping
                    String typeFromGemini = qNode.path("type").asText();
                    q.setType(mapQuestionType(typeFromGemini));
                    
                    questions.add(q);
                }
            }
            
            if (questions.isEmpty()) {
                throw new Exception("No questions parsed");
            }
            
            System.out.println("Successfully parsed " + questions.size() + " questions");
            return questions;
        } catch (Exception e) {
            System.err.println("Error parsing questions: " + e.getMessage());
            return getFallbackQuestions("Software Development", "TECHNICAL", 5);
        }
    }

    private QuestionEvaluation parseQuestionEvaluation(String response) {
        try {
            String json = extractJSON(response);
            return objectMapper.readValue(json, QuestionEvaluation.class);
        } catch (Exception e) {
            System.err.println("Error parsing evaluation: " + e.getMessage());
            QuestionEvaluation fallback = new QuestionEvaluation();
            fallback.setScore(0);
            fallback.setAccuracy("Poor");
            fallback.setFeedback("We couldn't evaluate your answer. Please ensure your answer is relevant to the question.");
            fallback.setStrengths(Arrays.asList("Provided an answer"));
            fallback.setImprovements(Arrays.asList("Make sure your answer directly addresses the question", "Provide clear and relevant information"));
            fallback.setSuggestedAnswer("Please provide a clear and relevant answer that directly addresses the question.");
            return fallback;
        }
    }
 
public String transcribeAudio(byte[] audioData) {
    try {
        String base64Audio = Base64.getEncoder().encodeToString(audioData);
        
        String prompt = "Please transcribe this audio recording accurately. Return only the transcribed text, no additional explanation.";
        
        String url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;
        
        Map<String, Object> requestBody = new HashMap<>();
        
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> content = new HashMap<>();
        
        List<Map<String, Object>> parts = new ArrayList<>();
        
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", prompt);
        parts.add(textPart);
        
        Map<String, Object> audioPart = new HashMap<>();
        Map<String, Object> inlineData = new HashMap<>();
        inlineData.put("mime_type", "audio/wav");
        inlineData.put("data", base64Audio);
        audioPart.put("inline_data", inlineData);
        parts.add(audioPart);
        
        content.put("parts", parts);
        contents.add(content);
        requestBody.put("contents", contents);
        
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 1024);
        requestBody.put("generationConfig", generationConfig);
        
        String jsonBody = objectMapper.writeValueAsString(requestBody);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
        
        ResponseEntity<String> response = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            String.class
        );
        
        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode candidates = root.path("candidates");
        
        if (candidates.isArray() && candidates.size() > 0) {
            JsonNode textNode = candidates.get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text");
            
            if (!textNode.isMissingNode()) {
                String transcription = textNode.asText();
                System.out.println("Transcription: " + transcription);
                return transcription;
            }
        }
        
        return "Could not transcribe audio. Please try again or type your answer.";
        
    } catch (Exception e) {
        System.err.println("Error transcribing audio: " + e.getMessage());
        e.printStackTrace();
        return "Voice transcription failed. Please type your answer.";
    }
}
}
