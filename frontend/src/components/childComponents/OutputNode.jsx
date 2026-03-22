export const OutputNode = ({ response = "" }) => {
  return (
    <div className="flex-1 bg-linear-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:bg-linear-to-br hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 flex flex-col h-96" style={{ boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)" }}>
      {/* Node Label */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Output Node</span>
      </div>

      {/* Output Text */}
      <div className=" h-64 lg:h-96 bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 text-gray-200 font-mono text-sm leading-relaxed overflow-y-auto cursor-default">{response || "AI response will appear here..."}</div>
    </div>
  );
};
