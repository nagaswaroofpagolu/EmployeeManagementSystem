import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Users, CalendarDays, LogOut, Moon, Sun } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employees', label: 'Employees', icon: Users, adminOnly: true },
    { path: '/leaves', label: 'Leaves', icon: CalendarDays },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon">EMS</div>
        <h2>Employee System</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          if (item.adminOnly && !['ADMIN', 'CEO', 'HR'].includes(user?.systemRole)) return null;
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
          <div className="details">
            <span className="name">{user?.firstName} {user?.lastName}</span>
            <span className="role">{user?.role}</span>
          </div>
        </div>

        <div className="footer-actions">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="logout-btn" onClick={logout} aria-label="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
