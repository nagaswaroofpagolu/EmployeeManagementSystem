import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Check, X, Filter } from 'lucide-react';
import './Leaves.css';

export default function Leaves() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  
  // Apply Leave State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [applyError, setApplyError] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredLeaves(leaves);
    } else {
      setFilteredLeaves(leaves.filter(l => l.status === filter));
    }
  }, [filter, leaves]);

  const fetchLeaves = async () => {
    try {
      const endpoint = ['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) ? '/leaves' : `/leaves/${user?.id}`;
      const res = await api.get(endpoint);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplyError('');
    setApplyLoading(true);
    try {
      await api.post('/leaves', {
        employeeId: user?.id,
        employeeName: `${user?.firstName} ${user?.lastName}`,
        startDate,
        endDate,
        reason
      });
      setStartDate('');
      setEndDate('');
      setReason('');
      fetchLeaves();
    } catch (err) {
      setApplyError('Failed to apply for leave.');
    } finally {
      setApplyLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, empId, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    try {
      await api.put(`/leaves/${id}/status`, { status, employeeId: empId, days });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  const getBadgeClass = (status) => {
    if (status === 'Approved') return 'badge badge-approved';
    if (status === 'Rejected') return 'badge badge-rejected';
    return 'badge badge-pending';
  };

  if (loading) return <div>Loading leaves...</div>;

  return (
    <div className="animate-fade-in">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Leave Management</h1>
          <p>{['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) ? 'Review and manage employee leaves.' : 'Apply for leaves and track status.'}</p>
        </div>
      </header>

      {['EMPLOYEE'].includes(user?.systemRole) && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', maxWidth: '600px' }}>
          <h3>Apply for Leave</h3>
          {applyError && <div className="error-message">{applyError}</div>}
          <form onSubmit={handleApply} style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Start Date</label>
                <input type="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">End Date</label>
                <input type="date" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Reason</label>
              <textarea 
                className="input-field" 
                rows="3" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                required 
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={applyLoading}>
              {applyLoading ? 'Applying...' : 'Submit Request'}
            </button>
          </form>
        </div>
      )}

      <div className="filter-bar glass-panel">
        <Filter size={16} />
        <div className="filter-buttons">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button 
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table className="glass-table">
          <thead>
            <tr>
              {['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) && <th>Employee</th>}
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
              {['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map(leave => (
              <tr key={leave.id}>
                {['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) && <td>{leave.employeeName}</td>}
                <td>{leave.startDate} to {leave.endDate}</td>
                <td>{leave.reason}</td>
                <td>
                  <span className={getBadgeClass(leave.status)}>{leave.status}</span>
                </td>
                {['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) && (
                  <td>
                    {leave.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-success" 
                          style={{ padding: '0.4rem', borderRadius: '50%' }}
                          onClick={() => handleStatusUpdate(leave.id, 'Approved', leave.employeeId, leave.startDate, leave.endDate)}
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '0.4rem', borderRadius: '50%' }}
                          onClick={() => handleStatusUpdate(leave.id, 'Rejected', leave.employeeId, leave.startDate, leave.endDate)}
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {filteredLeaves.length === 0 && (
              <tr>
                <td colSpan={['ADMIN', 'CEO', 'HR'].includes(user?.systemRole) ? 5 : 4} style={{ textAlign: 'center', padding: '2rem' }}>
                  No leaves found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
