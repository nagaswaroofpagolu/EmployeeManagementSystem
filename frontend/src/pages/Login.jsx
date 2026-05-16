import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-split-container glass-panel animate-fade-in">
        
        {/* Left Side Branding */}
        <div className="auth-brand-side">
          <div className="brand-content">
            <ShieldCheck size={64} className="brand-icon" />
            <h1>Empower Your Workforce</h1>
            <p>Streamline HR, manage leaves, and unlock your team's potential with our all-in-one Employee Management System.</p>
          </div>
          <div className="brand-bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="auth-form-side">
          <div className="auth-header">
            <div className="logo-icon">EMS</div>
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary full-width auth-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-redirect">
            Don't have an account? <Link to="/signup">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
