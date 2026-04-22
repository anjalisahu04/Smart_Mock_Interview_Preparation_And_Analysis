package com.MockPrep.backend.Controller;

import com.MockPrep.backend.Payload.request.LoginRequest;
import com.MockPrep.backend.Payload.request.RegisterRequest;
import com.MockPrep.backend.Payload.response.AuthResponse;
import com.MockPrep.backend.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("=== LOGIN CONTROLLER HIT ===");
            System.out.println("Email: " + loginRequest.getEmail());
            
            AuthResponse authResponse = authService.loginUser(loginRequest);
            
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            System.out.println("=== REGISTER CONTROLLER HIT ===");
            System.out.println("Email: " + registerRequest.getEmail());
            
            String message = authService.registerUser(registerRequest);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Registration error: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    
}