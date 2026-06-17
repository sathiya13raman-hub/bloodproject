import './donorlist.css';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchDonors } from '../api';

function DonorList() {
  const [blood, setBlood] = useState('All');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDonors = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (location.trim()) params.location = location.trim();
        if (query.trim()) params.search = query.trim();
        const response = await fetchDonors(params);
        setDonors(response || []);
      } catch (err) {
        setError(err.message || 'Unable to load donors.');
      } finally {
        setLoading(false);
      }
    };

    loadDonors();
  }, [location, query]);

  const filtered = useMemo(() => {
    return donors.filter((d) => {
      if (blood !== 'All' && d.blood !== blood) return false;
      return true;
    });
  }, [blood, donors]);

  const handleWhatsApp = (donor) => {
    const phone = donor.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}`;
    window.open(url, '_blank');
  };

  return (
    <div className="donor-page">
      <div className="donor-hero">
        <h1>Find Nearby Donors</h1>
        <p className="donor-hero-sub">Filter by blood group, location, or search by name/phone.</p>
      </div>

      <div className="filters">
        <div className="filter-item">
          <label>Blood Group</label>
          <select value={blood} onChange={e => setBlood(e.target.value)}>
            <option value="All">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Location (city)</label>
          <input placeholder="e.g. Mumbai" value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <div className="filter-item search">
          <label>Search</label>
          <input placeholder="name or phone" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="donor-list">
        {loading ? (
          <div className="empty">Loading donors...</div>
        ) : error ? (
          <div className="empty">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No donors found. Try adjusting filters.</div>
        ) : (
          filtered.map(donor => (
            <div className="donor-card" key={donor.id}>
              <div className="donor-meta">
                <div className="donor-name">{donor.name}</div>
                <div className="donor-details">{donor.city} • Blood {donor.blood || donor.gender || 'N/A'}</div>
                <div className="donor-last">Last donated: {donor.lastDonated || donor.recent_date || 'Unknown'}</div>
              </div>

              <div className="donor-actions">
                <a className="cta call" href={`tel:${donor.phone || donor.phonenumber}`}>
                  Call
                </a>
                <button className="cta request" onClick={() => handleWhatsApp(donor)}>
                  WhatsApp
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default DonorList;
