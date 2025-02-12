import asyncHandler from 'express-async-handler';
import Person from '../models/personModel.js';
import SystemLog from '../models/systemLogModel.js';

// @desc    Create a new person
// @route   POST /api/people
// @access  Private/Admin
const createPerson = asyncHandler(async (req, res) => {
  const { fullName, nationalId, email, phoneNumber, residence, assurerName, assurerContact } = req.body;

  const personExists = await Person.findOne({ nationalId });
  if (personExists) {
    res.status(400);
    throw new Error('Person with this national ID already exists');
  }

  const person = await Person.create({
    fullName,
    nationalId,
    email,
    phoneNumber,
    residence,
    assurerName,
    assurerContact,
  });

  if (person) {
    await SystemLog.create({
      user: req.user._id,
      actionType: 'PERSON_CREATED',
      details: { personId: person._id },
    });

    res.status(201).json(person);
  } else {
    res.status(400);
    throw new Error('Invalid person data');
  }
});

// @desc    Get all people
// @route   GET /api/people
// @access  Private
const getPeople = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        fullName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const sortOrder = req.query.order === 'desc' ? -1 : 1; // 1 for ascending, -1 for descending
  const sortField = req.query.orderBy || 'fullName'; // Default sort by name

  const count = await Person.countDocuments({ ...keyword });
  const people = await Person.find({ ...keyword })
    .sort({ [sortField]: sortOrder })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ people, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get person by ID
// @route   GET /api/people/:id
// @access  Private
const getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (person) {
    res.json(person);
  } else {
    res.status(404);
    throw new Error('Person not found');
  }
});

// @desc    Update person
// @route   PUT /api/people/:id
// @access  Private/Admin
const updatePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (person) {
    person.fullName = req.body.fullName || person.fullName;
    person.email = req.body.email || person.email;
    person.phoneNumber = req.body.phoneNumber || person.phoneNumber;
    person.residence = req.body.residence || person.residence;
    person.assurerName = req.body.assurerName || person.assurerName;
    person.assurerContact = req.body.assurerContact || person.assurerContact;

    const updatedPerson = await person.save();

    await SystemLog.create({
      user: req.user._id,
      actionType: 'PERSON_UPDATED',
      details: { personId: person._id },
    });

    res.json(updatedPerson);
  } else {
    res.status(404);
    throw new Error('Person not found');
  }
});

// @desc    Delete person
// @route   DELETE /api/people/:id
// @access  Private/Admin
const deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (person) {
    await Person.deleteOne({_id: person._id});

    await SystemLog.create({
      user: req.user._id,
      actionType: 'PERSON_DELETED',
      details: { personId: req.params.id },
    });

    res.json({ message: 'Person removed' });
  } else {
    res.status(404);
    throw new Error('Person not found');
  }
});

export {
  createPerson,
  getPeople,
  getPersonById,
  updatePerson,
  deletePerson,
};