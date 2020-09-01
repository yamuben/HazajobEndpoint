import mongoose from 'mongoose';

const userConvSchema = new mongoose.Schema(
  {
    userOne: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'UserInfos',
      },
    ],
    usersConv: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'UserInfos',
      },
    ],
    time: Date,
    status: String,
    conversationType: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserConversation = mongoose.model('UserConversation', userConvSchema);

export default UserConversation;
