import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useVortex } from "./hooks/useVortex";
import { ButtonSection } from "./components/ButtonSection";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { ConversationsPage } from "./components/ConversationsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const { response, isLoading, handleAskAI, handleSaveConversation, clearConversation } = useVortex();

  const handleRunFlow = async () => {
    const inputElement = document.getElementById("inputText");
    const inputValue = inputElement?.value || "";
    await handleAskAI(inputValue);
  };

  const handleSave = async () => {
    const result = await handleSaveConversation();
    if (result) {
      clearConversation();
      const inputElement = document.getElementById("inputText");
      if (inputElement) inputElement.value = "";
    }
  };

  const handleViewConversations = () => setCurrentPage("conversations");
  const handleBackHome = () => setCurrentPage("home");

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {currentPage === "home" ? (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 md:p-5">
          <div className="w-full">
            {/* Header Section */}
            <Header />

            {/* Flow Container */}
            <Container response={response} isLoading={isLoading} onRunFlow={handleRunFlow} />

            {/* Controls */}
            <ButtonSection onSave={handleSave} onViewAll={handleViewConversations} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <ConversationsPage onBack={handleBackHome} />
      )}
    </>
  );
};

export default App;
