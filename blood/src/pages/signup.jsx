import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { registerUser, saveAuthTokens } from '../api';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });
      saveAuthTokens(response.tokens);
      navigate('/donor-registration');
    } catch (err) {
      setError(err.message || 'Unable to register.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <p className="signup-eyebrow">Join the community</p>
          <h2 className="signup-title">Create your donor account</h2>
          <p className="signup-subtitle">Register securely to start sharing blood availability, managing requests, and connecting with recipients.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-label">
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="signup-input"
            />
          </label>
          <label className="signup-label">
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
              className="signup-input"
            />
          </label>
          <label className="signup-label">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a secure password"
              required
              className="signup-input"
            />
          </label>
          <label className="signup-label">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repeat your password"
              required
              className="signup-input"
            />
          </label>
          {error && <p className="signup-error">{error}</p>}
          <button type="submit" className="signup-button">Create Account</button>
        </form>

        <p className="login-prompt">
          Already have an account? <a href="/signin" className="login-link">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;