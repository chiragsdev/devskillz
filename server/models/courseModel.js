import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [8, "Title must be atleast 8 characters"],
      maxLength: [50, "Title cannot be more than 50 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [20, "Description must be atleast 20 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    lectures: [
      {
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
      },
    ],
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: [true, "course instructor name is required"],
    },
  },
  {
    timestamps: true,
  }
);

// courseSchema.pre("save", async function (next) {
//   this.numberOfLectures = lectures?.length;
//   next();
// });

const Course = model("courses", courseSchema);

export default Course;
