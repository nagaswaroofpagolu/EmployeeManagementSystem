package com.ems.ems_backend.config;

import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) throws Exception {
        if (employeeRepository.count() == 0) {
            // Seed CEO
            Employee ceo = new Employee();
            ceo.setFirstName("Alice");
            ceo.setLastName("Founder");
            ceo.setEmail("ceo@company.com");
            ceo.setPassword("admin123");
            ceo.setDepartment("Executive");
            ceo.setRole("Chief Executive Officer");
            ceo.setSystemRole("CEO");
            ceo.setJoiningDate(LocalDate.now().minusYears(5).toString());
            ceo.setSalary(250000.0);
            ceo.setTotalLeaves(30);
            ceo.setUsedLeaves(5);
            employeeRepository.save(ceo);

            // Seed HR
            Employee hr = new Employee();
            hr.setFirstName("Bob");
            hr.setLastName("Manager");
            hr.setEmail("hr@company.com");
            hr.setPassword("admin123");
            hr.setDepartment("Human Resources");
            hr.setRole("HR Manager");
            hr.setSystemRole("HR");
            hr.setJoiningDate(LocalDate.now().minusYears(2).toString());
            hr.setSalary(95000.0);
            hr.setTotalLeaves(25);
            hr.setUsedLeaves(10);
            employeeRepository.save(hr);

            // Seed Employee
            Employee emp = new Employee();
            emp.setFirstName("Charlie");
            emp.setLastName("Worker");
            emp.setEmail("employee@company.com");
            emp.setPassword("password");
            emp.setDepartment("Engineering");
            emp.setRole("Software Engineer");
            emp.setSystemRole("EMPLOYEE");
            emp.setJoiningDate(LocalDate.now().minusMonths(6).toString());
            emp.setSalary(80000.0);
            emp.setTotalLeaves(20);
            emp.setUsedLeaves(2);
            employeeRepository.save(emp);
            
            System.out.println("Database seeded with CEO, HR, and Employee.");
        }
    }
}
