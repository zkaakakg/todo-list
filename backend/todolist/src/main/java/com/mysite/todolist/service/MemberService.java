package com.mysite.todolist.service;

import com.mysite.todolist.dto.MemberDto;
import com.mysite.todolist.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public void create(MemberDto memberDto){
        this.memberRepository.save(memberDto.toEntity());
    }
}
