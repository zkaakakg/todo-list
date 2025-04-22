package com.mysite.todolist.controller;

import com.mysite.todolist.dto.MemberDto;
import com.mysite.todolist.entity.Member;
import com.mysite.todolist.exception.DuplicateResourceException;
import com.mysite.todolist.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    @ResponseBody
    public String signup(@RequestBody MemberDto dto) {
        try {
            memberService.create(dto);
        } catch (DuplicateResourceException e) {
            return e.getMessage();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return "회원가입 실패";
        }
        return "회원가입 성공";
    }

    @GetMapping("/")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되지 않았습니다.");
        }

        String email = authentication.getName();
        Member member = memberService.getCurrentMember(email);

        return ResponseEntity.ok(Map.of(
                "email", member.getEmail(),
                "name", member.getUsername()
        ));
    }
}
