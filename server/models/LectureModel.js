import { Schema, model } from "mongoose";

const lectureSchema = Schema({
  title: String,
  description: String,
  lecture: {
    public_id: {
      type: String,
      required: [true, "public_id is required"],
    },
    secure_url: {
      type: String,
      required: [true, "secure_url is required"],
    },
  },
  material: {
    public_id: {
      type: String,
      required: [true, "public_id is required"],
    },
    secure_url: {
      type: String,
      required: [true, "secure_url is required"],
    },
  },
  isWatched: {
    type: Boolean,
    default: false,
  },
});

const Lecture = model("lectures", lectureSchema);

export default Lecture;
