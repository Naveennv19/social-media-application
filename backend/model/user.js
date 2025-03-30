import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobileNumber: {  
      type: String,
      unique: true, 
      sparse: true, 
    },
    emailAddress: {
      type: String,
      unique: true, 
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {       
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);


userSchema.path("emailAddress").validate(function (value) {
  return this.mobileNumber || value;
}, "Either email or mobile number is required.");

userSchema.path("mobileNumber").validate(function (value) {
  return this.emailAddress || value;
}, "Either email or mobile number is required.");

export const UserModel = mongoose.model("User", userSchema);
