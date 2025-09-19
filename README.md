# Code Launch - AI-Powered Development Platform

![Code Launch Logo](https://img.shields.io/badge/Code%20Launch-AI%20Powered-blue?style=for-the-badge&logo=rocket)

Code Launch is a modern, AI-powered development platform that helps developers build, deploy, and scale applications faster than ever before. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

### Core Platform
- **AI-Powered Development**: Intelligent code assistance and automated workflows
- **Instant Deployment**: One-click deployment to global CDN
- **Project Management**: Comprehensive project organization and tracking
- **Team Collaboration**: Real-time collaboration tools and shared workspaces

### Authentication & Security
- **Supabase Integration**: Secure authentication and user management
- **Role-Based Access**: User and admin role management
- **Enterprise Security**: Bank-level security with encryption

### Subscription System
- **Multi-Tier Plans**: Free, Pro, and Enterprise subscription tiers
- **Feature Gating**: Plan-based feature access control
- **Billing Management**: Comprehensive subscription and billing system

### Admin Dashboard
- **User Management**: Complete user administration interface
- **Subscription Control**: Manage user subscriptions and billing
- **System Analytics**: Platform usage and performance metrics
- **Project Oversight**: Monitor all user projects and deployments

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khamis1992/coder.git
   cd coder
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

## 🗄 Database Setup

### Supabase Tables

Create the following tables in your Supabase project:

#### profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  subscription TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

#### projects
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'web-app',
  status TEXT DEFAULT 'development',
  template TEXT,
  url TEXT,
  deployments INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Design System

### Color Scheme
- **Primary**: Purple gradient (`oklch(0.55 0.25 270)`)
- **Secondary**: Blue (`oklch(0.6 0.2 240)`)
- **Accent**: Purple-pink (`oklch(0.65 0.22 300)`)

### Components
- Built with shadcn/ui for consistency
- Custom gradient backgrounds and animations
- Responsive design for all screen sizes
- Dark/light mode support

## 📱 Pages & Features

### Public Pages
- **Home**: Landing page with features and testimonials
- **Pricing**: Subscription plans and feature comparison
- **Login/Register**: Authentication flows

### Protected Pages
- **Dashboard**: User overview and project management
- **Projects**: Project creation and management interface
- **Admin Dashboard**: System administration (admin only)

### Key Features
- **No Sidebar**: Clean, modern navigation without traditional sidebar
- **AI Integration**: Ready for AI assistant integration
- **Project Templates**: Multiple project templates (React, Vue, Node.js, etc.)
- **Deployment Ready**: Built for easy deployment to cloud platforms

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Manual Build
```bash
pnpm run build
# Files will be in the 'dist' directory
```

## 🔧 Development

### Available Scripts
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Home.jsx        # Landing page
│   ├── Projects.jsx    # Projects management
│   ├── Pricing.jsx     # Subscription plans
│   ├── Dashboard.jsx   # User dashboard
│   └── AdminDashboard.jsx # Admin interface
├── lib/                # Utilities and services
│   └── supabase.js     # Supabase client and services
├── App.jsx             # Main app component
├── App.css             # Global styles and theme
└── main.jsx            # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication by [Supabase](https://supabase.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email support@codelaunch.com or join our Discord community.

---

**Code Launch** - Build the Future with AI-Powered Development 🚀
