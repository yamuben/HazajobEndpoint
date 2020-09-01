import mongoose from 'mongoose';

const jobAppSchema = new mongoose.Schema(
  {
    jobInfos: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'JobInfos',
      },
    ],
    jobApplications: {
      userApplicant: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'UserInfos',
        },
      ],
      applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'declined', 'cancel'],
      },
      attachment: String,
      applicationDate: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const JobApplication = mongoose.model('JobApplication', jobAppSchema);

export default JobApplication;
