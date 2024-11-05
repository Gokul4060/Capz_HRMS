import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
    totalWorkHours: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "On Leave", "Half Day"],
      default: "Present",
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;