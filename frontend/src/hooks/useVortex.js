/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { askAI, saveConversation } from "../utils/api";
import { stripMarkdown } from "../utils/stripMarkdown";

// Function to limit response to 100 words
const limitToHundredWords = (text) => {
  const words = text.split(/\s+/);
  if (words.length > 75) return words.slice(0, 75).join(" ") + "...";
  return text;
};

export const useVortex = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle asking AI
  const handleAskAI = async (inputPrompt) => {
    // Validate input
    if (!inputPrompt || inputPrompt.trim() === "") {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      let aiResponse = await askAI(inputPrompt);

      // Strip markdown formatting
      aiResponse = stripMarkdown(aiResponse);

      // Limit response to 100 words
      const limitedResponse = limitToHundredWords(aiResponse);

      setPrompt(inputPrompt);
      setResponse(limitedResponse);
      toast.success("Response received!");
    } catch (error) {
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving conversation
  const handleSaveConversation = async () => {
    if (!prompt || !response) {
      toast.error("Please run a flow first before saving");
      return;
    }

    setIsLoading(true);

    try {
      const result = await saveConversation(prompt, response);
      return result;
    } catch (error) {
      // Error is handled by toast in api.js
    } finally {
      setIsLoading(false);
    }
  };

  // Clear conversation
  const clearConversation = () => {
    setPrompt("");
    setResponse("");
  };

  return {
    prompt,
    response,
    isLoading,
    setPrompt,
    setResponse,
    handleAskAI,
    handleSaveConversation,
    clearConversation,
  };
};
