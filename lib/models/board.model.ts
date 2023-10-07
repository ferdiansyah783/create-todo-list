import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
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
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
  },
  { timestamps: true }
);

boardSchema.pre("save", function (next) {
    this.id = this._id.toString();
    next();
  });

const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);

export default Board;
