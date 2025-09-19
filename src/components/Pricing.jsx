import { useState } from 'react'
import { Link } from 'react-router-dom'

const Pricing = ({ user }) => {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: 'Free',
      description: 'For hobby projects & testing',
      price: { monthly: 0, yearly: 0 },
      features: [
        '3 projects',
        'Community support',
        'Basic templates',
        '1GB storage',
        'Public repositories only'
      ],
      limitations: [
        'No team collaboration',
        'No custom domains',
        'No priority support'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'btn-secondary',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For startups & small teams',
      price: { monthly: 19, yearly: 190 },
      features: [
        'Unlimited projects',
        'Team collaboration',
        'Email support',
        '50GB storage',
        'Private repositories',
        'Custom domains',
        'Advanced templates',
        'AI code assistance'
      ],
      limitations: [],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'btn-mint',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For larger organizations',
      price: { monthly: 'Custom', yearly: 'Custom' },
      features: [
        'Unlimited everything',
        'Dedicated support',
        'SLA & Security compliance',
        'Unlimited storage',
        'Advanced analytics',
        'Custom integrations',
        'Priority AI features',
        'White-label options'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonStyle: 'btn-secondary',
      popular: false
    }
  ]

  const handleSubscribe = (plan) => {
    if (plan.name === 'Free') {
      // Redirect to registration for free plan
      window.location.href = '/register'
    } else if (plan.name === 'Enterprise') {
      // Open contact form or email
      window.location.href = 'mailto:sales@codelaunch.com?subject=Enterprise Plan Inquiry'
    } else {
      // Handle Pro plan subscription
      alert(`Redirecting to payment for ${plan.name} plan...`)
    }
  }

  const getPrice = (plan) => {
    if (typeof plan.price.monthly === 'string') {
      return plan.price.monthly
    }
    return isYearly ? `$${plan.price.yearly}` : `$${plan.price.monthly}`
  }

  const getPeriod = (plan) => {
    if (typeof plan.price.monthly === 'string') {
      return 'per month'
    }
    return isYearly ? 'per year' : 'per month'
  }

  const getSavings = (plan) => {
    if (typeof plan.price.monthly === 'string' || !isYearly) {
      return null
    }
    const monthlyCost = plan.price.monthly * 12
    const savings = monthlyCost - plan.price.yearly
    return savings > 0 ? `Save $${savings}` : null
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Page header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Pricing</h1>
        <p className="mt-3 text-muted max-w-2xl mx-auto">
          Simple and transparent pricing. Choose the plan that fits your needs.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm ${!isYearly ? 'text-white' : 'text-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? 'bg-mint' : 'bg-white/20'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isYearly ? 'text-white' : 'text-muted'}`}>
            Yearly
          </span>
          {isYearly && (
            <span className="text-xs bg-mint text-marine px-2 py-1 rounded-full font-semibold">
              Save 20%
            </span>
          )}
        </div>
      </section>

      {/* Pricing grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <article 
              key={plan.name} 
              className={`pricing-card ${plan.popular ? 'featured' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-mint text-marine px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="relative">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
                
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">{getPrice(plan)}</span>
                  <span className="text-sm text-muted ml-1">{getPeriod(plan)}</span>
                  {getSavings(plan) && (
                    <div className="text-xs text-mint mt-1">{getSavings(plan)}</div>
                  )}
                </div>

                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted">
                      <span className="text-mint">✔</span>
                      {feature}
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted">
                      <span className="text-red-400">✘</span>
                      {limitation}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe(plan)}
                  className={`btn ${plan.buttonStyle} mt-6 w-full rounded-lg py-2 font-semibold`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="panel rounded-xl p-6">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-muted">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="panel rounded-xl p-6">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted">Yes! Our Free plan gives you access to core features. You can upgrade to Pro anytime to unlock advanced features.</p>
            </div>
            <div className="panel rounded-xl p-6">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
            <div className="panel rounded-xl p-6">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted">Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted mb-6">Join thousands of developers building the future with Code Launch.</p>
          {!user && (
            <Link
              to="/register"
              className="btn btn-mint rounded-full px-8 py-3 text-lg font-semibold"
            >
              Start Free Trial
            </Link>
          )}
        </section>
      </main>

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

export default Pricing
