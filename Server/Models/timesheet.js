import mongoose from "mongoose";

const timeSheetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  regularHours: {
    type: Number,
    default: 0,
    required: true,
  },
  overtimeHours: {
    type: Number,
    default: 0,
    required: true,
  },
  sickLeave: {
    type: Number,
    default: 0,
  },
  pto: {
    type: Number, 
    default: 0,
  },
  paidHoliday: {
    type: Number,
    default: 0,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save middleware to update the `updatedAt` field on every save
timeSheetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const TimeSheet = mongoose.model("TimeSheet", timeSheetSchema);

export default TimeSheet;
