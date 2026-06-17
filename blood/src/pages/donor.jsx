import './donor.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDonor, getAccessToken } from '../api';

function DonorRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    dob: '',
    mobile: '',
    address: '',
    city: '',
    email: '',
    gender: '',
    lastDonatedDate: '',
    maritalStatus: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.mobile) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!getAccessToken()) {
      navigate('/signin');
      return;
    }

    setLoading(true);

    try {
      await createDonor({
        name: formData.name,
        dob: formData.dob || null,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        gender: formData.gender,
        lastDonatedDate: formData.lastDonatedDate || null,
        maritalStatus: formData.maritalStatus,
      });
      navigate('/thank-you');
    } catch (err) {
      setError(err.message || 'Unable to submit registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        

        <h2>Donor Registration</h2>

        <p className="subtitle">
          Please fill in your details to register as a blood donor
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label>Donor Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name" 
                required
              />
            </div>

            <div className="input-group">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
              >
                <option>Select blood group</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              <input 
                type="tel" 
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter complete address"
            ></textarea>
          </div>

          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
            />
          </div>

          <div className="input-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Gender</label>

            <div className="gender">
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleInputChange}
                /> Male
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleInputChange}
                /> Female
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleInputChange}
                /> Other
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Last Blood Donated Date</label>
              <input 
                type="date" 
                name="lastDonatedDate"
                value={formData.lastDonatedDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
              >
                <option>Select marital status</option>
                <option>Single</option>
                <option>Married</option>
              </select>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonorRegistration;