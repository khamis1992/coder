import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../lib/supabase'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { user } = await authService.signIn(email, password)
      setUser(user)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    alert(`${provider} login will be implemented soon!`)
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
            <h1 className="mt-4 text-2xl font-extrabold">Welcome back</h1>
            <p className="mt-1 text-muted">Sign in to your Code Launch account</p>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input 
                id="email" 
                type="email" 
                required 
                placeholder="you@company.com"
                className="mt-2 w-full rounded-xl px-3 py-2 input text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">Password</label>
              <input 
                id="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl px-3 py-2 input text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-mint hover:underline">
                Forgot your password?
              </Link>
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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-2 text-xs text-faint">or sign in with</span>
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
            Don't have an account?{' '}
            <Link to="/register" className="text-mint hover:underline">
              Sign up
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}

export default Login
