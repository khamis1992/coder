import { Link } from 'react-router-dom'

const Home = ({ user }) => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Development',
      description: 'Build applications faster with our intelligent AI assistant that understands your code and helps you develop efficiently.'
    },
    {
      icon: '⚡',
      title: 'Instant Deployment',
      description: 'Deploy your projects to the cloud with a single click. No complex configurations or lengthy setup processes.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Your code and data are protected with enterprise-grade security measures and encrypted storage.'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using real-time collaboration tools and shared workspaces.'
    },
    {
      icon: '🌍',
      title: 'Global CDN',
      description: 'Your applications are served from our global content delivery network for optimal performance worldwide.'
    },
    {
      icon: '📋',
      title: 'Smart Templates',
      description: 'Start with pre-built templates for popular frameworks and customize them to fit your needs.'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Active Developers' },
    { number: '50K+', label: 'Projects Deployed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ]

  const testimonials = [
    {
      quote: "Code Launch has revolutionized my development workflow. I can build and deploy applications in minutes, not hours.",
      author: "Sarah Chen",
      role: "Full Stack Developer"
    },
    {
      quote: "The AI assistance is incredible. It's like having a senior developer pair programming with me 24/7.",
      author: "Marcus Rodriguez",
      role: "Startup Founder"
    },
    {
      quote: "Our team's productivity has increased by 300% since switching to Code Launch. The collaboration features are outstanding.",
      author: "Emily Johnson",
      role: "Tech Lead"
    }
  ]

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Ambient background effect */}
      <div className="absolute inset-x-0 bottom-[-20vh] h-[60vh] -z-10 ambient"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Build the Future with{' '}
          <span className="text-mint">AI-Powered Development</span>
        </h1>
        <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
          Code Launch is the ultimate development platform that combines artificial intelligence 
          with modern tools to help you build, deploy, and scale applications faster than ever before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <Link
                to="/studio"
                className="btn btn-mint rounded-full px-8 py-3 text-lg font-semibold"
              >
                Start Building Free
              </Link>
              <Link
                to="/projects"
                className="btn btn-secondary rounded-full px-8 py-3 text-lg font-semibold"
              >
                View Projects
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="btn btn-mint rounded-full px-8 py-3 text-lg font-semibold"
              >
                Start Building Free
              </Link>
              <Link
                to="/templates"
                className="btn btn-secondary rounded-full px-8 py-3 text-lg font-semibold"
              >
                View Templates
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Everything You Need to{' '}
            <span className="text-mint">Launch Fast</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and services you need to build modern applications efficiently.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="panel rounded-2xl p-6 card-hover">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-mint mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-xl text-muted">
            See what our community has to say about Code Launch
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="panel rounded-2xl p-6 card-hover">
              <blockquote className="text-lg mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Ready to Launch Your Ideas?
        </h2>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
          Join thousands of developers who are building the future with Code Launch. 
          Start your free trial today and experience the power of AI-driven development.
        </p>
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-mint rounded-full px-8 py-3 text-lg font-semibold"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="btn btn-secondary rounded-full px-8 py-3 text-lg font-semibold"
            >
              View Pricing
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-faint">
          <p>© {new Date().getFullYear()} Code Launch</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
