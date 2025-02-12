import { Box, ClipboardList, Home, Settings, Users, AlertTriangle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Inventory', to: '/inventory', icon: Box },
  { name: 'Borrowing', to: '/borrowing', icon: ClipboardList },
  { name: 'Damage Reports', to: '/damage-reports', icon: AlertTriangle },
  { name: 'People', to: '/people', icon: Users },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              )
            }
          >
            <item.icon
              className={cn(
                'mr-3 h-5 w-5 flex-shrink-0',
                'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
              )}
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}