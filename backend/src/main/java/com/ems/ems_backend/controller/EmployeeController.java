package com.ems.ems_backend.controller;

import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(employeeRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Employee emp) {
        return ResponseEntity.ok(employeeRepository.save(emp));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        employeeRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Employee empDetails) {
        return employeeRepository.findById(id).map(emp -> {
            if (empDetails.getFirstName() != null) emp.setFirstName(empDetails.getFirstName());
            if (empDetails.getLastName() != null) emp.setLastName(empDetails.getLastName());
            if (empDetails.getDepartment() != null) emp.setDepartment(empDetails.getDepartment());
            if (empDetails.getRole() != null) emp.setRole(empDetails.getRole());
            if (empDetails.getSystemRole() != null) emp.setSystemRole(empDetails.getSystemRole());
            if (empDetails.getSalary() != null) emp.setSalary(empDetails.getSalary());
            return ResponseEntity.ok(employeeRepository.save(emp));
        }).orElse(ResponseEntity.notFound().build());
    }
}
