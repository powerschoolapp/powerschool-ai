// AuthController.java
package com.powerschool.controller;

import com.powerschool.dto.LoginRequestDTO;
import com.powerschool.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO.Request loginRequest) {
        try {
            LoginRequestDTO.Response response = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }
}
