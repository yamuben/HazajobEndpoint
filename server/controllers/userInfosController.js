import UserInfos from '../models/userInfosModel';
import AllUsers from '../models/allUsersModel';
import AppError from '../utils/appError';
import catchAsyncErr from '../utils/catchAsyncErr';

export const createUser = catchAsyncErr(async (req, res, next) => {
  req.body.loginInfos = req.user.id;
  const user = await UserInfos.create(req.body);
  await AllUsers.findByIdAndUpdate(req.user.id, { detailedInfos: user.id });
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const getAllUserInfos = catchAsyncErr(async (req, res, next) => {
  const users = await UserInfos.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});


export const getUserInfos = catchAsyncErr(async (req, res, next) => {
  const user = await UserInfos.findOne({ loginInfos: req.user.id });
  if (!user) return next(new AppError(404, 'No User found with that ID!'));
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateUserInfos = catchAsyncErr(async (req, res, next) => {
  const updatedUser = await UserInfos.findOneAndUpdate(
    { loginInfos: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser)
    return next(new AppError(404, 'No user found with that ID!'));
  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

export const deleteUserInfos = catchAsyncErr(async (req, res, next) => {
  const user = await UserInfos.findOneAndDelete({ loginInfos: req.user.id });
  if (!user) return next(new AppError(404, 'No user found with that ID!'));

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
