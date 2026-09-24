package com.powerschool.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class LoginRequestDTO {

    @Getter 
    @Setter 
    @NoArgsConstructor 
    @AllArgsConstructor
    public static class Request {
        private String username;
        private String password;
        private String role; // Added to match frontend login submission
    }

    @Getter 
    @Setter 
    @NoArgsConstructor 
    @AllArgsConstructor
    public static class Response {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String username;
        private String email;
        private String role;
    }
}
