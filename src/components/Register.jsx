import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../lib/supabase'

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!acceptTerms) {
      setError('Please accept the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }

    try {
      const { user } = await authService.signUp(formData.email, formData.password, {
        full_name: formData.fullName
      })
      
      if (user) {
        setUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    alert(`${provider} registration will be implemented soon!`)
  }

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col">
      {/* Ambient background effect */}
      <div className="absolute inset-x-0 bottom-[-20vh] h-[60vh] -z-10 ambient"></div>

      {/* Main content */}
      <main className="flex-1 grid place-items-center px-6 py-10">
        <section className="w-full max-w-md panel rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl bg-mint text-marine">
              <span className="font-extrabold">CL</span>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold">Create your account</h1>
            <p className="mt-1 text-muted">Join Code Launch and start building apps</p>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold">Full Name</label>
              <input 
                id="fullName" 
                name="fullName"
                type="text" 
                required 
                placeholder="John Doe"
                className="mt-2 w-full rounded-xl px-3 py-2 input text-sm"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input 
                id="email" 
                name="email"
                type="email" 
                required 
                placeholder="you@company.com"
                className="mt-2 w-full rounded-xl px-3 py-2 input text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">Password</label>
              <input 
                id="password" 
                name="password"
                type="password" 
                required 
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl px-3 py-2 input text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
              <input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                required 
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl px-3 py-2 input text-sm"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                id="terms" 
                required 
                className="accent-mint"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link to="/terms" className="text-mint hover:underline">Terms</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-mint hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={loading}
              className="btn btn-mint w-full rounded-xl px-4 py-2.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner"></div>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-2 text-xs text-faint">or sign up with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button" 
                onClick={() => handleSocialLogin('Google')}
                className="btn btn-secondary rounded-xl py-2 text-sm"
              >
                Google
              </button>
              <button 
                type="button" 
                onClick={() => handleSocialLogin('GitHub')}
                className="btn btn-secondary rounded-xl py-2 text-sm"
              >
                GitHub
              </button>
              <button 
                type="button" 
                onClick={() => handleSocialLogin('Apple')}
                className="btn btn-secondary rounded-xl py-2 text-sm"
              >
                Apple
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-subtle">
            Already have an account?{' '}
            <Link to="/login" className="text-mint hover:underline">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}

export default Register
