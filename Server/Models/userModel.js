import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
  personalInformation: {
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    bloodgroup: { type: String },
    maritalstatus: { type: String },
    aboutme: { type: String },
    expertise: { type: String },
  },
  workInformation: {
    department: { type: String },
    location: { type: String },
    designation: { type: String },
    role: { type: String },
    employeetype: { type: String },
    employeestatus: { type: String },
    sourceofhire: { type: String },
    currentexperience: { type: Number },
    totalexperience: { type: Number },
  },
  contactInformation: {
    workphonenumber: { type: Number },
    extension: { type: Number },
    seatinglocation: { type: String },
    presentaddress: { type: String },
    permanentaddress: { type: String },
    personalmobilenumber: { type: Number },
    personalemailaddress: { type: String },
  },
  bankInformation: {
    bankholdername: { type: String },
    accountnumber: { type: Number },
    ifsccode: { type: String },
    bankname: { type: String },
  },
  hierarchyInformation: {
    reportingmanager: { type: String },
  },
  identityInformation: {
    uan: { type: Number },
    pan: { type: String },
    aadhar: { type: Number },
  },
  resignationInformation: {
    resignationletterdate: { type: String },
    exitinterviewdate: { type: String },
    relievingdate: { type: String },
    leaveencashed: { type: String },
    newworkplace: { type: String },
    reasonforleaving: { type: String },
    feedback: { type: String },
  },
  imageUrl: { type: String },
});

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isManager: { type: Boolean, required: true, default: false },
    isDeveloper: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    profile: profileSchema,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
