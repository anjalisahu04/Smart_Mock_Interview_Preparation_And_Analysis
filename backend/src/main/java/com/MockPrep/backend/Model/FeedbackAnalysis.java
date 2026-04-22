// Model/FeedbackAnalysis.java
package com.MockPrep.backend.Model;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class FeedbackAnalysis {
    private int overallScore;
    private Map<String, Integer> skillScores;
    private List<String> strengths;
    private List<String> improvements;
    private String detailedFeedback;
    private Map<String, String> categoryWiseFeedback;
    private VoiceAnalysis voiceAnalysis;
}