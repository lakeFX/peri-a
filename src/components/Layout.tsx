import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PeriAssistant from './peri/PeriAssistant';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex h-screen pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main 
          className={cn(
            'flex-1 overflow-auto transition-all duration-300 ease-in-out',
            'px-4 py-6 md:px-6',
            isSidebarOpen ? 'md:ml-48' : ''
          )}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      <PeriAssistant />
    </div>
  );
}