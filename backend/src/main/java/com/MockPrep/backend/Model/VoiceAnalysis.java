// Model/VoiceAnalysis.java
package com.MockPrep.backend.Model;

import lombok.Data;

@Data
public class VoiceAnalysis {
    private double clarity;
    private double confidence;
    private double pace;
    private String feedback;
    private double sentimentScore;
    private String sentimentLabel;
}