import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../lib/supabase'

const Navbar = ({ user, setUser }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      setUser(null)
      localStorage.removeItem('user')
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/projects', label: 'Projects', requiresAuth: true },
    { path: '/templates', label: 'Templates', requiresAuth: false },
    { path: '/studio', label: 'Studio', requiresAuth: true },
    { path: '/pricing', label: 'Pricing', requiresAuth: false },
  ]

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <header className="border-b border-subtle">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-extrabold tracking-tight text-mint text-lg sm:text-xl"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-mint"></span>
          <span>Code Launch</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
          {navItems.map((item) => {
            // Show item if it doesn't require auth, or if user is logged in
            if (item.requiresAuth && !user) return null
            
            return (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`transition-colors ${
                    isActive(item.path) ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* User info */}
              <span className="hidden sm:inline text-sm text-muted">
                Welcome, <strong className="text-white">{user.user_metadata?.full_name || user.email}</strong>
              </span>
              
              {/* Settings button */}
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex btn btn-secondary rounded-full px-4 py-2 text-sm font-semibold"
              >
                Dashboard
              </Link>

              {/* New Project button */}
              <Link
                to="/studio"
                className="btn btn-mint rounded-full px-4 py-2 text-sm font-semibold"
              >
                New Project
              </Link>

              {/* Sign out button */}
              <button
                onClick={handleSignOut}
                className="btn btn-secondary rounded-full px-4 py-2 text-sm font-semibold"
              >
                Sign out
              </button>

              {/* User avatar */}
              <div className="h-8 w-8 rounded-full bg-mint text-marine font-bold flex items-center justify-center text-sm">
                {getInitials(user.user_metadata?.full_name || user.email)}
              </div>
            </>
          ) : (
            <>
              {/* Sign in button */}
              <Link
                to="/login"
                className="btn btn-secondary rounded-full px-4 py-2 text-sm font-semibold"
              >
                Sign in
              </Link>

              {/* Get started button */}
              <Link
                to="/register"
                className="btn btn-mint rounded-full px-4 py-2 text-sm font-semibold"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden btn btn-secondary rounded-lg p-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-subtle bg-ink">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            {navItems.map((item) => {
              // Show item if it doesn't require auth, or if user is logged in
              if (item.requiresAuth && !user) return null
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 text-sm transition-colors ${
                    isActive(item.path) ? 'text-mint' : 'text-muted hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            
            {!user && (
              <div className="pt-3 border-t border-subtle space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-sm text-muted hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-sm text-mint font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
