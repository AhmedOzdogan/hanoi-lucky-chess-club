import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/events" element={<h1>Events</h1>} />
        <Route path="/members" element={<h1>Members</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Routes>
    </>
  )
}

export default App