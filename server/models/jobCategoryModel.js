import mongoose from 'mongoose';

const jobCategorySchema = new mongoose.Schema({
  category: String,
  subCategory: String,
});

const JobCategory = mongoose.model('JobType', jobCategorySchema);

export default JobCategory;
