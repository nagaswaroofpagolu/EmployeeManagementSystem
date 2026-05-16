package com.ems.ems_backend.repository;

import com.ems.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import java.util.List;
import java.util.Map;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);

    @Query("SELECT e.department AS department, COUNT(e) AS count FROM Employee e GROUP BY e.department")
    List<Map<String, Object>> getDepartmentBreakdown();
}
