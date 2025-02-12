import mongoose from 'mongoose';

const damageReportSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportedDate: {
    type: Date,
    default: Date.now,
  },
  damageReason: {
    type: String,
    required: true,
  },
  repairStatus: {
    type: String,
    enum: ['Pending', 'Repaired', 'Disposed'],
    default: 'Pending',
  },
});

const DamageReport = mongoose.model('DamageReport', damageReportSchema);
export default DamageReport;