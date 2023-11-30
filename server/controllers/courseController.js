import Course from "../models/courseModel.js";
import AppError from "../utils/error.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import * as path from "path";

/**
 * @ALL_COURSES
 * @ROUTE @GET {{URL}}/api/v1/courses
 * @ACCESS Public
 */
export const getAllCourses = async (req, res, next) => {
  try {
    // Find all the courses without lectures
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @GET_LECTURES_BY_COURSE_ID
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private(ADMIN, subscribed users only)
 */
export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id or course not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @CREATE_COURSE
 * @ROUTE @POST {{URL}}/api/v1/courses
 * @ACCESS Private (admin only)
 */
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "temp public_id",
        secure_url: "temp secure_url",
      },
    });

    if (!course) {
      return next(new AppError("Coures Creation failed,try Again", 500));
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS",
      });

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();

    res.status(201).json({
      succes: true,
      message: "coures created succssfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @UPDATE_COURSE_BY_ID
 * @ROUTE @PUT {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
export const updateCoures = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    console.log("updated coures>", course);

    if (!course) {
      return next(new AppError("Coures With given id does not exits", 404));
    }

    await course.save();

    res.status(200).json({
      succes: true,
      message: "coures updated succssfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @DELETE_COURSE_BY_ID
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
export const deleteCoures = async (req, res, next) => {
  try {
    const { id } = req.params;

    const coures = await Course.findByIdAndDelete(id);

    if (!coures) {
      return next(new AppError("Coures With given id does not exits", 404));
    }

    res.status(201).json({
      succes: true,
      message: "coures deleted succssfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @ADD_LECTURE
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin Only)
 */
export const addLectureToCouresById = async (req, res, next) => {
  try {
    console.log("starting");
    const { title, description } = req.body;
    const { id } = req.params;

    let lectureData = {};

    if (!title || !description) {
      return next(new AppError("Title and Description are required", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS",
          chunk_size: 50000000, // 50 mb size
          resource_type: "video",
        });

        console.log("result", result);

        if (result) {
          console.log("hello");
          lectureData.public_id = result.public_id;
          lectureData.secure_url = result.secure_url;
        }

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        // Empty the uploads directory without deleting the uploads directory
        for (const file of await fs.readdir("uploads/")) {
          await fs.unlink(path.join("uploads/", file));
        }

        // Send the error message
        return next(new AppError("File not uploaded, please try again", 400));
      }
    }

    course.lectures.push({
      title,
      description,
      lecture: lectureData,
    });

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course lecture added successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @Remove_LECTURE
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:courseId/lectures/:lectureId
 * @ACCESS Private (Admin only)
 */
export const removeLecterFromCourse = async (req, res, next) => {
  try {
    // Grabbing the courseId and lectureId from req.query
    const { courseId, lectureId } = req.query;

    console.log(courseId);

    // Checking if both courseId and lectureId are present
    if (!courseId) {
      return next(new AppError("Course ID is required", 400));
    }

    if (!lectureId) {
      return next(new AppError("Lecture ID is required", 400));
    }

    // Find the course using the courseId
    const course = await Course.findById(courseId);

    // If no course send custom message
    if (!course) {
      return next(new AppError("Invalid ID or Course does not exist.", 404));
    }

    // Find the index of the lecture using the lectureId
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );

    // If returned index is -1 then send error as mentioned below
    if (lectureIndex === -1) {
      return next(new AppError("Lecture does not exist.", 404));
    }

    // Delete the lecture from cloudinary
    await cloudinary.v2.uploader.destroy(
      course.lectures[lectureIndex].lecture.public_id,
      {
        resource_type: "video",
      }
    );

    // Remove the lecture from the array
    course.lectures.splice(lectureIndex, 1);

    // update the number of lectures based on lectres array length
    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    // Return response
    res.status(200).json({
      success: true,
      message: "Course lecture removed successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
