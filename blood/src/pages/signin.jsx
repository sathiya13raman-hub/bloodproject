import './signin.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();   
  return (
    <div className="signin-page">
      <div className="signin-shell">
        <div className="signin-panel">
          <span className="signin-badge">Secure access</span>
          <h1>Sign in to LifeBlood</h1>
          <p>Access your donor dashboard, manage requests, and stay connected with the community.</p>
          <div className="signin-stats">
            <div>
              <strong>1,200+</strong>
              <span>Verified donors</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Support access</span>
            </div>
          </div>
        </div>

        <div className="signin-card">
          <div className="signin-card-header">
            <h2>Welcome back</h2>
            <p>Enter your credentials to continue safely.</p>
          </div>

          <form className="signin-form">
            <label className="signin-label">
              Email
              <input type="email" placeholder="Enter your email" required className="signin-input" />
            </label>

            <label className="signin-label">
              Password
              <input type="password" placeholder="Enter your password" required className="signin-input" />
            </label>

            <button type="submit" className="signin-button" onClick={() => navigate('/signin')}>Sign in</button>
          </form>

          <p className="login-prompt">
            Don’t have an account? <a href="/signup" className="login-link">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;