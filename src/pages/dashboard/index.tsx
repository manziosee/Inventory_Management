import { Users, Box, AlertTriangle, Clock, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function DashboardPage() {
  const stats = [
    { name: 'Total Items', value: '156', icon: Box, change: '+12%', changeType: 'increase' },
    { name: 'Active Users', value: '42', icon: Users, change: '+8%', changeType: 'increase' },
    { name: 'Items Borrowed', value: '23', icon: Clock, change: '-5%', changeType: 'decrease' },
    { name: 'Damage Reports', value: '8', icon: AlertTriangle, change: '+2%', changeType: 'increase' },
  ];

  const recentActivities = [
    { id: 1, user: 'Jane Smith', action: 'borrowed', item: 'MacBook Pro', time: '2 hours ago' },
    { id: 2, user: 'John Doe', action: 'returned', item: 'Office Chair', time: '4 hours ago' },
    { id: 3, user: 'Alice Johnson', action: 'reported damage', item: 'Monitor', time: '1 day ago' },
  ];

  const handleExportData = (format: 'csv' ) => {
    // Add your export logic here
    console.log(`Exporting data in ${format} format`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="dateRange" className="sr-only">Select Date Range</label>
          <select 
            id="dateRange" 
            className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => handleExportData('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.changeType === 'increase'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400"> from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          <Clock className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>{' '}
                            {activity.action}{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{activity.item}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Inventory Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Laptops Available</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">15/20</div>
              </div>
              <div className="mt-2 relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div style={{ width: '75%' }} className="bg-blue-500" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Chairs</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">28/30</div>
              </div>
              <div className="mt-2 relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div style={{ width: '93%' }} className="bg-green-500" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Monitors</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">12/25</div>
              </div>
              <div className="mt-2 relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div style={{ width: '48%' }} className="bg-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}