import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipient } from '../api';
import './Recipient.css';

function Recipient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientname: '',
    contactnumber: '',
    age: '',
    gender: '',
    unitsreq: '',
    reason: '',
    location: '',
    hospitalname: '',
    frequency: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await createRecipient(formData);
      setSuccess('Patient registration completed successfully.');
      setFormData({
        patientname: '',
        contactnumber: '',
        age: '',
        gender: '',
        unitsreq: '',
        reason: '',
        location: '',
        hospitalname: '',
        frequency: '',
      });
      setTimeout(() => {
        navigate('/donor-list');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Unable to submit patient details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipient-page">
      <div className="recipient-panel">
        <h1>Patient Registration</h1>
        <p>Enter recipient details so we can match you with available donors faster.</p>

        <form className="recipient-form" onSubmit={handleSubmit}>
          <label>
            Patient Name
            <input name="patientname" value={formData.patientname} onChange={handleChange} required />
          </label>

          <label>
            Contact Number
            <input name="contactnumber" value={formData.contactnumber} onChange={handleChange} required />
          </label>

          <label>
            Age
            <input name="age" type="number" min="0" value={formData.age} onChange={handleChange} required />
          </label>

          <label>
            Gender
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Units Required
            <input name="unitsreq" value={formData.unitsreq} onChange={handleChange} required />
          </label>

          <label>
            Reason
            <input name="reason" value={formData.reason} onChange={handleChange} required />
          </label>

          <label>
            Location
            <input name="location" value={formData.location} onChange={handleChange} required />
          </label>

          <label>
            Hospital Name
            <input name="hospitalname" value={formData.hospitalname} onChange={handleChange} required />
          </label>

          <label>
            Frequency
            <input name="frequency" value={formData.frequency} onChange={handleChange} required />
          </label>

          {error && <div className="recipient-error">{error}</div>}
          {success && <div className="recipient-success">{success}</div>}

          <button type="submit" className="recipient-submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Patient Details'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recipient;
