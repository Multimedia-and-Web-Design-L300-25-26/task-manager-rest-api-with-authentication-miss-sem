import mongoose from "mongoose";

// Create Task schema
// Fields:
// - title (String, required)
// - description (String)
// - completed (Boolean, default false)
// - owner (ObjectId, ref "User", required)
// - createdAt (default Date.now)

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  completed:   { type: Boolean, default: false },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt:   { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;