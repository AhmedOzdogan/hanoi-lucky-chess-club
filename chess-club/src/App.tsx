import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <>

      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/events" element={<h1>Events</h1>} />
        <Route path="/members" element={<h1>Members</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App