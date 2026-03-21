import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
