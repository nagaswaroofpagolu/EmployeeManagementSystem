package com.ems.ems_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "leaves")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String startDate;
    private String endDate;
    @Column(length = 1000)
    private String reason;
    private String status = "Pending";
}
