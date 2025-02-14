// src/controllers/itemController.js
import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel.js';
import SystemLog from '../models/systemLogModel.js';

const createItem = asyncHandler(async (req, res) => {
  const { name, category, serialNumber, condition, location, purchaseDate, purchasePrice, warranty, maintenanceInterval, notes, supplier, manufacturer } = req.body;

  const item = await Item.create({
    name,
    category,
    serialNumber,
    condition,
    location,
    purchaseDate,
    purchasePrice,
    warranty,
    maintenanceInterval,
    notes,
    supplier,
    manufacturer,
  });

  await SystemLog.create({
    user: req.user._id,
    actionType: 'ITEM_CREATED',
    details: { itemId: item._id },
  });

  res.status(201).json(item);
});

export const getItems = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10, search = '', category = '', location = '' } = req.query;

  const query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;
  if (location) query.location = location;

  const items = await Item.find(query)
    .skip((page - 1) * pageSize)
    .limit(Number(pageSize))
    .populate('assignedTo');

  const totalItems = await Item.countDocuments(query);

  res.json({
    items,
    totalItems,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('assignedTo');

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignedTo');

  await SystemLog.create({
    user: req.user._id,
    actionType: 'ITEM_UPDATED',
    details: { itemId: updatedItem._id },
  });

  res.json(updatedItem);
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  await Item.findByIdAndDelete(req.params.id);

  await SystemLog.create({
    user: req.user._id,
    actionType: 'ITEM_DELETED',
    details: { itemId: item._id },
  });

  res.json({ message: 'Item deleted' });
});

const exportItems = asyncHandler(async (req, res) => {
  const items = await Item.find().populate('assignedTo');

  res.json(items);
});


export {
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  exportItems,
};
