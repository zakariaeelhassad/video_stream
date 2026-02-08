import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, Search, Film, Heart, Clock, User, LogOut, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Heart, label: 'My List', path: '/watchlist' },
    { icon: Clock, label: 'History', path: '/history' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-[60px] bg-bg-secondary flex items-center justify-between px-4 z-nav border-b border-bg-hover">
        <div className="text-xl font-bold text-brand">StreamPlat</div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <nav className={`
        fixed inset-y-0 left-0 w-[240px] bg-bg-secondary border-r border-bg-hover p-6 flex flex-col z-nav transition-transform duration-300 md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0 pt-20' : '-translate-x-full md:pt-6'}
      `}>
        <div className="text-xl font-bold text-brand mb-8 hidden md:block">StreamPlat</div>

        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all ${location.pathname === item.path
                  ? 'bg-bg-hover text-brand'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-bg-hover pt-4 flex flex-col gap-2">
          <Link to="/profile" className="flex items-center gap-4 px-4 py-3 rounded-md text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all">
            <User size={20} />
            <span>{user?.username || 'Profile'}</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 rounded-md text-text-secondary hover:bg-bg-hover hover:text-text-primary w-full text-left transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-[240px] p-6 min-h-screen pt-20 md:pt-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
