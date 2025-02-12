import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface DamageReportForm {
  itemId: string;
  damageType: string;
  severity: string;
  description: string;
  actionNeeded: string;
  photos: FileList;
}

const inventoryItems = [
  { id: '1', name: 'MacBook Pro - MBP2024001' },
  { id: '2', name: 'Office Chair - CHR2024001' },
];

export function NewDamageReportPage() {
  const { register, handleSubmit } = useForm<DamageReportForm>();

  const onSubmit = (data: DamageReportForm) => {
    console.log(data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Link to="/damage-reports" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Damage Reports
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Report Item Damage</h1>
          <p className="mt-2 text-sm text-gray-700">
            Submit a new damage report for an inventory item
          </p>
        </div>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 shadow sm:rounded-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                Damaged Item
              </label>
              <select
                id="itemId"
                {...register('itemId', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select an item</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="damageType" className="block text-sm font-medium text-gray-700">
                Type of Damage
              </label>
              <select
                id="damageType"
                {...register('damageType', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select damage type</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Structural">Structural</option>
                <option value="Cosmetic">Cosmetic</option>
              </select>
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
                Severity
              </label>
              <select
                id="severity"
                {...register('severity', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select severity</option>
                <option value="Low">Low - Minor Issue</option>
                <option value="Medium">Medium - Affects Usage</option>
                <option value="High">High - Unusable</option>
              </select>
            </div>

            <div>
              <label htmlFor="actionNeeded" className="block text-sm font-medium text-gray-700">
                Action Needed
              </label>
              <select
                id="actionNeeded"
                {...register('actionNeeded', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select action</option>
                <option value="Repair">Needs Repair</option>
                <option value="Replace">Needs Replacement</option>
                <option value="Dispose">Should be Disposed</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Damage Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Describe the damage in detail..."
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Photos of Damage
              </label>
              <input
                type="file"
                id="photos"
                multiple
                accept="image/*"
                {...register('photos')}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/damage-reports">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Submit Report</Button>
          </div>
        </form>
      </div>
    </div>
  );
}