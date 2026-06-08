import React from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom'; 

function Signup() {
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement signup logic
    navigate('/donor-registration');
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
            <input type="text" name="name" placeholder="Enter your full name" required className="signup-input" />
          </label>
          <label className="signup-label">
            Email Address
            <input type="email" name="email" placeholder="you@example.com" required className="signup-input" />
          </label>
          <label className="signup-label">
            Password
            <input type="password" name="password" placeholder="Create a secure password" required className="signup-input" />
          </label>
          <label className="signup-label">
            Confirm Password
            <input type="password" name="confirmPassword" placeholder="Repeat your password" required className="signup-input" />
          </label>
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