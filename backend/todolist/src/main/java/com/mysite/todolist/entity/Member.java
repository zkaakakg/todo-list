package com.mysite.todolist.entity;

import com.mysite.todolist.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="member")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;
    @Column
    private String password;
    @Column(unique = true)
    private String email;

    public MemberDto toDto() {
        return MemberDto.builder()
                .id(id)
                .username(username)
                .password(password)
                .email(email)
                .build();
    }
}
