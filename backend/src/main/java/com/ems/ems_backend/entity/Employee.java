package com.ems.ems_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
    private String department;
    private String role;
    private String systemRole;
    private String joiningDate;
    private Double salary;
    private Integer totalLeaves = 20;
    private Integer usedLeaves = 0;
}
