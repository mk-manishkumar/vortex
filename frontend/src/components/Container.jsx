import { InputNode } from "./childComponents/InputNode";
import { LoadingSpinner } from "./childComponents/LoadingSpinner";
import { OutputNode } from "./childComponents/OutputNode";

export const Container = ({ response, isLoading }) => {
  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 rounded-3xl p-16 backdrop-blur-lg mb-10" style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)" }}>
      {/* Nodes Wrapper */}
      <div className="flex justify-between items-center gap-10">
        {/* Input Node */}
        <InputNode />

        {/* Output Node */}
        <OutputNode response={response} />
      </div>

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};
