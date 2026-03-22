import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getConversations } from "../utils/api";
import { Header } from "./Header";

export const ConversationsPage = ({ onBack }) => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const data = await getConversations();
      setConversations(data);
      if (data.length === 0) {
        toast("No conversations saved yet");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch conversations");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-start p-4 md:p-5 pt-10">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <Header />
        {/* This page header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-4">
            <h1 className="text-2xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Saved Conversations</h1>
            <button onClick={onBack} className="px-6 py-2 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-900 font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 cursor-pointer text-sm" style={{ boxShadow: "0 4px 15px rgba(0, 217, 255, 0.3)" }}>
              Back Home
            </button>
          </div>
          <p className="text-gray-400 text-center md:text-left">View all your saved AI conversations</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center text-cyan-400 font-bold">
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <span>Loading conversations...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && conversations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No conversations saved yet</p>
            <button onClick={onBack} className="px-6 py-2 bg-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest rounded-lg border-2 border-cyan-500/50 hover:bg-cyan-500/30 cursor-pointer">
              Go Back
            </button>
          </div>
        )}

        {/* Conversations List */}
        {!isLoading && conversations.length > 0 && (
          <div className="space-y-4">
            {conversations.map((conversation, index) => (
              <div key={conversation._id} className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20">
                {/* Conversation Number */}
                <div className="mb-4">
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Conversation #{index + 1}</span>
                  <p className="text-xs text-gray-500 mt-1">{new Date(conversation.createdAt).toLocaleString()}</p>
                </div>

                {/* Prompt */}
                <div className="mb-4">
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2">Question</p>
                  <p className="text-gray-200 text-sm bg-slate-900/50 rounded-lg p-3 border border-cyan-500/20">{conversation.prompt}</p>
                </div>

                {/* Response */}
                <div>
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2">Response</p>
                  <p className="text-gray-200 text-sm bg-slate-900/50 rounded-lg p-3 border border-cyan-500/20 max-h-40 overflow-y-auto">{conversation.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        {!isLoading && conversations.length > 0 && (
          <button onClick={fetchConversations} className="mt-8 w-full px-6 py-2 bg-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest rounded-lg border-2 border-cyan-500/50 hover:bg-cyan-500/30 cursor-pointer transition-all duration-300">
            Refresh
          </button>
        )}
      </div>
    </div>
  );
};
