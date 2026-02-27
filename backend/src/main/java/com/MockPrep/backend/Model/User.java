package com.MockPrep.backend.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document(collection = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    private String id;

    @NotBlank
    @Size(max = 50)
    private String name;
    
    @NotBlank
    @Size(max = 100)
    @Email
    @Indexed(unique = true)
    private String email;
    
    @NotBlank
    @Size(max = 120)
    private String password;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}