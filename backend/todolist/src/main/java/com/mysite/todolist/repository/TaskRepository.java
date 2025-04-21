package com.mysite.todolist.repository;

import com.mysite.todolist.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByMemberId(Long member);
    List<Task> findAllByMemberId(Long member);
}
