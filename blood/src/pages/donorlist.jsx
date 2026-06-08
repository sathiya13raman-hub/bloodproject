import './donorlist.css';
import React, { useMemo, useState } from "react";

const SAMPLE_DONORS = [
  { id: 1, name: 'Asha Kumar', blood: 'A+', city: 'Mumbai', phone: '+919876543210', lastDonated: '2024-12-10' },
  { id: 2, name: 'Ravi Patel', blood: 'O+', city: 'Ahmedabad', phone: '+919812345678', lastDonated: '2025-03-01' },
  { id: 3, name: 'Priya Sharma', blood: 'B+', city: 'Delhi', phone: '+919701234567', lastDonated: '2024-09-18' },
  { id: 4, name: 'John Doe', blood: 'AB+', city: 'Bengaluru', phone: '+919600112233', lastDonated: '2025-01-05' },
  { id: 5, name: 'Sangeeta Rao', blood: 'O-', city: 'Hyderabad', phone: '+919898765432', lastDonated: '2024-11-22' }
];

function DonorList() {
  const [blood, setBlood] = useState('All');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return SAMPLE_DONORS.filter(d => {
      if (blood !== 'All' && d.blood !== blood) return false;
      if (location.trim() && !d.city.toLowerCase().includes(location.trim().toLowerCase())) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return d.name.toLowerCase().includes(q) || d.phone.includes(q);
      }
      return true;
    });
  }, [blood, location, query]);

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
        {filtered.length === 0 ? (
          <div className="empty">No donors found. Try adjusting filters.</div>
        ) : (
          filtered.map(donor => (
            <div className="donor-card" key={donor.id}>
              <div className="donor-meta">
                <div className="donor-name">{donor.name}</div>
                <div className="donor-details">{donor.city} • Blood {donor.blood}</div>
                <div className="donor-last">Last donated: {donor.lastDonated}</div>
              </div>

              <div className="donor-actions">
                <a className="cta call" href={`tel:${donor.phone}`}>Call</a>
                <button className="cta request" onClick={() => handleWhatsApp(donor)}>WhatsApp</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default DonorList;
