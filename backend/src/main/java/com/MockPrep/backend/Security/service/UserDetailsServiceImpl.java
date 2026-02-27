// package com.MockPrep.backend.Security.service;

// import com.MockPrep.backend.Model.User;
// import com.MockPrep.backend.Repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import java.util.ArrayList;

// @Service
// public class UserDetailsServiceImpl implements UserDetailsService {

//     @Autowired
//     private UserRepository userRepository;
    
//     private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    
//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         logger.debug("Loading user by email: {}", email);
        
//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> {
//                     logger.error("User not found with email: {}", email);
//                     return new UsernameNotFoundException("User Not Found with email: " + email);
//                 });
        
//         logger.debug("User found: {}", user.getEmail());

//         // Return UserDetails with empty authorities (no roles)
//         return org.springframework.security.core.userdetails.User
//                 .withUsername(user.getEmail())
//                 .password(user.getPassword())
//                 .authorities(new ArrayList<>()) // Empty authorities list
//                 .build();
//     }

//     public String getUserIdByEmail(String email) {
//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
//         return user.getId();
//     }
// }


package com.MockPrep.backend.Security.service;

import com.MockPrep.backend.Model.User;
import com.MockPrep.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword()) // This is the BCrypt hash from DB
                .authorities(new ArrayList<>())
                .build();
    }
}