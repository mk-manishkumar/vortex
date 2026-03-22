import { InputNode } from "./childComponents/InputNode";
import { LoadingSpinner } from "./childComponents/LoadingSpinner";
import { OutputNode } from "./childComponents/OutputNode";

export const Container = ({ response, isLoading, onRunFlow }) => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto mb-10 flex flex-col gap-8">
      {/* Nodes Wrapper */}
      <div className="flex flex-col lg:flex-row gap-16 items-stretch">
        <InputNode onRunFlow={onRunFlow} isLoading={isLoading} />
        <OutputNode response={response} />
      </div>

      {/* Loader */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};
