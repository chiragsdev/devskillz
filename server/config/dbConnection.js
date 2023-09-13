import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log(`connection done ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
