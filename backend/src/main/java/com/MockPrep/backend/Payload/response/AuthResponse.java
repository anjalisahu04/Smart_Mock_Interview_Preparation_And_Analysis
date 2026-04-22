package com.MockPrep.backend.Payload.response;

import com.MockPrep.backend.Model.User;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private UserDetails user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserDetails(
            user.getId(),
            user.getName(),
            user.getEmail()
        );
    }

    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public UserDetails getUser() { return user; }
    public void setUser(UserDetails user) { this.user = user; }

  
    public static class UserDetails {
        private String id;
        private String name;
        private String email;

        public UserDetails(String id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

       
        public String getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
    }
}