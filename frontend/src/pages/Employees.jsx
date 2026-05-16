import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Trash2, Edit2, Mail, Briefcase, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Employees.css';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmp, setEditingEmp] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!['ADMIN', 'CEO', 'HR'].includes(user?.systemRole)) {
      navigate('/dashboard');
      return;
    }
    fetchEmployees();
  }, [user, navigate]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employees/${editingEmp.id}`, editingEmp);
      setEditingEmp(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <h1>Employee Directory</h1>
        <p>Manage your organization's workforce.</p>
      </header>

      <div className="employee-grid">
        {employees.map(emp => (
          <div key={emp.id} className="employee-card glass-panel">
            <div className="emp-header">
              <div className="emp-avatar">{emp.firstName?.[0]}{emp.lastName?.[0]}</div>
              <div className="emp-title">
                <h3>{emp.firstName} {emp.lastName}</h3>
                <span className="emp-sys-role">{emp.systemRole}</span>
              </div>
            </div>
            <div className="emp-body">
              <p><Briefcase size={16} /> {emp.role}</p>
              <p><Building size={16} /> {emp.department}</p>
              <p><Mail size={16} /> {emp.email}</p>
            </div>
            <div className="emp-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setEditingEmp(emp)}
              >
                <Edit2 size={16} /> Edit
              </button>
              {emp.id !== user?.id && (
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(emp.id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingEmp && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <h2>Edit Employee</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="input-group">
                <label className="input-label">Role</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={editingEmp.role} 
                  onChange={(e) => setEditingEmp({...editingEmp, role: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label className="input-label">Department</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={editingEmp.department} 
                  onChange={(e) => setEditingEmp({...editingEmp, department: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label className="input-label">Salary</label>
                <input 
                  type="number" 
                  className="input-field" 
                  value={editingEmp.salary || 0} 
                  onChange={(e) => setEditingEmp({...editingEmp, salary: parseFloat(e.target.value)})}
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingEmp(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
