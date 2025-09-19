import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Plus, 
  Search, 
  Filter,
  Rocket,
  Code,
  Globe,
  Settings,
  Play,
  Pause,
  Trash2,
  Edit,
  Eye,
  Download,
  Share,
  Zap,
  Sparkles,
  Bot,
  Terminal,
  FileCode,
  Layers,
  Database,
  Cloud
} from 'lucide-react'
import { dbService } from '../lib/supabase'

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'web-app',
    template: 'blank'
  })
  const navigate = useNavigate()

  const projectTemplates = [
    {
      id: 'blank',
      name: 'Blank Project',
      description: 'Start from scratch with a clean slate',
      icon: <FileCode className="h-6 w-6" />,
      type: 'web-app'
    },
    {
      id: 'react-app',
      name: 'React Application',
      description: 'Modern React app with TypeScript and Tailwind CSS',
      icon: <Code className="h-6 w-6" />,
      type: 'web-app'
    },
    {
      id: 'nextjs-app',
      name: 'Next.js Application',
      description: 'Full-stack React framework with SSR and API routes',
      icon: <Layers className="h-6 w-6" />,
      type: 'web-app'
    },
    {
      id: 'vue-app',
      name: 'Vue.js Application',
      description: 'Progressive Vue.js app with Vite and TypeScript',
      icon: <Sparkles className="h-6 w-6" />,
      type: 'web-app'
    },
    {
      id: 'node-api',
      name: 'Node.js API',
      description: 'RESTful API with Express.js and MongoDB',
      icon: <Database className="h-6 w-6" />,
      type: 'backend'
    },
    {
      id: 'python-api',
      name: 'Python API',
      description: 'FastAPI backend with PostgreSQL database',
      icon: <Terminal className="h-6 w-6" />,
      type: 'backend'
    },
    {
      id: 'static-site',
      name: 'Static Website',
      description: 'HTML, CSS, and JavaScript static website',
      icon: <Globe className="h-6 w-6" />,
      type: 'static'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Template',
      description: 'Professional portfolio website template',
      icon: <Eye className="h-6 w-6" />,
      type: 'static'
    }
  ]

  const mockProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce application with React and Node.js',
      type: 'web-app',
      status: 'active',
      template: 'react-app',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T15:30:00Z',
      deployments: 5,
      url: 'https://ecommerce-demo.codelaunch.app'
    },
    {
      id: 2,
      name: 'Portfolio Website',
      description: 'Personal portfolio showcasing my projects and skills',
      type: 'static',
      status: 'deployed',
      template: 'portfolio',
      created_at: '2024-01-10T09:00:00Z',
      updated_at: '2024-01-18T12:00:00Z',
      deployments: 3,
      url: 'https://portfolio.codelaunch.app'
    },
    {
      id: 3,
      name: 'Task Management API',
      description: 'RESTful API for task management application',
      type: 'backend',
      status: 'development',
      template: 'node-api',
      created_at: '2024-01-22T14:00:00Z',
      updated_at: '2024-01-25T16:45:00Z',
      deployments: 1,
      url: null
    }
  ]

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    loadProjects()
  }, [user, navigate])

  const loadProjects = async () => {
    try {
      setLoading(true)
      
      // In a real app, this would load from Supabase
      // const { data } = await dbService.getUserProjects(user.id)
      
      // Using mock data for demonstration
      setProjects(mockProjects)
      
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async () => {
    try {
      const projectData = {
        ...newProject,
        user_id: user.id,
        status: 'development',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deployments: 0
      }

      // In a real app, this would save to Supabase
      // await dbService.createProject(projectData)
      
      // For demo, add to local state
      setProjects(prev => [{ ...projectData, id: Date.now() }, ...prev])
      setShowCreateDialog(false)
      setNewProject({ name: '', description: '', type: 'web-app', template: 'blank' })
      
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleProjectAction = (action, projectId) => {
    console.log(`${action} project:`, projectId)
    // Implement project actions (deploy, edit, delete, etc.)
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    const matchesType = filterType === 'all' || project.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status) => {
    const variants = {
      development: 'secondary',
      active: 'default',
      deployed: 'outline',
      paused: 'destructive'
    }
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>
  }

  const getTypeIcon = (type) => {
    const icons = {
      'web-app': <Code className="h-4 w-4" />,
      'backend': <Database className="h-4 w-4" />,
      'static': <Globe className="h-4 w-4" />
    }
    return icons[type] || <FileCode className="h-4 w-4" />
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
            <p className="text-muted-foreground">
              Build, deploy, and manage your applications with AI-powered development tools.
            </p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="gradient-bg">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Choose a template and configure your new project. Our AI assistant will help you get started quickly.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="My Awesome Project"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type">Project Type</Label>
                    <Select value={newProject.type} onValueChange={(value) => setNewProject(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="backend">Backend API</SelectItem>
                        <SelectItem value="static">Static Website</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe your project..."
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Choose Template</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectTemplates
                      .filter(template => template.type === newProject.type || template.id === 'blank')
                      .map((template) => (
                      <Card 
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          newProject.template === template.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setNewProject(prev => ({ ...prev, template: template.id }))}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white">
                              {template.icon}
                            </div>
                            <div>
                              <CardTitle className="text-sm">{template.name}</CardTitle>
                              <CardDescription className="text-xs">
                                {template.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="gradient-bg" 
                    onClick={handleCreateProject}
                    disabled={!newProject.name.trim()}
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* AI Assistant Banner */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Bot className="h-4 w-4" />
          <AlertDescription>
            <strong>AI Assistant Ready:</strong> Get intelligent code suggestions, automated testing, 
            and deployment optimization for all your projects.
          </AlertDescription>
        </Alert>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="deployed">Deployed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="web-app">Web App</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="static">Static Site</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full gradient-bg flex items-center justify-center">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">No projects found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all' || filterType !== 'all' 
                  ? 'Try adjusting your search or filters to find projects.'
                  : 'Create your first project to get started with Code Launch.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && filterType === 'all' && (
                <Button 
                  className="gradient-bg" 
                  onClick={() => setShowCreateDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover-lift group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white">
                      {getTypeIcon(project.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusBadge(project.status)}
                        <Badge variant="outline" className="text-xs">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {project.deployments} deployment{project.deployments !== 1 ? 's' : ''}
                  </span>
                  <span>
                    Updated {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>

                {project.url && (
                  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline truncate"
                    >
                      {project.url}
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleProjectAction('edit', project.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleProjectAction('settings', project.id)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleProjectAction('delete', project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {project.status === 'active' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleProjectAction('pause', project.id)}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleProjectAction('deploy', project.id)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      className="gradient-bg"
                      onClick={() => handleProjectAction('open', project.id)}
                    >
                      <Zap className="mr-1 h-4 w-4" />
                      Open
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
