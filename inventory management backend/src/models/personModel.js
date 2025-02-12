import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  assurerName: String,
  assurerContact: String,
});

const Person = mongoose.model('Person', personSchema);
export default Person;