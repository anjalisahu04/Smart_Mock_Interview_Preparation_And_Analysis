package com.MockPrep.backend.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class QuestionEvaluation {
    private int score;
    private String accuracy; 
    private String feedback;
    private List<String> strengths = new ArrayList<>();
    private List<String> improvements = new ArrayList<>();
    private String suggestedAnswer;
    private String keyPointsCovered;
    private String keyPointsMissed;
}