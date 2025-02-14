import asyncHandler from 'express-async-handler';
import Borrowing from '../models/borrowingModel.js';
import Item from '../models/itemModel.js';
import Person from '../models/personModel.js';
import SystemLog from '../models/systemLogModel.js';

const createBorrowing = asyncHandler(async (req, res) => {
  const { itemId, borrowerId, borrowDate, expectedReturnDate, initialCondition } = req.body;

  const item = await Item.findById(itemId);
  const borrower = await Person.findById(borrowerId);

  if (!item || !borrower) {
    res.status(404);
    throw new Error('Item or borrower not found');
  }

  const borrowing = await Borrowing.create({
    item: itemId,
    borrower: borrowerId,
    assignedBy: req.user._id,
    borrowDate,
    expectedReturnDate,
    initialCondition,
  });

  await SystemLog.create({
    user: req.user._id,
    actionType: 'BORROWING_CREATED',
    details: { borrowingId: borrowing._id },
  });

  res.status(201).json(borrowing);
});

const getBorrowings = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const query = {};
  if (req.query.itemId) {
    query.item = req.query.itemId;
  }
  if (req.query.borrowerId) {
    query.borrower = req.query.borrowerId;
  }

  const sortOrder = req.query.order === 'desc' ? -1 : 1;
  const sortField = req.query.orderBy || 'borrowDate';

  const count = await Borrowing.countDocuments(query);
  const borrowings = await Borrowing.find(query)
    .populate('item')
    .populate('borrower')
    .populate('assignedBy')
    .sort({ [sortField]: sortOrder })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ borrowings, page, pages: Math.ceil(count / pageSize) });
});

const returnItem = asyncHandler(async (req, res) => {
  const borrowing = await Borrowing.findById(req.params.id);

  if (!borrowing) {
    res.status(404);
    throw new Error('Borrowing not found');
  }

  borrowing.returnDate = new Date();
  borrowing.returnCondition = req.body.returnCondition;
  await borrowing.save();

  await SystemLog.create({
    user: req.user._id,
    actionType: 'ITEM_RETURNED',
    details: { borrowingId: borrowing._id },
  });

  res.json(borrowing);
});

const getOverdueBorrowings = asyncHandler(async (req, res) => {
  const overdueBorrowings = await Borrowing.find({
    expectedReturnDate: { $lt: new Date() },
    returnDate: null,
  }).populate('item').populate('borrower');

  res.json(overdueBorrowings);
});

const exportBorrowings = asyncHandler(async (req, res) => {
  const borrowings = await Borrowing.find({}).populate('item borrower');
  const csv = borrowings.map(borrowing => `${borrowing.item.name},${borrowing.borrower.fullName},${borrowing.borrowDate},${borrowing.expectedReturnDate}`).join('\n');
  res.header('Content-Type', 'text/csv');
  res.attachment('borrowings.csv');
  res.send(csv);
});

const exportDamageReports = asyncHandler(async (req, res) => {
  const damageReports = await DamageReport.find({}).populate('item reportedBy');
  const csv = damageReports.map(report => `${report.item.name},${report.reportedBy.fullName},${report.reportedDate},${report.damageReason}`).join('\n');
  res.header('Content-Type', 'text/csv');
  res.attachment('damage_reports.csv');
  res.send(csv);
});

export {
  createBorrowing,
  getBorrowings,
  returnItem,
  getOverdueBorrowings,
  exportBorrowings,
  exportDamageReports,
};
