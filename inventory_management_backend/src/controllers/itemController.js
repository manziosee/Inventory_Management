import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel.js';
import SystemLog from '../models/systemLogModel.js';

const createItem = asyncHandler(async (req, res) => {
// ... (Create item logic - unchanged) ...
});

const getItems = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const categoryFilter = req.query.category ? { category: req.query.category } : {};
  const conditionFilter = req.query.condition ? { condition: req.query.condition } : {};

  const count = await Item.countDocuments({ ...keyword, ...categoryFilter, ...conditionFilter });

  const sortOrder = req.query.order === 'desc' ? -1 : 1; // 1 for ascending, -1 for descending
  const sortField = req.query.orderBy || 'name'; // Default sort by name

  const items = await Item.find({ ...keyword, ...categoryFilter, ...conditionFilter })
    .sort({ [sortField]: sortOrder })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ items, page, pages: Math.ceil(count / pageSize) });
});

const getItemById = asyncHandler(async (req, res) => {
  // ... (Get item by ID logic - unchanged) ...
});

const updateItem = asyncHandler(async (req, res) => {
  // ... (Update item logic - unchanged) ...
});

const deleteItem = asyncHandler(async (req, res) => {
  // ... (Delete item logic - unchanged) ...
});

export {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};