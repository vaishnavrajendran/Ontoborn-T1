import mongoose, { model } from "mongoose";

export interface UserTypes {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  timeStamps:boolean
}

const UserSchema = new mongoose.Schema<UserTypes>(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    }
  },
  { timestamps: true }
);

export default model<UserTypes>("Users", UserSchema);