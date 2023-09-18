import fs from "fs/promises";
import fsMail from "fs";
import User from "../models/userModel.js";
import AppError from "../utils/error.js";
import cloudinary from "cloudinary";
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
};

/**
 * @REGISTER
 * @ROUTE @POST {{URL}}/api/v1/user/register
 * @ACCESS Public
 */
export const register = async (req, res, next) => {
  // console.log("base url", req.baseUrl);
  // console.log("original Url", req.originalUrl);
  // console.log("body", req.body);
  // console.log("cookie", req.cookies);
  // console.log("file", req.file);
  // console.log("host", req.hostname);
  // Destructuring the necessary data from req object
  const { fullName, email, password } = req.body;

  // Check if the data is there or not, if not throw error message
  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  // Check if the user exists with the provided email
  const userExists = await User.findOne({ email });

  // If user exists send the reponse else it's null
  if (userExists) {
    return next(new AppError("Email is already Exists", 400));
  }

  // Create new user with the given necessary data and save to DB
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });

  // If user not created send message response
  if (!user) {
    return next(new AppError("user registration failed,plase try again", 400));
  }

  // Run only if user sends a file else it's undefined
  if (req.file) {
    try {
      const uploadedImageInfo = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "LMS", // Save files in a folder named lms
          width: 250,
          height: 250,
          gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
          crop: "fill",
        }
      );

      // If success
      if (uploadedImageInfo) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = uploadedImageInfo.public_id;
        user.avatar.secure_url = uploadedImageInfo.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      return next(
        new AppError(error || "File not uploaded, please try again", 400)
      );
    }
  }

  // Save the user object
  await user.save();

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  // If all good send the response to the frontend
  res.status(201).json({
    success: true,
    message: "User Register successfully",
    user,
  });
};

/**
 * @LOGIN
 * @ROUTE @POST {{URL}}/api/v1/user/login
 * @ACCESS Public
 */
export const login = async (req, res, next) => {
  try {
    // Destructuring the necessary data from req object
    const { email, password } = req.body;

    // Check if the data is there or not, if not throw error message
    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    // Finding the user with the sent email
    const user = await User.findOne({ email }).select("+password");

    // If no user or sent password do not match then send generic response
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email and password does not match"));
    }

    // Generating a JWT token
    const token = await user.generateJWTToken();

    // Setting the password to undefined so it does not get sent in the response
    user.password = undefined;

    // Setting the token in the cookie with name token along with cookieOptions
    res.cookie("token", token, cookieOptions);

    // If all good send the response to the frontend
    res.status(200).json({
      success: true,
      message: "user loggedIn successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/**
 * @LOGOUT
 * @ROUTE @POST {{URL}}/api/v1/user/logout
 * @ACCESS Public
 */
export const logout = (req, res) => {
  // Setting the cookie value to null
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  // Sending the response
  res.status(200).json({
    success: true,
    message: "user logout successfully",
  });
};

/**
 * @LOGGED_IN_USER_DETAILS
 * @ROUTE @GET {{URL}}/api/v1/user/me
 * @ACCESS Private(Logged in users only)
 */
export const getProfile = async (req, res) => {
  try {
    // Finding the user using the id from modified req object
    const user = await User.findById(req.user.id);

    res.status(200).json({
      sucesss: true,
      message: "User datails",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch user Profile!!"));
  }
};

/**
 * @FORGOT_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/reset
 * @ACCESS Public
 */
export const forgotPassword = async (req, res, next) => {
  // Extracting email from request body
  const { email } = req.body;

  // If no email send email required message
  if (!email) {
    return next(new AppError("Email is Required", 400));
  }

  // Finding the user via email
  const user = await User.findOne({ email });

  // If no email found send the message email not found
  if (!user) {
    return next(new AppError("Email is not Registered", 400));
  }

  // Generating the reset token via the method we have in user model
  const resetToken = await user.generatePasswordResetToken();

  // Saving the forgotPassword* to DB
  await user.save();

  // constructing a url to send the correct data
  /**HERE
   * req.protocol will send if http or https
   * req.get('host') will get the hostname
   * the rest is the route that we will create to verify if token is correct or not
   */
  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/user/reset/${resetToken}`;

  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // We here need to send an email to the user with the token
  const subject = "Reset Password";
  const message = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              line-height: 1.6; /* Increased line spacing */
          }
  
          h1 {
              color: #333;
              font-size: 24px;
          }
  
          p {
              color: #666;
              font-size: 16px;
              margin: 15px 0; /* Increased space between lines */
          }
  
          a {
              color: #007BFF;
              text-decoration: none;
          }
  
          a:hover {
              text-decoration: underline;
          }
  
          .btn {
              background-color: #007BFF;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
          }
  
          .emoji {
              font-size: 24px; /* Slightly larger emojis */
              margin-right: 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1><span class="emoji">🔐</span> Reset Your Password</h1>
          <p>Hello,</p>
          <p><span class="emoji">🔑</span> You can reset your password by clicking the button below:</p>
          <p><a href="${resetPasswordURL}" class="btn"><span class="emoji">🔁</span> Reset Your Password</a></p>
          <p>If the above button does not work for some reason, you can copy and paste the following link into your browser:</p>
          <p><a href="${resetPasswordURL}">${resetPasswordURL}</a></p>
          <p>If you have not requested a password reset, please ignore this email.</p>
          <p><span class="emoji">🙏</span> Thank you! <span class="emoji">👋</span></p>
      </div>
  </body>
  </html>`;

  try {
    await sendEmail(email, subject, message);

    // If email sent successfully send the success response
    res.status(200).json({
      suceess: true,
      message: `Reset Password token has been send to ${email} successfully`,
    });
  } catch (error) {
    // If some error happened we need to clear the forgotPassword* fields in our DB
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    return next(new AppError(error.message, 500));
  }
};

/**
 * @RESET_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/reset/:resetToken
 * @ACCESS Public
 */
export const resetPassword = async () => {
  // Extracting resetToken from req.params object
  const { resetToken } = req.params;

  // Extracting password from req.body object
  const { password } = req.body;

  // Check if password is not there then send response saying password is required
  if (!password) {
    return next(new AppError("Password is required", 400));
  }

  // We are again hashing the resetToken using sha256 since we have stored our resetToken in DB using the same algorithm
  const forgotPasswordToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Checking if token matches in DB and if it is still valid(Not expired)
  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  // If not found or expired send the response
  if (!user) {
    return next(
      new AppError("Token is Invalid or Expired,please Try Again", 400)
    );
  }

  // Update the password if token is valid and not expired
  user.password = password;

  // making forgotPassword* valus undefined in the DB
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  // Saving the updated user values
  await user.save();

  // Sending the response when everything goes good
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

/**
 * @CHANGE_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/change-password
 * @ACCESS Private (Logged in users only)
 */
export const changePassword = async (req, res) => {
  // Destructuring the necessary data from the req object
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user; // because of the middleware isLoggedIn

  // Check if the values are there or not
  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are mandatory", 400));
  }

  // Finding the user by ID and selecting the password
  const user = await User.findById(id).select("+password");

  // If no user then throw an error message
  if (!user) {
    return next(new AppError("User does not Exits"));
  }

  // Check if the old password is correct
  const isPasswordValid = await user.comparePassword(oldPassword);

  // If the old password is not valid then throw an error message
  if (!isPasswordValid) {
    return next(new AppError("Invalid Old Password", 400));
  }

  // Setting the new password
  user.password = newPassword;

  // Save the data in DB
  await user.save();

  // Setting the password undefined so that it won't get sent in the response
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

/**
 * @UPDATE_USER
 * @ROUTE @POST {{URL}}/api/v1/user/update/:id
 * @ACCESS Private (Logged in user only)
 */
export const updateUserProfile = async (req, res) => {
  // Destructuring the necessary data from the req object
  const { fullName } = req.body;
  const { id } = req.user.id;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User does not exits", 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  // Run only if user sends a file
  if (req.file) {
    // Deletes the old image uploaded by the user
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      return next(
        new AppError(error || "File not uploaded, please try again", 400)
      );
    }
  }

  // Save the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: "user details updated successfully",
  });
};
