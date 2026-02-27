// package com.MockPrep.backend.Service;

// import com.MockPrep.backend.Model.User;
// import com.MockPrep.backend.Payload.request.LoginRequest;
// import com.MockPrep.backend.Payload.request.RegisterRequest;
// import com.MockPrep.backend.Payload.response.AuthResponse;
// import com.MockPrep.backend.Repository.UserRepository;
// import com.MockPrep.backend.Security.jwt.JwtUtil;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// @Service
// public class AuthService {

//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private JwtUtil jwtUtil;
    
//     private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

//     public AuthResponse loginUser(LoginRequest loginRequest) {
//         try {
//             String email = loginRequest.getEmail().trim().toLowerCase();
//             String password = loginRequest.getPassword();
            
//             logger.info("Attempting login for: {}", email);
            
//             // Authenticate using Spring Security
//             Authentication authentication = authenticationManager.authenticate(
//                     new UsernamePasswordAuthenticationToken(email, password));
            
//             SecurityContextHolder.getContext().setAuthentication(authentication);

//             // Get user from database
//             User user = userRepository.findByEmail(email)
//                     .orElseThrow(() -> new RuntimeException("Error: User not found."));

//             // Generate JWT token
//             String jwt = jwtUtil.generateToken(authentication);
            
//             logger.info("User logged in successfully: {}", email);
            
//             return new AuthResponse(jwt, user);

//         } catch (BadCredentialsException e) {
//             logger.error("Bad credentials for: {}", loginRequest.getEmail());
//             throw new RuntimeException("Error: Invalid email or password.");
//         } catch (Exception e) {
//             logger.error("Login error: {}", e.getMessage());
//             throw new RuntimeException("Error: Login failed - " + e.getMessage());
//         }
//     }

//     public String registerUser(RegisterRequest registerRequest) {
//         String email = registerRequest.getEmail().trim().toLowerCase();
//         String name = registerRequest.getName().trim();
//         String password = registerRequest.getPassword();
        
//         logger.info("Attempting registration for: {}", email);
        
//         // Validate email uniqueness
//         if (userRepository.existsByEmail(email)) {
//             logger.warn("Email already exists: {}", email);
//             throw new RuntimeException("Error: Email is already in use!");
//         }
        
//         // Validate password length
//         if (password.length() < 6) {
//             throw new RuntimeException("Error: Password must be at least 6 characters long.");
//         }
        
//         // Create new user
//         User user = new User();
//         user.setName(name);
//         user.setEmail(email);
//         user.setPassword(passwordEncoder.encode(password));
        
//         // Save user
//         userRepository.save(user);
        
//         logger.info("User registered successfully: {}", email);
        
//         return "User registered successfully!";
//     }
// }



package com.MockPrep.backend.Service;

import com.MockPrep.backend.Model.User;
import com.MockPrep.backend.Payload.request.LoginRequest;
import com.MockPrep.backend.Payload.request.RegisterRequest;
import com.MockPrep.backend.Payload.response.AuthResponse;
import com.MockPrep.backend.Repository.UserRepository;
import com.MockPrep.backend.Security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse loginUser(LoginRequest loginRequest) {
        String email = loginRequest.getEmail().trim().toLowerCase();
        
        // 1. Authenticate with Manager (this triggers UserDetailsServiceImpl)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Fetch user to include in response
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: User not found post-auth."));

        // 3. Generate JWT
        String jwt = jwtUtil.generateToken(authentication);

        return new AuthResponse(jwt, user);
    }

    public String registerUser(RegisterRequest registerRequest) {
        String email = registerRequest.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(registerRequest.getName().trim());
        user.setEmail(email);
        // ENCODE BEFORE SAVING
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }
}