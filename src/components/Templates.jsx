import { useState } from 'react'
import { Link } from 'react-router-dom'

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const templates = [
    {
      id: 1,
      name: 'AI Chatbot',
      description: 'Start with an AI-powered chatbot app template with authentication and chat history.',
      technologies: ['Flutter', 'Supabase', 'OpenAI'],
      category: 'ai',
      icon: 'AI',
      iconBg: 'var(--mint)',
      iconColor: 'var(--marine)',
      tags: ['Auth', 'Chat', 'AI']
    },
    {
      id: 2,
      name: 'E-commerce App',
      description: 'Full-featured e-commerce starter app with payments and product management.',
      technologies: ['Flutter', 'Stripe', 'Supabase'],
      category: 'ecommerce',
      icon: 'EC',
      iconBg: 'var(--marine)',
      iconColor: 'var(--sand)',
      tags: ['Products', 'Payments', 'Orders']
    },
    {
      id: 3,
      name: 'Dashboard',
      description: 'Admin dashboard template with charts, analytics, and user management.',
      technologies: ['Flutter', 'go_router', 'Supabase'],
      category: 'dashboard',
      icon: 'DS',
      iconBg: 'var(--sand)',
      iconColor: 'var(--marine)',
      tags: ['Charts', 'Users', 'Analytics']
    },
    {
      id: 4,
      name: 'Social Media App',
      description: 'Complete social media app with posts, comments, likes, and real-time updates.',
      technologies: ['React', 'Firebase', 'Node.js'],
      category: 'social',
      icon: 'SM',
      iconBg: 'var(--mint)',
      iconColor: 'var(--marine)',
      tags: ['Posts', 'Comments', 'Real-time']
    },
    {
      id: 5,
      name: 'Task Manager',
      description: 'Productivity app with task management, team collaboration, and progress tracking.',
      technologies: ['Vue.js', 'Supabase', 'Tailwind'],
      category: 'productivity',
      icon: 'TM',
      iconBg: 'var(--marine)',
      iconColor: 'var(--sand)',
      tags: ['Tasks', 'Teams', 'Progress']
    },
    {
      id: 6,
      name: 'Blog Platform',
      description: 'Modern blog platform with markdown support, SEO optimization, and analytics.',
      technologies: ['Next.js', 'MDX', 'Vercel'],
      category: 'content',
      icon: 'BP',
      iconBg: 'var(--sand)',
      iconColor: 'var(--marine)',
      tags: ['Markdown', 'SEO', 'Analytics']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'social', label: 'Social' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'content', label: 'Content' }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (template) => {
    // In a real app, this would create a new project from the template
    console.log('Using template:', template.name)
    alert(`Creating new project from ${template.name} template...`)
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Page header */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Templates</h1>
        <p className="mt-2 text-muted">Choose from ready-made templates to kickstart your project.</p>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="panel rounded-xl px-4 py-3 flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-subtle">
                <path fill="currentColor" d="M10 18a8 8 0 1 1 8-8h-2a6 6 0 1 0-6 6zm11 3l-6-6l1.5-1.5l6 6z"/>
              </svg>
              <input 
                className="w-full bg-transparent outline-none placeholder:text-white/40 text-sm"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-64">
            <select 
              className="w-full panel rounded-xl px-4 py-3 text-sm bg-transparent outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-ink">
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <article key={template.id} className="template-card">
                {/* Header */}
                <div className="px-5 pt-5 flex items-center gap-3">
                  <div 
                    className="h-10 w-10 grid place-items-center rounded-xl font-extrabold"
                    style={{ 
                      background: template.iconBg, 
                      color: template.iconColor 
                    }}
                  >
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-xs text-subtle">
                      {template.technologies.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="px-5 mt-4 text-sm text-muted">
                  {template.description}
                </div>

                {/* Tags */}
                <div className="px-5 mt-4 flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="chip rounded-full px-2 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="mt-5 border-t border-white/10">
                  <button 
                    onClick={() => handleUseTemplate(template)}
                    className="btn btn-mint w-full py-3 font-semibold"
                  >
                    Use Template
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center border-t border-subtle">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
          Don't see what you're looking for?
        </h2>
        <p className="text-lg text-muted mb-6">
          Start from scratch with our AI-powered development studio.
        </p>
        <Link
          to="/studio"
          className="btn btn-mint rounded-full px-8 py-3 text-lg font-semibold"
        >
          Create Custom Project
        </Link>
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

export default Templates
