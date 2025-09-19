import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Check, 
  X, 
  Zap, 
  Crown, 
  Building, 
  Rocket,
  Users,
  Shield,
  Headphones,
  Globe,
  Database,
  Code
} from 'lucide-react'

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false)
  const navigate = useNavigate()

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      icon: <Rocket className="h-6 w-6" />,
      popular: false,
      features: [
        { name: '3 Projects', included: true },
        { name: '1GB Storage', included: true },
        { name: 'Basic Templates', included: true },
        { name: 'Community Support', included: true },
        { name: 'Basic AI Assistant', included: true },
        { name: 'Public Repositories', included: true },
        { name: 'Standard Deployment', included: true },
        { name: 'Advanced Features', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Custom Domains', included: false },
        { name: 'Team Collaboration', included: false },
        { name: 'Advanced Analytics', included: false }
      ],
      cta: 'Get Started Free',
      ctaVariant: 'outline'
    },
    {
      name: 'Pro',
      description: 'For professional developers',
      price: { monthly: 29, yearly: 290 },
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      features: [
        { name: 'Unlimited Projects', included: true },
        { name: '50GB Storage', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Advanced AI Assistant', included: true },
        { name: 'Private Repositories', included: true },
        { name: 'Custom Domains', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Team Collaboration (5 members)', included: true },
        { name: 'API Access', included: true },
        { name: 'Advanced Deployment Options', included: true },
        { name: 'White-label Solutions', included: false }
      ],
      cta: 'Start Pro Trial',
      ctaVariant: 'default'
    },
    {
      name: 'Enterprise',
      description: 'For large teams and organizations',
      price: { monthly: 99, yearly: 990 },
      icon: <Building className="h-6 w-6" />,
      popular: false,
      features: [
        { name: 'Unlimited Everything', included: true },
        { name: 'Unlimited Storage', included: true },
        { name: 'Custom Templates', included: true },
        { name: '24/7 Dedicated Support', included: true },
        { name: 'Enterprise AI Features', included: true },
        { name: 'Advanced Security', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Advanced Analytics & Reporting', included: true },
        { name: 'Unlimited Team Members', included: true },
        { name: 'Full API Access', included: true },
        { name: 'White-label Solutions', included: true },
        { name: 'SLA Guarantee', included: true }
      ],
      cta: 'Contact Sales',
      ctaVariant: 'outline'
    }
  ]

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'AI-Powered Development',
      description: 'Advanced AI assistant that helps you write better code faster'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Deployment',
      description: 'Deploy your applications worldwide with our global CDN'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using real-time collaboration tools'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption and compliance standards'
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: 'Scalable Infrastructure',
      description: 'Auto-scaling infrastructure that grows with your needs'
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock support from our expert development team'
    }
  ]

  const handlePlanSelect = (planName) => {
    if (planName === 'Free') {
      navigate('/register')
    } else if (planName === 'Enterprise') {
      // Handle enterprise contact
      window.location.href = 'mailto:sales@codelaunch.com?subject=Enterprise Plan Inquiry'
    } else {
      // Handle Pro plan subscription
      navigate('/register?plan=pro')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your <span className="gradient-text">Launch Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start free and scale as you grow. All plans include our core features 
              with different limits and advanced capabilities.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm ${isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative hover-lift ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-bg text-white px-4 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg gradient-bg flex items-center justify-center text-white">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                      {plan.price.monthly > 0 && (
                        <span className="text-lg font-normal text-muted-foreground">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isYearly && plan.price.monthly > 0 && (
                      <div className="text-sm text-muted-foreground">
                        ${(plan.price.yearly / 12).toFixed(0)}/month billed annually
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-bg' : ''}`}
                    variant={plan.ctaVariant}
                    onClick={() => handlePlanSelect(plan.name)}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Build & Deploy</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and services you need to build, 
              deploy, and scale modern applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift glass-effect border-0">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing differences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What happens if I exceed my limits?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limits. For storage and bandwidth, 
                  we offer automatic scaling options or you can upgrade to a higher plan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Is there a free trial for paid plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Pro and Enterprise plans come with a 14-day free trial. 
                  No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. 
                  If you're not satisfied, contact our support team for a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Launch Your Project</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are building amazing applications with Code Launch. 
              Start your free account today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gradient-bg text-lg px-8 py-3">
                <Link to="/register">
                  Start Free Trial
                  <Rocket className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
