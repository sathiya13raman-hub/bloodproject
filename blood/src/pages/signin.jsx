import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveAuthTokens } from '../api';

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      saveAuthTokens(response.tokens);
      navigate('/donor-registration');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    }
  };

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

          <form className="signin-form" onSubmit={handleSubmit}>
            <label className="signin-label">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="signin-input"
              />
            </label>

            <label className="signin-label">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="signin-input"
              />
            </label>

            {error && <p className="signin-error">{error}</p>}

            <button type="submit" className="signin-button">Sign in</button>
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