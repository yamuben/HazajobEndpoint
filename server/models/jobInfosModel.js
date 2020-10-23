import mongoose from 'mongoose';

const jobInfosSchema = new mongoose.Schema(
  {
    jobPostedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'UserInfos',
    },
    jobTitle: String,
    jobPositionAvailable: String,
    jobPostTime: {
      jobPostedOn: {
        type: Date,
        default: Date.now(),
      },
      ApplicationDeadline: {
        type: Date,
        default: Date.now(),
      },
    },
    jobDuration: {
      from: Date,
      to: Date,
    },
    jobType: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'JobType',
      },
    ],
    jobSalary: String,
    jobDays: String,
    jobLocation: {
      country: String,
      province: String,
      district: String,
      sector: String,
    },
    jobDescription: String,
    jobQualificaion: String,
    jobRecommandation: String,
    jobVisibility: String,
    jobApplicantsNo: Number,
    jobCategory: {
      category: String,
      subCategory: String,
    },
    jobAppEnabled: String,
    jobAppNo: Number,
    jobAppNoOutOf: Number,
    jobAppOn: String,
    jobAppOff: String,
    jobViews: Number,
    jobLikes: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobInfosSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'jobPostedBy',
    select: 'firstName lastName',
  });
  next();
});

const JobInfos = mongoose.model('JobInfos', jobInfosSchema);

export default JobInfos;
