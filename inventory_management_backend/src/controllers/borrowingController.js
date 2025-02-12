import asyncHandler from 'express-async-handler';
import Borrowing from '../models/borrowingModel.js';
import Item from '../models/itemModel.js';
import Person from '../models/personModel.js';
import SystemLog from '../models/systemLogModel.js';

const createBorrowing = asyncHandler(async (req, res) => {
// ... (Create borrowing logic - unchanged) ...
});

const getBorrowings = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  // Build the query object based on query parameters
  const query = {};
  if (req.query.itemId) {
    query.item = req.query.itemId;
  }
  if (req.query.borrowerId) {
    query.borrower = req.query.borrowerId;
  }

  // Sorting
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
// ... (Return item logic - unchanged) ...
});

const getOverdueBorrowings = asyncHandler(async (req, res) => {
// ... (Get overdue borrowings logic - unchanged) ...
});

export {
  createBorrowing,
  getBorrowings,
  returnItem,
  getOverdueBorrowings,
};