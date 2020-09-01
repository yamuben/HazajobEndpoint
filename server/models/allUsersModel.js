import mongoose from 'mongoose';
import validator from 'validator';

const allUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, 'Invalid email address'],
    required: [true, 'Email address required'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must contain atleast 8 characters'],
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'superAdmin'],
  },
  status: {
    type: String,
    enum: ['active', 'unactive'],
    default: 'active',
  },
});

const AllUsers = mongoose.model('AllUsers', allUsersSchema);

export default AllUsers;
