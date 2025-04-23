package com.mysite.todolist.entity;

import com.mysite.todolist.dto.TaskDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "task")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;
    @Column
    private String status;
    @Column(name = "due_date")
    private LocalDate dueDate;
    @Column(name = "create_at")
    @CreationTimestamp
    private LocalDate createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public TaskDto toDto() {
        return TaskDto.builder()
                .id(id)
                .title(title)
                .status(status)
                .dueDate(dueDate)
                .memberId(member != null ? member.getId() : null)
                .build();
    }

    public void update(String title, String status, LocalDate dueDate) {
        this.title = title;
        this.status = status;
        this.dueDate = dueDate;
    }

    public void statusUpdate(String status) {
        this.status = status;
    }


}
