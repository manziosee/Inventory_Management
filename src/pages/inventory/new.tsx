import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface ItemForm {
  name: string;
  category: string;
  serialNumber: string;
  condition: string;
  notes: string;
}

export function NewItemPage() {
  const { register, handleSubmit } = useForm<ItemForm>();

  const onSubmit = (data: ItemForm) => {
    console.log(data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Link to="/inventory" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Add New Item</h1>
          <p className="mt-2 text-sm text-gray-700">
            Register a new item in the inventory system.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 shadow sm:rounded-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                {...register('category', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                <option value="Device">Device</option>
                <option value="Furniture">Furniture</option>
                <option value="Cleaning Material">Cleaning Material</option>
                <option value="Food Utensil">Food Utensil</option>
              </select>
            </div>

            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                {...register('serialNumber', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <select
                id="condition"
                {...register('condition', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Worn Out">Worn Out</option>
                <option value="Broken">Broken</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                {...register('notes')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/inventory">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create Item</Button>
          </div>
        </form>
      </div>
    </div>
  );
}