package com.ems.ems_backend.config;

import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.entity.Leave;
import com.ems.ems_backend.repository.EmployeeRepository;
import com.ems.ems_backend.repository.LeaveRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(EmployeeRepository employeeRepository, LeaveRepository leaveRepository) {
        return args -> {
            if (employeeRepository.count() == 0) {
                employeeRepository.save(createEmp("Admin", "Super", "admin@ems.com", "password", "Executive", "CEO", "SUPER_ADMIN", "2020-01-01", 150000.0, 2));
                Employee hr = employeeRepository.save(createEmp("HR", "Manager", "hr@ems.com", "password", "HR", "HR Head", "HR_MANAGER", "2021-06-15", 90000.0, 5));
                employeeRepository.save(createEmp("Team", "Manager", "manager@ems.com", "password", "Engineering", "Tech Lead", "MANAGER", "2022-03-10", 120000.0, 0));
                Employee john = employeeRepository.save(createEmp("John", "Doe", "employee@ems.com", "password", "Engineering", "Developer", "EMPLOYEE", "2023-08-22", 80000.0, 10));
                employeeRepository.save(createEmp("Alice", "Johnson", "alice@ems.com", "password", "Marketing", "Designer", "EMPLOYEE", "2024-01-10", 75000.0, 0));

                Leave leave1 = new Leave();
                leave1.setEmployeeId(john.getId());
                leave1.setEmployeeName("John Doe");
                leave1.setStartDate("2026-05-20");
                leave1.setEndDate("2026-05-25");
                leave1.setReason("Family Vacation");
                leave1.setStatus("Pending");
                leaveRepository.save(leave1);
                
                Leave leave2 = new Leave();
                leave2.setEmployeeId(hr.getId());
                leave2.setEmployeeName("HR Manager");
                leave2.setStartDate("2026-04-10");
                leave2.setEndDate("2026-04-12");
                leave2.setReason("Medical");
                leave2.setStatus("Approved");
                leaveRepository.save(leave2);
                
                System.out.println("Database seeded with demo users and leaves.");
            }
        };
    }

    private Employee createEmp(String fn, String ln, String email, String pwd, String dept, String role, String sysRole, String date, Double salary, int used) {
        Employee e = new Employee();
        e.setFirstName(fn);
        e.setLastName(ln);
        e.setEmail(email);
        e.setPassword(pwd);
        e.setDepartment(dept);
        e.setRole(role);
        e.setSystemRole(sysRole);
        e.setJoiningDate(date);
        e.setSalary(salary);
        e.setUsedLeaves(used);
        e.setTotalLeaves(20);
        return e;
    }
}
