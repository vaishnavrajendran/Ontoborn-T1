import mongoose, { model } from "mongoose";

export interface TaskTypes {
    userId: string,
    name: string,
    description:string,
    status: string
}

const TaskSchema = new mongoose.Schema<TaskTypes>(
  {
    userId: {
        type:String,
        ref:'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

export default model<TaskTypes>("Tasks", TaskSchema);