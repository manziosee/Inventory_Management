import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface BorrowingForm {
  itemId: string;
  borrowerId: string;
  borrowDate: string;
  expectedReturnDate: string;
  purpose: string;
  condition: string;
}

const availableItems = [
  { id: '1', name: 'MacBook Pro - MBP2024001' },
  { id: '2', name: 'Office Chair - CHR2024001' },
];

const borrowers = [
  { id: '1', name: 'Jane Smith' },
  { id: '2', name: 'John Doe' },
];

export function NewBorrowingPage() {
  const { register, handleSubmit } = useForm<BorrowingForm>();

  const onSubmit = (data: BorrowingForm) => {
    console.log(data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Link to="/borrowing" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Borrowing Records
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">New Borrowing Record</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a new borrowing record for an item
          </p>
        </div>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 shadow sm:rounded-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                Item
              </label>
              <select
                id="itemId"
                {...register('itemId', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select an item</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="borrowerId" className="block text-sm font-medium text-gray-700">
                Borrower
              </label>
              <select
                id="borrowerId"
                {...register('borrowerId', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a borrower</option>
                {borrowers.map((borrower) => (
                  <option key={borrower.id} value={borrower.id}>
                    {borrower.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700">
                Borrow Date
              </label>
              <input
                type="date"
                id="borrowDate"
                {...register('borrowDate', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="expectedReturnDate" className="block text-sm font-medium text-gray-700">
                Expected Return Date
              </label>
              <input
                type="date"
                id="expectedReturnDate"
                {...register('expectedReturnDate', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                Item Condition at Borrowing
              </label>
              <select
                id="condition"
                {...register('condition', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                Purpose of Borrowing
              </label>
              <textarea
                id="purpose"
                rows={3}
                {...register('purpose', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Explain why this item is being borrowed..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/borrowing">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create Record</Button>
          </div>
        </form>
      </div>
    </div>
  );
}