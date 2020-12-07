import nkubaData from '../models/austinModel';
import catchAsyncErr from '../utils/catchAsyncErr';
import AppError from "../utils/appError";

export const createFood = catchAsyncErr(async (req,res,next)=>{
    
    const newFood = await nkubaData.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{newFood}
    });
});


export const deleteFood = catchAsyncErr(async (req,res,next)=>{
    console.log("************"+req.params.id);
    const Foods = await nkubaData.remove({_id:ObjectId(req.params.id)});
    if (!Foods) return next(new AppError(404, 'No food found with that ID.'));
    res.status(204).json({
      status: 'success',
      data: null,
    });
});


export const updateFood = catchAsyncErr(async (req, res, next) => {
    const Foods = await nkubaData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValdators: true,
    });
    if (!Foods) return next(new AppError(404, 'No doc found with that ID.'));
    res.status(200).json({
      status: 'success',
      data: {
        Foods,
      },
    });
  });


  
  export const getFoods = catchAsyncErr(async (req, res, next) => {
    const Foods = await nkubaData.findById(req.params.id);
    if (!Foods) return next(new AppError(404, 'No doc found with that ID.'));
    res.status(200).json({
      status: 'success',
      data: {
        Foods,
      },
    });
  });
  
  export const getAllFoods = catchAsyncErr(async (req, res, next) => {
      const Foods = await nkubaData.find();
      if (!Foods) return next(new AppError(404, 'No doc found with that ID.'));
      res.status(200).json({
        status: 'success',
        data: {
          Foods,
        },
      });
    });
