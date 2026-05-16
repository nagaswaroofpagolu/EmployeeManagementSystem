package com.ems.ems_backend.controller;

import com.ems.ems_backend.entity.Leave;
import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.LeaveRepository;
import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {
    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(leaveRepository.findAllByOrderByIdDesc());
    }

    @GetMapping("/{empId}")
    public ResponseEntity<?> getByEmp(@PathVariable Long empId) {
        return ResponseEntity.ok(leaveRepository.findByEmployeeIdOrderByIdDesc(empId));
    }

    @PostMapping
    public ResponseEntity<?> apply(@RequestBody Leave leave) {
        leave.setStatus("Pending");
        return ResponseEntity.ok(leaveRepository.save(leave));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, Object> req) {
        String status = (String) req.get("status");
        Long empId = Long.valueOf(req.get("employeeId").toString());
        Integer days = Integer.valueOf(req.get("days").toString());

        return leaveRepository.findById(id).map(leave -> {
            leave.setStatus(status);
            leaveRepository.save(leave);
            if ("Approved".equals(status)) {
                employeeRepository.findById(empId).ifPresent(emp -> {
                    emp.setUsedLeaves(emp.getUsedLeaves() + days);
                    employeeRepository.save(emp);
                });
            }
            return ResponseEntity.ok(Map.of("success", true));
        }).orElse(ResponseEntity.notFound().build());
    }
}
