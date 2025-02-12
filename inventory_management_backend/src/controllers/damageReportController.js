import asyncHandler from 'express-async-handler';
import DamageReport from '../models/damageReportModel.js';
import Item from '../models/itemModel.js';
import SystemLog from '../models/systemLogModel.js';

// @desc    Create a new damage report
// @route   POST /api/damage-reports
// @access  Private
export const createDamageReport = asyncHandler(async (req, res) => {
  const { itemId, damageReason } = req.body;

  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  const report = await DamageReport.create({
    item: itemId,
    reportedBy: req.user._id,
    damageReason,
  });

  item.status = 'Damaged';
  await item.save();

  await SystemLog.create({
    user: req.user._id,
    actionType: 'DAMAGE_REPORTED',
    details: { reportId: report._id, itemId },
  });

  res.status(201).json(report);
});

// @desc    Get all damage reports
// @route   GET /api/damage-reports
// @access  Private
export const getDamageReports = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        damageReason: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const sortOrder = req.query.order === 'desc' ? -1 : 1;
  const sortField = req.query.orderBy || 'reportedDate';

  const count = await DamageReport.countDocuments({ ...keyword });
  const damageReports = await DamageReport.find({ ...keyword })
    .populate('item')
    .populate('reportedBy')
    .sort({ [sortField]: sortOrder })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ damageReports, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Update damage report status
// @route   PUT /api/damage-reports/:id
// @access  Private/Admin
export const updateDamageReport = asyncHandler(async (req, res) => {
  const report = await DamageReport.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error('Damage report not found');
  }

  const { repairStatus } = req.body;
  report.repairStatus = repairStatus;
  const updatedReport = await report.save();

  const item = await Item.findById(report.item);
  if (repairStatus === 'Repaired') {
    item.status = 'Available';
    item.condition = 'Good';
  } else if (repairStatus === 'Disposed') {
    item.status = 'Disposed';
  }
  await item.save();

  await SystemLog.create({
    user: req.user._id,
    actionType: 'DAMAGE_REPORT_UPDATED',
    details: { reportId: report._id, itemId: item._id, status: repairStatus },
  });

  res.json(updatedReport);
});