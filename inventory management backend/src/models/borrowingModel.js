import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrowDate: {
    type: Date,
    required: true,
  },
  expectedReturnDate: {
    type: Date,
    required: true,
  },
  returnDate: Date,
  initialCondition: {
    type: String,
    enum: ['New', 'Good', 'Worn Out', 'Broken'],
    default: 'Good',
  },
  returnCondition: {
    type: String,
    enum: ['New', 'Good', 'Worn Out', 'Broken'],
  },
  isOverdue: {
    type: Boolean,
    default: false,
  },
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema);
export default Borrowing;