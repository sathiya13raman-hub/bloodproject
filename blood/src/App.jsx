import Signup from './pages/signup'
import Signin from './pages/signin'
import './App.css'
import Home from './pages/home'
import DonorRegistration from './pages/donor'
import DonorList from './pages/donorlist'
import Recipient from './pages/Recipient'
import RecipientList from './pages/recipientlist'
import ThankYou from './pages/thankyou'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/donor-registration" element={<DonorRegistration />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/recipient-list" element={<RecipientList />} />
        <Route path="/recipient-registration" element={<Recipient />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  )
}

export default App
