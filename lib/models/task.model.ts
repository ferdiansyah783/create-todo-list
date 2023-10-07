import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.pre("save", function (next) {
  this.id = this._id.toString();
  next();
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
