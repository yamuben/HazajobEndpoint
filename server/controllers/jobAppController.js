import JobApplication from '../models/jobAppModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsyncErr';

export const createJopApp = catchAsync(async (req, res, next) => {
  const jobApp = await JobApplication.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: {
      jobApp,
    },
  });
});

export const getAllJobApps = catchAsync(async (req, res, next) => {
  const jobApps = await JobApplication.find();
  res.status(200).json({
    status: 'success',
    results: jobApps.length,
    data: {
      jobApps,
    },
  });
});
export const getJobApp = catchAsync(async (req, res, next) => {
  const jobApp = await JobApplication.findById(req.params.id);
  if (!jobApp) return next(new AppError(404, 'No doc found with that ID.'));
  res.status(200).json({
    status: 'success',
    data: {
      jobApp,
    },
  });
});
export const updateJobApp = catchAsync(async (req, res, next) => {
  const jobApp = await JobApplication.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!jobApp) return next(new AppError(404, 'No doc found with that ID.'));
  res.status(200).json({
    status: 'success',
    data: {
      jobApp,
    },
  });
});
export const deleteJobApp = catchAsync(async (req, res, next) => {
  const jobApp = await JobApplication.findByIdAndDelete(req.params.id);
  if (!jobApp) return next(new AppError(404, 'No doc found with that ID.'));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
