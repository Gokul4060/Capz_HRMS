import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    projectCode: { type : String, required: true},
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },

    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },

    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    tasks: [
      {
        id: { type: Schema.Types.ObjectId, ref: "User" },
        title: String,
        date: Date,
        tag: String,
      },
    ],

    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
