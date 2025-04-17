package com.mysite.todolist.controller;

import com.mysite.todolist.dto.MemberDto;
import com.mysite.todolist.exception.DuplicateResourceException;
import com.mysite.todolist.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

}
