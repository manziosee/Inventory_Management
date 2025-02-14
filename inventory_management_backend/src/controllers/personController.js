import asyncHandler from 'express-async-handler';
import Person from '../models/personModel.js';
import SystemLog from '../models/systemLogModel.js';

const createPerson = asyncHandler(async (req, res) => {
  const { fullName, nationalId, email, phoneNumber, residence, assurerName, assurerContact } = req.body;

  const person = await Person.create({
    fullName,
    nationalId,
    email,
    phoneNumber,
    residence,
    assurerName,
    assurerContact,
  });

  await SystemLog.create({
    user: req.user._id,
    actionType: 'PERSON_CREATED',
    details: { personId: person._id },
  });

  res.status(201).json(person);
});

const getPeople = asyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, search = '', department = '' } = req.query;

  const query = {};
  if (search) query.fullName = { $regex: search, $options: 'i' };
  if (department) query.department = department;

  const count = await Person.countDocuments(query);
  const people = await Person.find(query)
    .skip((pageNumber - 1) * pageSize)
    .limit(Number(pageSize));

  res.json({
    people,
    page: Number(pageNumber),
    pages: Math.ceil(count / pageSize),
    pageSize: Number(pageSize),
  });
});

const getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (!person) {
    res.status(404);
    throw new Error('Person not found');
  }

  res.json(person);
});

const updatePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (!person) {
    res.status(404);
    throw new Error('Person not found');
  }

  const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await SystemLog.create({
    user: req.user._id,
    actionType: 'PERSON_UPDATED',
    details: { personId: updatedPerson._id },
  });

  res.json(updatedPerson);
});

const deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (!person) {
    res.status(404);
    throw new Error('Person not found');
  }

  await Person.findByIdAndDelete(req.params.id);

  await SystemLog.create({
    user: req.user._id,
    actionType: 'PERSON_DELETED',
    details: { personId: person._id },
  });

  res.json({ message: 'Person deleted' });
});

export {
  createPerson,
  getPeople,
  getPersonById,
  updatePerson,
  deletePerson,
};
