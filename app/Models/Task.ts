import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    userId: { type: String, required: true }, // <-- ini wajib cocok nama nya
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
