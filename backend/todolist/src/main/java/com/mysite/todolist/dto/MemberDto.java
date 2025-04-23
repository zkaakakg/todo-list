package com.mysite.todolist.dto;

import com.mysite.todolist.entity.Member;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {
    private Long id;
    private String username;
    private String password;
    private String email;

    public Member toEntity(String encodedPassword){
        return Member.builder()
                .username(username)
                .password(encodedPassword)
                .email(email)
                .build();
    }

}
