package com.ems.ems_backend.repository;

import com.ems.ems_backend.entity.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployeeIdOrderByIdDesc(Long employeeId);
    List<Leave> findAllByOrderByIdDesc();
}
