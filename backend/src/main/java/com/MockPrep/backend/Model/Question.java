package com.MockPrep.backend.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Question {
    private String id;
    private String text;
    private String type; 
    private String userAnswer;
    private String audioTranscription;
    private String audioUrl;
    private QuestionEvaluation evaluation;
    private LocalDateTime answeredAt;
    private long responseTimeSeconds;
    private int orderNumber;
}