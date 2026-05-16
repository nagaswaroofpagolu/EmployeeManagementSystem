import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Users, Briefcase, Activity, TrendingUp, Target, Bell, Calendar, Megaphone, UserPlus, FileText, CheckCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (['ADMIN', 'CEO', 'HR'].includes(user?.systemRole)) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  const getGreeting = () => {
    if (user?.systemRole === 'CEO') return `Welcome back, CEO ${user?.firstName}!`;
    if (user?.systemRole === 'HR') return `Welcome back, HR Manager ${user?.firstName}!`;
    return `Welcome, ${user?.firstName}!`;
  };

  // --- Static Data Definitions ---
  const activityFeed = [
    { id: 1, text: 'HR approved 3 leave requests', time: '2 hours ago', icon: CheckCircle, color: 'var(--success-color)' },
    { id: 2, text: 'New software engineer onboarded', time: '5 hours ago', icon: UserPlus, color: 'var(--primary-color)' },
    { id: 3, text: 'Q3 Townhall scheduled for Friday', time: '1 day ago', icon: Megaphone, color: 'var(--warning-color)' },
  ];

  const announcements = [
    { id: 1, title: 'Summer Picnic Next Week!', date: 'Aug 15', content: 'Join us at Central Park for food and games.' },
    { id: 2, title: 'IT System Maintenance', date: 'Aug 18', content: 'Expect downtime between 2 AM and 4 AM.' },
  ];

  const holidays = [
    { id: 1, name: 'Labor Day', date: 'Sep 4' },
    { id: 2, name: 'Thanksgiving', date: 'Nov 23' },
    { id: 3, name: 'Christmas Day', date: 'Dec 25' },
  ];

  const renderCEOWidgets = () => (
    <div className="role-widgets-grid">
      <div className="widget glass-panel span-full row-flex">
        <div className="stat-card">
          <div className="stat-icon bg-success"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <h3>Retention Rate</h3>
            <div className="stat-value">98%</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-warning"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Open Requisitions</h3>
            <div className="stat-value">24</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-primary"><Target size={24} /></div>
          <div className="stat-info">
            <h3>Q3 Goal Completion</h3>
            <div className="stat-value">85%</div>
          </div>
        </div>
      </div>
      
      <div className="widget glass-panel">
        <h3 className="widget-title"><Bell size={18} /> Recent Activity</h3>
        <div className="activity-list">
          {activityFeed.map(item => (
            <div key={item.id} className="activity-item">
              <div className="activity-icon" style={{ color: item.color }}><item.icon size={16} /></div>
              <div className="activity-content">
                <p>{item.text}</p>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="widget glass-panel">
        <h3 className="widget-title">Department Breakdown</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats?.departmentBreakdown || []} dataKey="count" nameKey="department" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {(stats?.departmentBreakdown || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderHRWidgets = () => (
    <div className="role-widgets-grid">
      <div className="widget glass-panel span-full">
        <h3 className="widget-title">Quick Actions</h3>
        <div className="quick-actions">
          <button className="quick-action-btn"><UserPlus size={20} /> Onboard Employee</button>
          <button className="quick-action-btn"><FileText size={20} /> Review Policies</button>
          <button className="quick-action-btn"><Calendar size={20} /> Manage Calendar</button>
        </div>
      </div>

      <div className="widget glass-panel">
        <h3 className="widget-title"><Clock size={18} /> Pending Tasks</h3>
        <ul className="task-list">
          <li><span className="task-badge bg-warning">High</span> Review 5 leave requests</li>
          <li><span className="task-badge bg-primary">Normal</span> Update compliance forms</li>
          <li><span className="task-badge bg-primary">Normal</span> Send 3 work anniversary emails</li>
        </ul>
      </div>

      <div className="widget glass-panel">
        <h3 className="widget-title">Headcount Overview</h3>
        <div className="stat-card" style={{ padding: '1rem 0' }}>
          <div className="stat-icon bg-primary"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total Employees Active</h3>
            <div className="stat-value">{stats?.totalEmployees || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployeeWidgets = () => {
    const usedPercentage = user?.totalLeaves ? Math.min((user.usedLeaves / user.totalLeaves) * 100, 100) : 0;
    
    return (
      <div className="role-widgets-grid">
        <div className="widget glass-panel">
          <h3 className="widget-title"><Activity size={18} /> Leave Balance</h3>
          <div className="leave-tracker">
            <div className="leave-stats">
              <div>
                <span className="big-num">{user?.totalLeaves - user?.usedLeaves}</span>
                <span className="label">Days Available</span>
              </div>
              <div className="text-right">
                <span className="big-num">{user?.usedLeaves}</span>
                <span className="label">Days Used</span>
              </div>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${usedPercentage}%`, background: usedPercentage > 80 ? 'var(--danger-color)' : 'var(--primary-color)' }}></div>
            </div>
          </div>
        </div>

        <div className="widget glass-panel">
          <h3 className="widget-title"><Briefcase size={18} /> Your Details</h3>
          <div className="details-list">
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Department:</strong> {user?.department}</p>
            <p><strong>System Access:</strong> {user?.systemRole}</p>
          </div>
        </div>

        <div className="widget glass-panel">
          <h3 className="widget-title"><Megaphone size={18} /> Announcements</h3>
          <div className="announcement-list">
            {announcements.map(ann => (
              <div key={ann.id} className="announcement-item">
                <div className="ann-date">{ann.date}</div>
                <div className="ann-content">
                  <h4>{ann.title}</h4>
                  <p>{ann.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget glass-panel">
          <h3 className="widget-title"><Calendar size={18} /> Upcoming Holidays</h3>
          <ul className="holiday-list">
            {holidays.map(hol => (
              <li key={hol.id}>
                <span className="hol-name">{hol.name}</span>
                <span className="hol-date">{hol.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in dashboard-container">
      <header className="page-header">
        <h1>{getGreeting()}</h1>
        <p>Here's what's happening today.</p>
      </header>

      {user?.systemRole === 'CEO' && renderCEOWidgets()}
      {(user?.systemRole === 'HR' || user?.systemRole === 'ADMIN') && renderHRWidgets()}
      {user?.systemRole === 'EMPLOYEE' && renderEmployeeWidgets()}
    </div>
  );
}
