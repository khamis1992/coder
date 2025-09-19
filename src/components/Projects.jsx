import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-commerce Dashboard',
      description: 'Admin dashboard for managing products and orders',
      status: 'deployed',
      lastModified: '2 hours ago',
      framework: 'React',
      url: 'https://ecommerce-dash.codelaunch.app'
    },
    {
      id: 2,
      name: 'AI Chat Bot',
      description: 'Customer support chatbot with AI integration',
      status: 'building',
      lastModified: '1 day ago',
      framework: 'Vue.js',
      url: null
    },
    {
      id: 3,
      name: 'Portfolio Website',
      description: 'Personal portfolio with blog functionality',
      status: 'draft',
      lastModified: '3 days ago',
      framework: 'Next.js',
      url: null
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'text-mint'
      case 'building': return 'text-yellow-400'
      case 'draft': return 'text-muted'
      default: return 'text-muted'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed': return '🟢'
      case 'building': return '🟡'
      case 'draft': return '⚪'
      default: return '⚪'
    }
  }

  const handleCreateProject = () => {
    // Navigate to studio or show create project modal
    window.location.href = '/studio'
  }

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId))
    }
  }

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'deployed', label: 'Deployed', count: projects.filter(p => p.status === 'deployed').length },
    { id: 'building', label: 'Building', count: projects.filter(p => p.status === 'building').length },
    { id: 'draft', label: 'Drafts', count: projects.filter(p => p.status === 'draft').length }
  ]

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Page header */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Projects</h1>
            <p className="mt-2 text-muted">Manage and deploy your applications</p>
          </div>
          <button 
            onClick={handleCreateProject}
            className="btn btn-mint rounded-xl px-6 py-2.5 font-semibold"
          >
            + New Project
          </button>
        </div>
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {filters.map(filterOption => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`tab px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${
                  filter === filterOption.id ? 'active' : 'inactive'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-muted mb-6">
              {searchTerm 
                ? 'Try adjusting your search criteria.' 
                : 'Create your first project to get started with Code Launch.'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={handleCreateProject}
                className="btn btn-mint rounded-xl px-6 py-2.5 font-semibold"
              >
                Create Your First Project
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                {/* Header */}
                <div className="px-5 pt-5 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getStatusIcon(project.status)}</span>
                      <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-sm text-muted mt-1">{project.description}</p>
                  </div>
                  
                  {/* Actions Menu */}
                  <div className="relative">
                    <button className="text-muted hover:text-white p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="px-5 mt-4 flex items-center gap-4 text-xs text-subtle">
                  <span className="chip rounded-full px-2 py-1">
                    {project.framework}
                  </span>
                  <span>Updated {project.lastModified}</span>
                </div>

                {/* Actions */}
                <div className="mt-5 border-t border-white/10 p-5 flex gap-2">
                  {project.status === 'deployed' && project.url ? (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-mint flex-1 py-2 text-sm font-semibold"
                    >
                      View Live
                    </a>
                  ) : (
                    <Link 
                      to={`/studio?project=${project.id}`}
                      className="btn btn-mint flex-1 py-2 text-sm font-semibold text-center"
                    >
                      {project.status === 'draft' ? 'Continue Building' : 'Open Editor'}
                    </Link>
                  )}
                  
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="btn btn-secondary px-3 py-2 text-sm"
                    title="Delete project"
                  >
                    🗑️
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
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

export default Projects
