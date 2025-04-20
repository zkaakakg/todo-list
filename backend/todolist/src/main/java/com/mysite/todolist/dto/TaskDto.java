package com.mysite.todolist.dto;

import com.mysite.todolist.entity.Member;
import com.mysite.todolist.entity.Task;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDto {
    private Long id;
    private String title;
    private String status;
    private LocalDate dueDate;
    private LocalDate createdAt;
    private Member member;

    public Task toEntity(){
        return Task.builder()
                .title(title)
                .status(status)
                .dueDate(dueDate)
                .createdAt(createdAt)
                .member(member)
                .build();
    }

    public void update(Task task){
        this.setTitle(task.getTitle());
        this.setStatus(task.getStatus());
        this.setDueDate(task.getDueDate());
    }
}
