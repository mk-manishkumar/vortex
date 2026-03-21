import { useVortex } from "./hooks/useVortex";
import { ButtonSection } from "./components/ButtonSection";
import { Container } from "./components/Container";
import { Header } from "./components/Header";

const App = () => {
  const { response, isLoading, error, handleAskAI, handleSaveConversation, clearConversation } = useVortex();

  const handleRunFlow = async () => {
    const inputElement = document.getElementById("inputText");
    if (inputElement?.value) await handleAskAI(inputElement.value);
  };

  const handleSave = async () => {
    const result = await handleSaveConversation();
    if (result) {
      alert("Conversation saved successfully!");
      clearConversation();
      const inputElement = document.getElementById("inputText");
      if (inputElement) inputElement.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <Header />

        {/* Error Message */}
        {error && <div className="mb-5 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">❌ {error}</div>}

        {/* Flow Container */}
        <Container response={response} isLoading={isLoading} />

        {/* Controls */}
        <ButtonSection onRunFlow={handleRunFlow} onSave={handleSave} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
