import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  { timestamps: true }
);

viewSchema.pre("save", function (next) {
  this.id = this._id.toString();
  next();
});

const View = mongoose.models.View || mongoose.model("View", viewSchema);

export default View;
