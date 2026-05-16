package com.ems.ems_backend.controller;

import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(Map.of(
            "totalEmployees", employeeRepository.count(),
            "departmentBreakdown", employeeRepository.getDepartmentBreakdown()
        ));
    }
}
