// AuthService.java
package com.powerschool.service;

import com.powerschool.dto.LoginRequestDTO;
import com.powerschool.entity.UserAccount;
import com.powerschool.repository.UserAccountRepository;
import com.powerschool.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public LoginRequestDTO.Response authenticateUser(LoginRequestDTO.Request loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserAccount user = userAccountRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return new LoginRequestDTO.Response(
                jwt,
                "Bearer",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
