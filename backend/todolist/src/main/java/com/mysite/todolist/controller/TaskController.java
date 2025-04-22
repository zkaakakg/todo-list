package com.mysite.todolist.controller;

import com.mysite.todolist.dto.StatusUpdateDto;
import com.mysite.todolist.dto.TaskDto;
import com.mysite.todolist.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;
    
    @GetMapping("/list")
    public ResponseEntity<List<TaskDto>> getList(){
        try {
            List<TaskDto> tasks = taskService.getList();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    @ResponseBody
    public String create(@RequestBody TaskDto dto){
        try {
            taskService.create(dto);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return "할 일 등록 실패";
        }
        return "할 일 등록 성공";
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public String update(@PathVariable("id") Long id, @RequestBody TaskDto taskDto){
        try{
            taskService.update(id, taskDto);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return "Task 수정 실패";
        }
        return "Task 수정 성공";
    }

    @PutMapping("/update/status/{id}")
    @ResponseBody
    public String statusUpdate(@PathVariable("id") Long id, @RequestBody StatusUpdateDto statusUpdateDto){
        try{
            taskService.statusUpdate(id, statusUpdateDto);
        }catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return "상태 업테이트 실패";
        }
        return "상태 업데이트 성공";
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public String delete(@PathVariable("id") Long id){
        try{
            taskService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return "Task 삭제 실패";
        }
        return "Task 삭제 성공";
    }


}
