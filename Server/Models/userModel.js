import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

// Define Profile Schema for additional employee details
const profileSchema = new Schema({
  personalInformation: {
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    bloodGroup: { type: String },
    maritalStatus: { type: String },
    aboutMe: { type: String },
    expertise: { type: String },
  },
  workInformation: {
    department: { type: String },
    location: { type: String },
    designation: { type: String },
    role: { type: String },
    employeeType: { type: String },
    employeeStatus: { type: String },
    sourceOfHire: { type: String },
    currentExperience: { type: Number },
    totalExperience: { type: Number },
  },
  contactInformation: {
    workPhoneNumber: { type: Number },
    extension: { type: Number },
    seatingLocation: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    personalMobileNumber: { type: Number },
    personalEmailAddress: { type: String },
  },
  bankInformation: {
    bankHolderName: { type: String },
    accountNumber: { type: Number },
    ifscCode: { type: String },
    bankName: { type: String },
  },
  hierarchyInformation: {
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  identityInformation: {
    uan: { type: Number },
    pan: { type: String },
    aadhar: { type: Number },
  },
  resignationInformation: {
    resignationLetterDate: { type: String },
    exitInterviewDate: { type: String },
    relievingDate: { type: String },
    leaveEncashed: { type: String },
    newWorkplace: { type: String },
    reasonForLeaving: { type: String },
    feedback: { type: String },
  },
  imageUrl: { type: String },
});

// Define User Schema with role and reporting manager reference
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    employeeID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isManager: { type: Boolean, default: false },
    isEmployee: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    profile: profileSchema,
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to Reporting Manager
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
