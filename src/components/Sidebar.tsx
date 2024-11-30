import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText,
  Contact2,
  Settings,
  ClipboardList,
  DollarSign,
  Shield,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Calendar', to: '/calendar', icon: Calendar },
    { name: 'Patients', to: '/patients', icon: Users },
    { name: 'Cases', to: '/cases', icon: FileText },
    { name: 'Forms', to: '/forms', icon: ClipboardList },
    { name: 'Contacts', to: '/contacts', icon: Contact2 },
    { name: 'Billing', to: '/billing', icon: DollarSign },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  if (user?.role === 'admin') {
    navigation.push({ name: 'Admin', to: '/admin', icon: Shield });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-48 bg-white border-r border-gray-200',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 md:hidden">
          <h1 className="text-xl font-bold text-gray-900">PERI</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="h-[calc(100vh-4rem)] overflow-y-auto pt-4">
          <div className="px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      'transition-colors duration-150 ease-in-out',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-2 truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}