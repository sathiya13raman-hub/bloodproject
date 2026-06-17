import './home.css'
import Card from '../components/card.jsx'
import { useNavigate } from 'react-router-dom';
function Home(){
  const navigate = useNavigate();

  const handleDonorClick = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/donor-registration');
    } else {
      navigate('/signin');
    }
  };

  return(
    <div className="homebody">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Trusted blood support for every community</p>
          <h1>LifeBlood helps donors and recipients connect faster.</h1>
          <p className="hero-text">Donate with confidence, find lifesaving blood quickly, and make a measurable impact in your neighborhood. LifeBlood is designed to be easy, reliable, and responsive wherever you are.</p>
          <div className="buttonsspace">
            <button className="click primary" onClick={handleDonorClick}>
              I am a donor
            </button>
            <button className="click secondary" onClick={() => navigate('/donor-list')}>
              Need blood
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-pill">Life-saving support</div>
          <h2>Connect with verified donors in minutes.</h2>
          <p>Search by blood group, location, and availability. Keep hope alive with a simple, secure donor network.</p>
          <div className="hero-stats">
            <div>
              <strong>1,250+</strong>
              <span>registered donors</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>response rate</span>
            </div>
          </div>
        </div>
      </div>

      <section className="features">
        <h2>Why choose LifeBlood?</h2>
        <p>Every feature is built to reduce response time, keep data clear, and let you focus on what matters most: saving lives.</p>

        <div className="cardcon">
          <Card title="Easy Registration" info="Quick and simple donor registration process." />
          <Card title="Find Donors" info="Search donors by blood group and location." />
          <Card title="Save Lives" info="Connect quickly and help save precious lives." />
        </div>
      </section>
    </div>
  )
}
export default Home;