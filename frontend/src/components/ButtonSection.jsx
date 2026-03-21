export const ButtonSection = ({ onRunFlow, onSave, isLoading }) => {
  return (
    <div className="flex gap-4 justify-center flex-wrap mb-10">
      {/* Run Button */}
      <button onClick={onRunFlow} disabled={isLoading} className="px-10 py-3 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-900 font-bold uppercase tracking-widest rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 min-w-48 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" style={{ boxShadow: "0 8px 25px rgba(0, 217, 255, 0.4)" }}>
        {isLoading ? "Processing..." : "Run Flow"}
      </button>

      {/* Save Button */}
      <button onClick={onSave} disabled={isLoading} className="px-10 py-3 bg-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest rounded-xl border-2 border-cyan-500/50 transition-all duration-300 hover:bg-cyan-500/30 hover:border-cyan-500/80 hover:shadow-lg hover:shadow-cyan-500/30 min-w-48 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        Save Conversation
      </button>
    </div>
  );
};
