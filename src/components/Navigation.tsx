import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Sparkles, Building2, User, Layers } from 'lucide-react';
import BKLogo from './BKLogo';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-forest-200/80 z-50 transition-all">
      <div className="container mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between">
          {/* Brand / Name badge */}
          <Link to="/" className="flex items-center space-x-3 group">
            <BKLogo size={42} className="group-hover:scale-105 group-hover:shadow-md transition-all duration-200" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 text-lg tracking-tight group-hover:text-forest-700 transition-colors">
                  Ben Krack
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden md:block">
                Senior Software Engineer – Test & Infrastructure Leader
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/')
                  ? 'bg-forest-50 text-forest-800 font-semibold'
                  : 'text-gray-600 hover:text-forest-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Overview</span>
            </Link>

            <Link
              to="/portfolio"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/portfolio') || isActive('/companies')
                  ? 'bg-forest-50 text-forest-800 font-semibold'
                  : 'text-gray-600 hover:text-forest-700 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Company Projects</span>
            </Link>

            <a
              href="https://www.linkedin.com/in/benkrack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-[#0A66C2] text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-[#084e96] transition-colors shadow-sm ml-2"
              title="Connect on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
