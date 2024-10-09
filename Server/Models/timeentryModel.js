import mongoose from "mongoose";

const timeEntrySchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    duration: { type: Number }, 
  },
  { timestamps: true }
);

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);
export default TimeEntry;
