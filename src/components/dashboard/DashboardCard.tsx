import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export default function DashboardCard({ title, value, icon: Icon, trend }: DashboardCardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <div className="mt-4">
        <span
          className={cn(
            'inline-flex items-center text-sm',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}