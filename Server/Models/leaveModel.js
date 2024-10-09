import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
      enum: ["annual", "sick", "unpaid"], 
    },
    reason: {
      type: String,
      required: true,
    },
    leaveBalance: {
      type: Number,
      required: true,
      default: 0, 
    },
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
  
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
