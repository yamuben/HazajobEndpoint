import mongoose from 'mongoose';

const jobTypeSchema = new mongoose.Schema({
  jobType: {
    type: String,
    enum: ['part-time', 'contract'],
  },
});

const JobType = mongoose.model('JobType', jobTypeSchema);

export default JobType;
