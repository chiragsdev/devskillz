import { Schema, model } from "mongoose";

const mcqSchema = new Schema({
  question: {
    type: String,
    require: [true, "question is required"],
    trim: true,
  },
  options: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
  },
  correctOptionIndex: {
    type: Number,
    required: [true, "Correct option index is required"],
    min: 1,
    max: 4,
  },
});

// Middleware to validate options array length before saving
mcqSchema.pre("save", function (next) {
  if (this.options.length !== 4) {
    return next(new Error("Exactly 4 options are required"));
  }
  next();
});

const Mcq = model("mcqs", mcqSchema);

export default Mcq;
