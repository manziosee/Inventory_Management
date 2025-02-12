import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Device', 'Furniture', 'Cleaning Material', 'Food Utensil'],
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  condition: {
    type: String,
    enum: ['New', 'Good', 'Worn Out', 'Broken'],
    default: 'New',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
  status: {
    type: String,
    enum: ['Available', 'Borrowed', 'Damaged', 'Disposed'],
    default: 'Available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;