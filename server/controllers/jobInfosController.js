import JobInfos from '../models/jobInfosModel';
import AppError from '../utils/appError';
import AllUsers from '../models/allUsersModel';
import catchAsyncErr from '../utils/catchAsyncErr';

export const createJobInfos = catchAsyncErr(async (req, res, next) => {
  const owner = await AllUsers.findById(req.user.id);
  req.body.jobPostedBy = owner.detailedInfos;
  const newJobInfos = await JobInfos.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newJobInfos,
    },
  });
});

export const getAllJobInfos = catchAsyncErr(async (req, res, next) => {
  const jobInfos = await JobInfos.find();
  res.status(200).json({
    status: 'success',
    result: jobInfos.length,
    data: {
      jobInfos,
    },
  });
});

export const getJobInfos = catchAsyncErr(async (req, res, next) => {
  const jobInfos = await JobInfos.findById(req.params.id);
  if (!jobInfos) return next(new AppError(404, 'No doc found with that ID.'));
  res.status(200).json({
    status: 'success',
    data: {
      jobInfos,
    },
  });
});
export const updateJobInfos = catchAsyncErr(async (req, res, next) => {
  const jobInfos = await JobInfos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValdators: true,
  });
  if (!jobInfos) return next(new AppError(404, 'No doc found with that ID.'));
  res.status(200).json({
    status: 'success',
    data: {
      jobInfos,
    },
  });
});
export const deleteJobInfos = catchAsyncErr(async (req, res, next) => {
  const jobInfos = await JobInfos.findByIdAndDelete(req.params.id);
  if (!jobInfos) return next(new AppError(404, 'No doc found with that ID.'));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
