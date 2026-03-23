export const LoadingSpinner = () => {
  return (
    <div className="text-center text-cyan-400 font-bold my-8">
      <div className="flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
        <span>Processing your request...</span>
      </div>
    </div>
  );
};
