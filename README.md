# Joto Teacher Portal

A comprehensive teacher time tracking and management system built with Next.js, Supabase, and modern web technologies.

## 🚀 Features

- **Teacher Management**: Create, edit, and manage teacher profiles
- **Time Tracking**: Start/end work sessions with precise time tracking
- **Break Management**: Handle temporary breaks with project descriptions
- **Real-time Dashboard**: Live updates of teacher activities and statuses
- **Advanced Filtering**: Filter sessions by teacher, status, date range
- **CSV Export**: Download time records for reporting and analysis
- **Multi-language Support**: English and Mongolian (i18n)
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **UI Components**: shadcn/ui + Tailwind CSS
- **Internationalization**: next-intl
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Vercel account (for deployment)

## 🔧 Installation

1. **Clone and Install**

   ```bash
   git clone <your-repo-url>
   cd joto-teacher-portal
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env.local
   # Fill in your Supabase credentials
   ```

3. **Database Setup**

   - Create tables using the SQL schema provided in the guide
   - Configure Row Level Security policies
   - Set up proper indexes

4. **Development**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## 📊 Database Schema

The application uses the following main tables:

- **teachers**: Store teacher information and profiles
- **work_sessions**: Track work sessions with start/end times
- **break_logs**: Log break activities and projects

## 🎯 Usage

1. **Create Teachers**: Add new teachers to the system
2. **Start Work Sessions**: Teachers can start their work time
3. **Manage Breaks**: Submit break projects when temporarily away
4. **Track Activities**: View all activities in the dashboard table
5. **Export Data**: Download CSV reports for analysis

## 🌍 Internationalization

The app supports multiple languages:

- English (default)
- Mongolian

Add new languages by creating translation files in `/messages/`

## 📱 API Endpoints

- `GET/POST /api/teachers` - Teacher management
- `GET/POST /api/work-sessions` - Work session operations
- `PUT /api/work-sessions/[id]` - Update sessions
- `POST /api/break-logs` - Break logging

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Server-side API validation with Zod
- Secure environment variable handling
- Input sanitization and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

---

**Built with ❤️ using Next.js, Supabase, and shadcn/ui**
