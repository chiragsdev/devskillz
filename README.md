# DevSkillz

DevSkillz is a full-stack web application built on the MERN stack (MongoDB, Express.js, React, Node.js) designed to provide a comprehensive eLearning experience for skill development and learning.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

## Features

### User Role

- 🕵️‍♂️ **Course Browsing and Searching:**
  - Browse a wide range of courses with an intelligent search bar featuring real-time suggestions and performance-optimized search functionality using useEffect for debouncing.
- 🔐 **Secure Authentication:**
  - Enjoy secure access with JWT authentication, ensuring user data privacy and security.
- 💳 **Subscription:**
  - Subscribe to courses using Razorpay for secure payment processing (dummy Rs.499/year).
- 📚 **Lecture Dashboard:**
  - Access a personalized lecture dashboard to watch videos, mark progress, and leave comments.
- 📈 **Progress Tracking:**
  - Mark lectures as completed or incomplete, and view overall course progress.
- 💬 **Commenting:**
  - Optimized comment section to load data in chunks for a smooth user experience.
- 📝 **Testing and Certification:**
  - After completing 80%+ of a course, users can take a 10-question MCQ test.
  - Score 7+ to download a certificate or retry the test.

### Admin Role

- 📊 **Admin Dashboard:**
  - Access an admin panel with interactive charts for visualizing data and managing the platform.
- 🛠️ **Course Management:**
  - Create, read, update, and delete (CRUD) courses and their lectures.
- 🧩 **Test Management:**
  - Oversee the creation, updating, and deletion of tests to ensure comprehensive course assessment.

## Tech Stack

- ⚙️ **MERN Stack:**

  - **MongoDB:** A NoSQL database for storing user, course, and progress data.
  - **Express.js:** A web application framework for Node.js, handling routing and server-side logic.
  - **React:** A JavaScript library for building user interfaces, offering a responsive and interactive user experience.
  - **Node.js:** A JavaScript runtime built on Chrome's V8 engine, enabling server-side scripting.

- 🎨 **Styling:**

  - **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
  - **DaisyUI:** A component library for Tailwind CSS, providing pre-designed components.

- 🔐 **Authentication:**

  - **JWT (JSON Web Tokens):** For secure user authentication and session management.

- 📊 **Data Visualization:**

  - **Chart.js:** A JavaScript library for creating interactive charts to visualize data in the admin panel.

- 📄 **PDF Generation:**

  - **PDFKit:** A JavaScript library for generating PDFs, used for creating course completion certificates.

- ☁️ **Media Management:**

  - **Cloudinary:** A cloud service for managing media assets, including image and video uploads.

- 📚 **Database Modeling:**

  - **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, providing schema-based solutions.

- 📂 **File Uploads:**

  - **Multer:** A middleware for handling multipart/form-data, used for uploading files.

- ✉️ **Email Notifications:**

  - **Nodemailer:** A module for Node.js applications to send emails, used for sending notifications and updates.

- 💳 **Payment Integration:**

  - **Razorpay:** A payment gateway for handling subscription payments.

- 🗂️ **State Management:**

  - **Redux Toolkit:** A toolset for efficient Redux development, managing the application's state.

- 🔔 **Notifications:**
  - **React-Hot-Toast:** A lightweight notification library for React, providing user-friendly toast notifications.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/DevSkillz.git

   ```

2. Navigate to the project directory

   ```bash
   cd DevSkillz

   ```

3. Install server dependencies

   ```bash
   cd server
   npm install
   ```

4. Create a .env file in the server directory with the following content:

   ```bash
   NODE_ENV=development
   PORT=3000
   MONGO_URI=
   JWT_SECRET=
   JWT_EXPIRY=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   SMTP_USER=
   SMTP_PASS=
   SMTP_FROM_EMAIL=
   RAZORPAY_KEY_ID=
   RAZORPAY_SECRET=
   RAZORPAY_PLAN_ID=
   FRONTEND_URL=
   CONTACT_US_EMAIL=
   ```

5. Install client dependencies

   ```bash
   cd ../client
   npm install
   ```

## Usage

1. Start the server

   ```bash
   cd server
   npm start
   ```

2. Start the client

   ```bash
   cd ../client
   npm start
   ```

3. Open your browser and navigate to http://localhost:5173
