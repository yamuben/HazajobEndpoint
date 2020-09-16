import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const allUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, 'Invalid email address'],
    required: [true, 'Email address required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please password is required'],
    minlength: [8, 'Password must contain atleast 8 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'superAdmin'],
    default: 'client',
  },
  status: {
    type: String,
    enum: ['active', 'unactive'],
    default: 'active',
  },
});

allUsersSchema.pre('save', async function (next) {
  // Only run this function actually if password is modified
  if (!this.isModified('password')) return next();
  //Hash password before saving it to DB
  this.password = await bcrypt.hash(this.password, 11);
  next();
});

const AllUsers = mongoose.model('AllUsers', allUsersSchema);

export default AllUsers;
