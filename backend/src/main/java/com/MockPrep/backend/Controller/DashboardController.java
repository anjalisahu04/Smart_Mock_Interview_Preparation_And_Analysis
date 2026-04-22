package com.MockPrep.backend.Controller;

import com.MockPrep.backend.Service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    @Autowired
    private InterviewService interviewService;
    
    @GetMapping
    public ResponseEntity<?> getDashboard(Authentication auth) {
        try {
            String userEmail = auth.getName();
            Map<String, Object> data = interviewService.getDashboardData(userEmail);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}    