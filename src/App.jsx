import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Templates from './components/Templates'
import Studio from './components/Studio'
import Pricing from './components/Pricing'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-ink text-white">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/projects" element={<Projects user={user} />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/studio" element={<Studio user={user} />} />
          <Route path="/pricing" element={<Pricing user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
