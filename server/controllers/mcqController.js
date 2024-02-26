import Course from "../models/courseModel.js";
import Mcq from "../models/mcqModel.js";
import AppError from "../utils/error.js";

export const addMcqByCourseId = async (req, res, next) => {
  try {
    // Extract the course ID from request parameters
    const { courseId } = req.params;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError("Invalid ID or Course does not exist.", 404));
    }

    // Extract MCQ data from request body
    const { question, options, correctOptionIndex } = req.body;

    // Validate the required fields
    if (!question || !options || !correctOptionIndex) {
      return next(new AppError("All filed are required", 404));
    }

    // Create a new MCQ document
    const newMcq = new Mcq({
      question,
      options,
      correctOptionIndex,
    });

    // Save the new MCQ document
    const savedMcq = await newMcq.save();

    // Update the course to include the new MCQ
    await Course.findByIdAndUpdate(courseId, { $push: { mcqs: savedMcq._id } });

    res.status(201).json({
      success: true,
      message: "MCQ added successfully",
      data: savedMcq,
    });
  } catch (error) {
    console.error("Error adding MCQ:", error);
    res.status(500).json({ success: false, message: "failed to Add MCQ" });
  }
};

export const getAllMcqsById = async (req, res, next) => {
  try {
    // Extract the course ID from request parameters
    const courseId = req.params.courseId;

    // Find the course by ID and populate the 'mcqs' field with actual MCQ documents
    const course = await Course.findById(courseId).populate("mcqs");

    // If no course is found with the provided ID, return a 404 error
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // If the course is found, extract the populated MCQs
    const mcqs = course.mcqs;

    res
      .status(200)
      .json({ success: true, message: " getAllMcqs successfully", data: mcqs });
  } catch (error) {
    console.error("Error In getAllMcqsById", error);
    res.status(500).json({ success: false, message: " failed to getAllMcqs" });
  }
};

export const editMcqById = async (req, res, next) => {
  // Extract MCQ ID from request parameters
  const { id } = req.params;

  // Update the MCQ with the new data and return the modified document
  const updatedMcq = await Mcq.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  // If no MCQ was found with the provided ID, return a 404 error
  if (!updatedMcq) {
    return next(new AppError("MCQ Not Found", 404));
  }

  try {
    res.status(200).json({
      success: true,
      message: "Mcq updated successfully",
      data: updatedMcq,
    });
  } catch (error) {
    console.error("Error while updating mcq", error);
    res.status(500).json({ success: false, message: "failed to update MCQ" });
  }
};

export const deleteMcqById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the MCQ by ID and delete it
    const deletedMcq = await Mcq.findByIdAndDelete(id);

    // If no MCQ was found with the provided ID, return a 404 error
    if (!deletedMcq) {
      return next(new AppError("MCQ Not Found", 404));
    }

    //  Return a success response with a 200 status code
    res
      .status(200)
      .json({ success: true, message: "MCQ deleted successfully" });
  } catch (error) {
    console.error("Error while deleting mcq:", error);
    res.status(500).json({ success: false, message: "failed to delete MCQ" });
  }
};
