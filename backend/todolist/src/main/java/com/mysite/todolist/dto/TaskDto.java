package com.mysite.todolist.dto;

import com.mysite.todolist.entity.Member;
import com.mysite.todolist.entity.Task;
import lombok.*;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDto {
    private Long id;
    private String title;
    private String status;
    private LocalDate dueDate;
    private Long memberId;

    public Task toEntity(Member member){
        return Task.builder()
                .title(title)
                .status(status)
                .dueDate(dueDate)
                .member(member)
                .build();
    }

}
