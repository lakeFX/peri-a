import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { UserCircle, BellRing, LogOut, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 right-0 left-0 z-40 transition-all duration-300',
        'bg-white border-b border-gray-200',
        isScrolled ? 'shadow-sm' : '',
        isSidebarOpen ? 'md:pl-48' : ''
      )}
    >
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2 md:ml-0">
            PERI
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <BellRing className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            <UserCircle className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 hidden md:inline">
              {user?.name}
            </span>
          </div>
          
          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}