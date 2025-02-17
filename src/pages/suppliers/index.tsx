import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Download, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';

const suppliers = [
  {
    id: 1,
    name: 'Tech Supplies Co.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@techsupplies.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Silicon Valley, CA',
    status: 'Active',
    totalOrders: 156,
    lastOrder: '2024-02-15',
    paymentTerms: 'Net 30',
    rating: 4.8,
  },
  // Add more suppliers as needed
];

export function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your suppliers and track their performance
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link to="/suppliers/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="statusFilter" className="sr-only">Filter by status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Building2 className="h-8 w-8 text-gray-400" />
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{supplier.name}</h3>
                      <p className="text-sm text-gray-500">{supplier.contactPerson}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      supplier.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {supplier.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {supplier.email}
                  </div>
                  <div className="flex items-start text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 mt-1" />
                    <span className="flex-1">{supplier.address}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{supplier.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rating</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{supplier.rating}/5</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/suppliers/${supplier.id}`}
                    className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}