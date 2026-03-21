import { useState } from "react";
import { askAI, saveConversation } from "../utils/api";

export const useVortex = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle asking AI
  const handleAskAI = async (inputPrompt) => {
    // Validate input
    if (!inputPrompt || inputPrompt.trim() === "") {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await askAI(inputPrompt);
      setPrompt(inputPrompt);
      setResponse(aiResponse);
    } catch (err) {
      setError(err.message || "Failed to get response from AI");
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving conversation
  const handleSaveConversation = async () => {
    if (!prompt || !response) {
      setError("Please run a flow first before saving");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await saveConversation(prompt, response);
      setError(null); 
      return result;
    } catch (err) {
      setError(err.message || "Failed to save conversation");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear conversation
  const clearConversation = () => {
    setPrompt("");
    setResponse("");
    setError(null);
  };

  return { prompt, response, isLoading, error, setPrompt, setResponse, handleAskAI, handleSaveConversation, clearConversation };
};
