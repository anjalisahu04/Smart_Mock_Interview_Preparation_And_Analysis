package com.MockPrep.backend.Controller;

import com.MockPrep.backend.Model.*;
import com.MockPrep.backend.Service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {
    
    @Autowired
    private InterviewService interviewService;
    
    @PostMapping("/start")
    public ResponseEntity<?> startInterview(@RequestBody Map<String, Object> request, Authentication auth) {
        try {
            String userEmail = auth.getName();
            
            // Extract values with proper type handling
            String domain = (String) request.get("domain");
            String interviewType = (String) request.get("interviewType");
            String level = (String) request.get("level");
            
            // Handle durationMinutes - it could be Integer or String
            int durationMinutes;
            Object durationObj = request.get("durationMinutes");
            if (durationObj instanceof Integer) {
                durationMinutes = (Integer) durationObj;
            } else if (durationObj instanceof String) {
                durationMinutes = Integer.parseInt((String) durationObj);
            } else {
                durationMinutes = 30; // default
            }
            
            System.out.println("Starting interview for: " + userEmail);
            System.out.println("Domain: " + domain);
            System.out.println("Type: " + interviewType);
            System.out.println("Level: " + level);
            System.out.println("Duration: " + durationMinutes);
            
            InterviewSession session = interviewService.startInterview(
                userEmail, domain, interviewType, level, durationMinutes
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("session", session);
            response.put("durationMinutes", durationMinutes);
            response.put("totalQuestions", session.getQuestions().size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error starting interview: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
@PostMapping("/{sessionId}/answer")
public ResponseEntity<?> submitAnswer(
        @PathVariable String sessionId,
        @RequestParam int questionIndex,
        @RequestParam(required = false) String answer,
        @RequestParam(required = false) MultipartFile audio) {
    try {
        System.out.println("=== SUBMIT ANSWER ===");
        System.out.println("Session ID: " + sessionId);
        System.out.println("Question Index: " + questionIndex);
        System.out.println("Answer text: " + (answer != null ? answer.substring(0, Math.min(100, answer.length())) : "null"));
        System.out.println("Audio file: " + (audio != null ? audio.getOriginalFilename() + " (" + audio.getSize() + " bytes)" : "null"));
        
        byte[] audioData = audio != null ? audio.getBytes() : null;
        Question question = interviewService.submitAnswer(sessionId, questionIndex, answer, audioData);
        
        Map<String, Object> response = new HashMap<>();
        response.put("question", question);
        response.put("evaluation", question.getEvaluation());
        
        System.out.println("Answer submitted successfully. Score: " + 
            (question.getEvaluation() != null ? question.getEvaluation().getScore() : "N/A"));
        
        return ResponseEntity.ok(question);
    } catch (Exception e) {
        System.err.println("Error submitting answer: " + e.getMessage());
        e.printStackTrace();
        Map<String, String> error = new HashMap<>();
        error.put("error", e.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}    
    @PostMapping("/{sessionId}/complete")
    public ResponseEntity<?> completeInterview(@PathVariable String sessionId) {
        try {
            CompleteInterviewAnalysis analysis = interviewService.completeInterview(sessionId);
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            System.err.println("Error completing interview: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/{sessionId}")
    public ResponseEntity<?> getSession(@PathVariable String sessionId) {
        try {
            InterviewSession session = interviewService.getInterviewSession(sessionId);
            return ResponseEntity.ok(session);
        } catch (Exception e) {
            System.err.println("Error getting session: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/user/history")
    public ResponseEntity<?> getUserInterviews(Authentication auth) {
        try {
            List<InterviewSession> sessions = interviewService.getUserInterviews(auth.getName());
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            System.err.println("Error getting user interviews: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

}