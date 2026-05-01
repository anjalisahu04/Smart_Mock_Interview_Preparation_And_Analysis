// package com.MockPrep.backend.Security.jwt;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import jakarta.annotation.PostConstruct;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import java.nio.charset.StandardCharsets;
// import java.util.Date;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String jwtSecret;

//     @Value("${jwt.expirationMs}")  // Make sure this matches properties file
//     private int jwtExpirationMs;

//     private byte[] signingKey;

//     @PostConstruct
//     public void init() {
//         if (jwtSecret == null || jwtSecret.isBlank()) {
//             throw new IllegalStateException("jwt.secret is not configured");
//         }
//         signingKey = jwtSecret.getBytes(StandardCharsets.UTF_8);
//     }

//     public String generateToken(Authentication authentication) {
//         UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

//         return Jwts.builder()
//                 .setSubject(userPrincipal.getUsername())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//                 .signWith(SignatureAlgorithm.HS512, signingKey)
//                 .compact();
//     }

//     public String getEmailFromToken(String token) {
//         Claims claims = Jwts.parser()
//                 .setSigningKey(signingKey)
//                 .parseClaimsJws(token)
//                 .getBody();
//         return claims.getSubject();
//     }

//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             System.out.println("Invalid JWT token: " + e.getMessage());
//         }
//         return false;
//     }
// }


package com.MockPrep.backend.Security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;

    private SecretKey signingKey;

    // ✅ Initialize signing key
    @PostConstruct
    public void init() {
        if (jwtSecret == null || jwtSecret.isBlank()) {
            throw new IllegalStateException("jwt.secret is not configured");
        }

        this.signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // 🔐 Generate JWT Token
    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername()) // email or username
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(signingKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // ✅ Extract username/email
    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    // 📦 Extract claims
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Validate token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (SecurityException e) {
            System.out.println("Invalid JWT signature");

        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token");

        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired");

        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported");

        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty");
        }

        return false;
    }
}