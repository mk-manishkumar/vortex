import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) throw new Error("MONGODB_URI is not defined in .env");

    await mongoose.connect(mongoURI);

  } catch (error) {
    process.exit(1);
  }
};
