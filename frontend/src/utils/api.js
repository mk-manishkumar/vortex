const API_BASE_URL = "http://localhost:5001/api";

// Ask AI endpoint
export const askAI = async (prompt) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ask-ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get AI response");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error asking AI:", error.message);
    throw error;
  }
};

// Save conversation endpoint
export const saveConversation = async (prompt, response) => {
  try {
    const apiResponse = await fetch(`${API_BASE_URL}/save-conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, response }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.error || "Failed to save conversation");
    }

    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error("Error saving conversation:", error.message);
    throw error;
  }
};

// Get all conversations endpoint
export const getConversations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch conversations");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    throw error;
  }
};
