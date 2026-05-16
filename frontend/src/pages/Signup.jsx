import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users } from 'lucide-react';
import './Auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    systemRole: 'EMPLOYEE'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-split-container glass-panel animate-fade-in signup-mode">
        
        {/* Right Side Form (On Signup, we can put branding on right and form on left to differentiate, or keep it same. Let's keep branding on left) */}
        <div className="auth-brand-side">
          <div className="brand-content">
            <Users size={64} className="brand-icon" />
            <h1>Join Our Community</h1>
            <p>Sign up today to get connected with your team, manage your profile, and start contributing to our shared success.</p>
          </div>
          <div className="brand-bg-shapes">
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-header">
            <div className="logo-icon">EMS</div>
            <h2>Create Account</h2>
            <p>Let's get you set up</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="input-field"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="input-field"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">System Role</label>
              <select
                name="systemRole"
                className="input-field"
                value={formData.systemRole}
                onChange={handleChange}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="HR">HR Manager</option>
                <option value="CEO">CEO</option>
                <option value="ADMIN">System Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary full-width auth-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-redirect">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
