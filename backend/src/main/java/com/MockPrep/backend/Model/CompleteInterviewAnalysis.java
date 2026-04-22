package com.MockPrep.backend.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Data
@NoArgsConstructor
public class CompleteInterviewAnalysis {
    private int overallScore;
    private String overallAccuracy;
    private Map<String, Integer> skillScores = new HashMap<>();
    private List<String> overallStrengths = new ArrayList<>();
    private List<String> areasForImprovement = new ArrayList<>();
    private String detailedAnalysis;
    private List<String> recommendations = new ArrayList<>();
    private String summary;
    private Map<String, Object> performanceMetrics = new HashMap<>();
}