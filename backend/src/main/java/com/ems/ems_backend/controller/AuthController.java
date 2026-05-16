package com.ems.ems_backend.controller;

import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        return employeeRepository.findByEmailAndPassword(creds.get("email"), creds.get("password"))
            .map(user -> {
                Map<String, Object> res = new HashMap<>();
                res.put("token", "fake-jwt-token-" + user.getId());
                res.put("user", user);
                return ResponseEntity.ok(res);
            })
            .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Employee emp) {
        if (employeeRepository.existsByEmail(emp.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email exists"));
        }
        emp.setDepartment("Unassigned");
        emp.setRole(emp.getSystemRole() != null ? emp.getSystemRole().replace("_", " ") : "Employee");
        if (emp.getSystemRole() == null) emp.setSystemRole("EMPLOYEE");
        emp.setJoiningDate(LocalDate.now().toString());
        emp.setSalary(0.0);
        Employee saved = employeeRepository.save(emp);
        return ResponseEntity.ok(Map.of("token", "fake-jwt-" + saved.getId(), "user", saved));
    }
}
