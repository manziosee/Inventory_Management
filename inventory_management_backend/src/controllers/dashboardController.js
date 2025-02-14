import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel.js';
import Borrowing from '../models/borrowingModel.js';
import DamageReport from '../models/damageReportModel.js';
import User from '../models/userModel.js';
import SystemLog from '../models/systemLogModel.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalItems = await Item.countDocuments();
  const activeUsers = await User.countDocuments();
  const itemsBorrowed = await Borrowing.countDocuments({ returnDate: null });
  const damageReports = await DamageReport.countDocuments();

  res.json({
    totalItems,
    activeUsers,
    itemsBorrowed,
    damageReports,
  });
});

export const getRecentActivities = asyncHandler(async (req, res) => {
  const activities = await SystemLog.find({})
    .sort({ timestamp: -1 })
    .limit(10)
    .populate('user', 'fullName email');

  res.json(activities);
});

export const getInventoryStatus = asyncHandler(async (req, res) => {
  const inventoryStatus = await Item.aggregate([
    {
      $group: {
        _id: '$category',
        total: { $sum: 1 },
        available: {
          $sum: {
            $cond: [{ $eq: ['$status', 'Available'] }, 1, 0],
          },
        },
      },
    },
  ]);

  res.json(inventoryStatus);
});

export const exportDashboardData = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  const borrowings = await Borrowing.find({}).populate('item borrower');
  const damageReports = await DamageReport.find({}).populate('item reportedBy');
  const users = await User.find({});

  const csvItems = items.map(item => `${item.name},${item.category},${item.serialNumber},${item.condition}`).join('\n');
  const csvBorrowings = borrowings.map(borrowing => `${borrowing.item.name},${borrowing.borrower.fullName},${borrowing.borrowDate},${borrowing.expectedReturnDate}`).join('\n');
  const csvDamageReports = damageReports.map(report => `${report.item.name},${report.reportedBy.fullName},${report.reportedDate},${report.damageReason}`).join('\n');
  const csvUsers = users.map(user => `${user.fullName},${user.email},${user.phoneNumber},${user.role}`).join('\n');

  const csvContent = `Items:\n${csvItems}\n\nBorrowings:\n${csvBorrowings}\n\nDamage Reports:\n${csvDamageReports}\n\nUsers:\n${csvUsers}`;

  res.header('Content-Type', 'text/csv');
  res.attachment('dashboard_data.csv');
  res.send(csvContent);
});
