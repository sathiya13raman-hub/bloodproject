import React, { useEffect, useState } from 'react';
import { fetchRecipients } from '../api';
import './Recipient.css';

function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchRecipients();
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data && Array.isArray(data.results)) list = data.results;
        else if (data && Array.isArray(data.recipients)) list = data.recipients;
        if (mounted) setRecipients(list);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load recipients');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="recipient-list">Loading recipients...</div>;
  if (error) return <div className="recipient-list error">{error}</div>;

  return (
    <div className="recipient-list">
      <h1>Recipient Requests</h1>
      {recipients.length === 0 ? (
        <p>No recipient requests found.</p>
      ) : (
        <div className="recipient-grid">
          {recipients.map((r) => {
            const phone = r.contactnumber || '';
            const telHref = `tel:${phone}`;
            const digits = phone.replace(/[^0-9+]/g, '');
            const waMessage = encodeURIComponent(
              `Hello, I can help with the blood request for ${r.patientname} (${r.unitsreq} units) at ${r.location}`,
            );
            const waHref = `https://wa.me/${digits.replace(/^\+/, '')}?text=${waMessage}`;

            return (
              <div key={r.id} className="recipient-card">
                <div className="recipient-card-main">
                  <div className="recipient-name">{r.patientname}</div>
                  <div className="recipient-meta">{r.unitsreq} units • {r.location}</div>
                  <div className="recipient-sub">Hospital: {r.hospitalname || 'N/A'}</div>
                  <div className="recipient-sub">Contact: {r.contactnumber || 'N/A'}</div>
                </div>
                <div className="recipient-actions">
                  <a 
                    className="btn btn-call" 
                    href={telHref}
                    aria-label={`Call hospital for ${r.patientname}`}
                    title={`Call ${r.contactnumber}`}
                  >
                    📞 Call
                  </a>
                  <a 
                    className="btn btn-wa" 
                    href={waHref} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={`Message about ${r.patientname} on WhatsApp`}
                    title={`WhatsApp hospital`}
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecipientList;
