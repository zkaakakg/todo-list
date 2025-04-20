package com.mysite.todolist.repository;

import com.mysite.todolist.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
