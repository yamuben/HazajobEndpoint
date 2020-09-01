import mongoose from 'mongoose';

const userChatsSchema = new mongoose.Schema({
  usersChats: String,
  userReply: String,
  message: String,
  time: Date,
  status: String,
});

const UserChats = mongoose.model('UserChats', userChatsSchema);

export default UserChats;
