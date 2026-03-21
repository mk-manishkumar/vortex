import mongoose from "mongoose";

const isDevelopment = process.env.NODE_ENV === "development";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) throw new Error("MONGODB_URI is not defined in .env");

    await mongoose.connect(mongoURI);

    if (isDevelopment) console.log("MongoDB connected successfully");
  } catch (error) {
    if (isDevelopment) console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
