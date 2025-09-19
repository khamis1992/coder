import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Rocket, 
  Code, 
  Zap, 
  Shield, 
  Users, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "AI-Powered Development",
      description: "Build applications faster with our intelligent AI assistant that understands your code and helps you develop efficiently."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Deployment",
      description: "Deploy your projects to the cloud with a single click. No complex configurations or lengthy setup processes."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Your code and data are protected with enterprise-grade security measures and encrypted storage."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team using real-time collaboration tools and shared workspaces."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global CDN",
      description: "Your applications are served from our global content delivery network for optimal performance worldwide."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Templates",
      description: "Start with pre-built templates for popular frameworks and customize them to fit your needs."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      content: "Code Launch has revolutionized my development workflow. I can build and deploy applications in minutes, not hours.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "The AI assistance is incredible. It's like having a senior developer pair programming with me 24/7.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Tech Lead",
      content: "Our team's productivity has increased by 300% since switching to Code Launch. The collaboration features are outstanding.",
      rating: 5
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Build the Future with{' '}
                <span className="gradient-text">AI-Powered Development</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Code Launch is the ultimate development platform that combines artificial intelligence 
                with modern tools to help you build, deploy, and scale applications faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="gradient-bg hover-lift text-lg px-8 py-3">
                  <Link to="/register">
                    Start Building Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                  <Link to="/projects">
                    View Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Launch Fast</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and services you need 
              to build modern applications efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift glass-effect border-0 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
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

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-in">
              <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-muted-foreground">Active Developers</div>
            </div>
            <div className="animate-bounce-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-muted-foreground">Projects Deployed</div>
            </div>
            <div className="animate-bounce-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="animate-bounce-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Developers Worldwide</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say about Code Launch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Launch Your Ideas</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are building the future with Code Launch. 
              Start your free trial today and experience the power of AI-driven development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gradient-bg hover-lift text-lg px-8 py-3">
                <Link to="/register">
                  Get Started Free
                  <Rocket className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
