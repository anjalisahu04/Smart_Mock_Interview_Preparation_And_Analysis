package com.MockPrep.backend.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "interview_sessions")
public class InterviewSession {
    @Id
    private String id;
    private String userEmail;
    private String domain;
    private String interviewType; 
    private String level; 
    private int durationMinutes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<Question> questions = new ArrayList<>();
    private CompleteInterviewAnalysis analysis; 
    private String status; 
    private int currentQuestionIndex;
}