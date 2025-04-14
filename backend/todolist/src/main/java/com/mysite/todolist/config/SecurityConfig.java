package com.mysite.todolist.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})  // CORS 허용
                .csrf(csrf -> csrf.disable())  // ✅ 최신 방식으로 CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                new AntPathRequestMatcher("/member/signup")
                        ).permitAll()
                        .anyRequest().permitAll()
                )
                .formLogin(form -> form.disable())   // 로그인 폼 비활성화
                .httpBasic(basic -> basic.disable()); // 브라우저 인증 팝업 비활성화

        return http.build();
    }
}

