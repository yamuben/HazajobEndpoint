import mongoose from 'mongoose';

const userInfosSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: {
      type: String,
      required: [true, 'Please provide yoour phone number'],
    },
    loginInfoS: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'AllUsers',
      },
    ],
    motor: String,
    gender: String,
    idNo_Passport: {
      type: String,
      required: [true, 'ID number or passport must be provided!'],
      unique: [true, 'Id number or passport already used'],
    },
    profilePicture: String,
    location: {
      country: String,
      province: String,
      district: String,
      sector: String,
    },
    skill: {
      categoryId: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'JobCategory',
        },
      ],
    },
    description: String,
    portfolio: String,
    attachment: String,
    visibility: {
      type: String,
      enum: ['public', 'private'],
    },
    registeredOn: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserInfos = mongoose.model('UserInfos', userInfosSchema);

export default UserInfos;