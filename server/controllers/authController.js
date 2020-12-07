import AllUsers from '../models/allUsersModel';
import catchAsyncErr from '../utils/catchAsyncErr';
import AppError from '../utils/appError';
import { generateToken, verifyToken } from '../utils/generateAndVerifyToken';

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
  const willExpireOn = await verifyToken(token);
  res.status(201).json({
    status: 'success',
    auth: {
      token,
      willExpireOn: willExpireOn.exp,
    },
    data: {
      newUser,
    },
  });
});

export const login = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(400, 'Please provide your email and password'));

  const user = await AllUsers.findOne({ email }).select('+password');

  if (!user)
    return next(
      new AppError(400, "You don't have account! Please create account firstly")
    );

  if (!(await user.isCorrectPassword(password, user.password)))
    return next(new AppError(403, 'Invalid Email or Password!'));

  const token = generateToken({ email: user.email, id: user._id });

  const willExpireOn = await verifyToken(token);
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    auth: {
      token,
      willExpireOn: willExpireOn.exp,
    },
    data: {
      user,
    },
  });
});

export const protect = catchAsyncErr(async (req, res, next) => {
  const token = req.header('Authorization');
  console.log('💥💥💥 Token.....');
  console.log(token);

  if (!token)
    return next(new AppError(401, 'No token provided, Please provide token!'));

  const currentUserData = await verifyToken(token);
  const currentUser = await AllUsers.findOne({
    _id: currentUserData.payload.id,
  });

  if (!currentUser)
    return next(
      new AppError(401, 'Token belongs to the user Who is no longer exist!')
    );
  req.user = currentUser;
  next();
});

export const allowedBy = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(403, "You don't have permission to perform this action.")
      );
    next();
  };
};
