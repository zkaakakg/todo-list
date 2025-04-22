package com.mysite.todolist.service;

import com.mysite.todolist.dto.StatusUpdateDto;
import com.mysite.todolist.dto.TaskDto;
import com.mysite.todolist.entity.Member;
import com.mysite.todolist.entity.Task;
import com.mysite.todolist.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final MemberService memberService;

    public List<TaskDto> getList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        Member member = memberService.getCurrentMember(currentUserEmail);
        List<TaskDto> list = taskRepository.findAllByMemberId(member.getId()).stream()
                .map(Task::toDto).collect(Collectors.toList());
        return list;
    }

    public void create(TaskDto taskDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        Member member = memberService.getCurrentMember(currentUserEmail);

        Task task = taskDto.toEntity(member);

        this.taskRepository.save(task);
    }

    public void statusUpdate(Long id, StatusUpdateDto statusUpdateDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("task를 찾을 수 없습니다."));

        task.statusUpdate(statusUpdateDto.getStatus());
        this.taskRepository.save(task);
    }

    public void update(Long id, TaskDto taskDto){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("task를 찾을 수 없습니다."));

        task.update(taskDto.getTitle(), taskDto.getStatus(), taskDto.getDueDate());
        this.taskRepository.save(task);
    }

    public void delete(Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("task를 찾을 수 없습니다."));

        this.taskRepository.delete(task);
    }
}