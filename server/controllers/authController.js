import AllUsers from '../models/allUsersModel';
import catchAsyncErr from '../utils/catchAsyncErr';
import AppError from '../utils/appError';
import { generateToken } from '../utils/generateAndVerifyToken';

export const signUp = catchAsyncErr(async (req, res, next) => {
  if (!req.body.confirmPassword)
    return next(new AppError(400, 'Please confirm your passsword!'));
  if (req.body.password !== req.body.confirmPassword)
    return next(new AppError(400, 'Password are not the same!'));
  req.body.confirmPassword = undefined;
  const newUser = await AllUsers.create(req.body);
  newUser.password = undefined;
  const token = generateToken({
    email: newUser.email,
    id: newUser._id,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
});
