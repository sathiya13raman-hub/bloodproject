import './thankyou.css';

function ThankYou() {
  const handleHome = () => {
    window.location.href = '/';
  };

  return (
    <main className="thankyou-page">
      <div className="thankyou-panel">
        <div className="thankyou-badge">Thank You</div>
        <h1>Registration Successful</h1>
        <p>
          Thank you for registering as a blood donor. Your generous act of kindness
          will help save lives and strengthen the community.
        </p>

        <div className="thankyou-summary">
          <div className="summary-item">
            <strong>Life-saving impact</strong>
            <span>Your profile is now listed for future blood requests.</span>
          </div>
          <div className="summary-item">
            <strong>Fast support</strong>
            <span>We’ll contact you when a matching blood type is needed.</span>
          </div>
        </div>

        <button type="button" className="thankyou-button" onClick={handleHome}>
          Back to Home
        </button>
      </div>
    </main>
  );
}

export default ThankYou;
