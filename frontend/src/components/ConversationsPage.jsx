/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getConversations, deleteConversation } from "../utils/api";
import { Header } from "./Header";

export const ConversationsPage = ({ onBack }) => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const data = await getConversations();
      setConversations(data);
      if (data.length === 0) toast("No conversations saved yet");
    } catch (error) {
      toast.error("Failed to fetch conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (globalThis.confirm("Are you sure you want to delete this conversation?")) {
      setDeletingId(id);
      try {
        await deleteConversation(id);
        setConversations(conversations.filter((conv) => conv._id !== id));
      } catch (error) {
        // Error is handled by toast in api.js
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-4 md:p-5">
      <div className="w-full">
        {/* Header */}
        <Header />

        {/* Page Header */}
        <div className="mb-10 mt-10">
          <div className="flex flex-col md:flex-row gap-5 items-center justify-center md:justify-between md:items-center mb-4">
            <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center md:text-left">Saved Conversations</h1>
            <button onClick={onBack} className="px-6 py-2 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-900 font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 cursor-pointer text-sm whitespace-nowrap" style={{ boxShadow: "0 4px 15px rgba(0, 217, 255, 0.3)" }}>
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

        {/* Conversations Grid */}
        {!isLoading && conversations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {conversations.map((conversation, index) => (
              <div key={conversation._id} className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 flex flex-col h-120" style={{ boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)" }}>
                {/* Conversation Number */}
                <div className="mb-4">
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Conversation #{index + 1}</span>
                  <p className="text-xs text-gray-500 mt-1">{new Date(conversation.createdAt).toLocaleString()}</p>
                </div>

                {/* Prompt */}
                <div className="mb-3">
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2">Question</p>
                  <p className="text-gray-200 text-xs bg-slate-900/50 rounded-lg p-3 border border-cyan-500/20 line-clamp-2">{conversation.prompt}</p>
                </div>

                {/* Response */}
                <div className="flex flex-col mb-4">
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2">Response</p>
                  <div className="h-52 bg-slate-900/50 border border-cyan-500/20 rounded-lg p-3 text-gray-200 font-mono text-xs leading-relaxed overflow-y-auto cursor-default">{conversation.response}</div>
                </div>

                {/* Delete Button */}
                <div className="flex justify-end pt-2 border-t border-cyan-500/20">
                  <button onClick={() => handleDelete(conversation._id)} disabled={deletingId === conversation._id} className="px-4 py-2 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-800 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs">
                    {deletingId === conversation._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
