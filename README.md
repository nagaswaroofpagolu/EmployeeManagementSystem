# Employee Management System (EMS)

A comprehensive, full-stack Employee Management System designed with a premium, modern user interface. This application provides robust role-based access control, allowing CEOs, HR Managers, and standard Employees to securely manage workforce data, organizational structure, and leave applications.

---

## ✨ Key Features

- **Role-Based Access Control (RBAC):** Distinct dashboards, views, and permissions automatically tailored for CEOs, HR Managers, and Employees.
- **Premium UI/UX:** Built with a stunning "Glassmorphism" aesthetic featuring rich gradients, fluid animations, and custom CSS variables.
- **Dynamic Theming:** Seamlessly toggle between meticulously crafted Light and Dark modes.
- **Interactive Dashboards:**
  - **CEO View:** High-level company metrics, recent activity timelines, and live Department Breakdown charts.
  - **HR View:** Quick-action toolbars, pending task trackers, and detailed headcount overviews.
  - **Employee View:** Visual leave-balance progress bars, company announcements, and upcoming holiday schedules.
- **Employee Directory:** View and manage the organization's workforce via beautiful Profile Cards. Admins and HR can instantly update roles, salaries, and departments via inline modals.
- **Leave Management System:** Employees can apply for leaves, while Admins/HR can review, approve, or reject them. Includes an interactive status filter bar.

---

## 🛠️ Technologies Used

### Frontend
- **React.js (Vite)**: For lightning-fast development and optimized production builds.
- **React Router**: For seamless client-side routing and protected routes.
- **Axios**: For structured API requests and JWT token interception.
- **Recharts**: For rendering beautiful, interactive data visualizations (Pie Charts).
- **Lucide React**: For crisp, modern SVG iconography.
- **Vanilla CSS**: Used exclusively for styling to demonstrate advanced CSS Grid, Flexbox, CSS Custom Properties (Variables), and Glassmorphism without relying on external UI frameworks.

### Backend
- **Spring Boot (Java)**: The robust core framework handling REST API endpoints and business logic.
- **Spring Data JPA / Hibernate**: For seamless object-relational mapping and database interactions.
- **MySQL**: The primary relational database for persistent data storage.

---

## 🔐 Default Login Credentials

Upon the very first startup, the backend will automatically seed the database with the following accounts so you can immediately test the role-based features:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **CEO / Admin** | `ceo@company.com` | `admin123` | Full Access. Can view global stats, manage all employees, and approve leaves. |
| **HR Manager** | `hr@company.com` | `admin123` | Can manage the employee directory, view HR-specific dashboards, and process leaves. |
| **Employee** | `employee@company.com` | `password` | Can view their own profile, track personal leave balances, and submit leave requests. |

*(Note: You can also use the **Sign Up** page to create new custom accounts and assign them roles via the dropdown menu!)*

---

## 🚀 Local Setup Steps

Follow these instructions to get both the frontend and backend running on your local machine.

### Prerequisites
- **Node.js** (v16 or higher recommended)
- **Java Development Kit (JDK)** (v17 or higher)
- **MySQL Server** (running locally on port 3306)

### 1. Database Configuration
1. Open MySQL and ensure a local instance is running.
2. The application is configured to automatically create the database if it doesn't exist (`ems_db`).
3. If you need to change the database credentials, open `backend/src/main/resources/application.properties` and update:
   ```ini
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Start the Spring Boot Backend
Open a terminal instance and navigate to the `backend` directory:
```bash
cd backend
./mvnw spring-boot:run
```
*The backend server will start on `http://localhost:8080`. On the very first run, it will automatically populate the database with the default login credentials.*

### 3. Start the React Frontend
Open a **second** terminal instance and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*The Vite development server will start. Open the Local URL provided in your terminal (typically `http://localhost:5173`) in your browser to view the application.*

---

## 📂 Project Structure

```text
EMPLOYEE MANAGEMENT SYSTEM/
├── backend/                  # Spring Boot Application
│   ├── .mvn/                 # Maven wrapper files
│   ├── src/main/java/.../    # Java Source Code
│   │   ├── config/           # Database Seeder
│   │   ├── controller/       # REST API Endpoints (Auth, Employee, Leave, Stats)
│   │   ├── entity/           # JPA Models (Employee, Leave)
│   │   └── repository/       # Database Interfaces
│   └── src/main/resources/   # App configuration (application.properties)
│
├── frontend/                 # Vite + React Application
│   ├── src/
│   │   ├── api/              # Axios configuration & interceptors
│   │   ├── components/       # Reusable UI (Layout, Sidebar)
│   │   ├── context/          # Global State (AuthContext, ThemeContext)
│   │   ├── pages/            # Main Views (Login, Dashboard, Employees, Leaves)
│   │   ├── App.jsx           # Routing configuration
│   │   └── index.css         # Global Design System (Variables, Light/Dark Modes)
│   └── package.json          # Node dependencies
│
└── README.md                 # You are here!
```
