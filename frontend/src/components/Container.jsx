import React, { useMemo, useState, useEffect } from "react";
import { ReactFlow, useNodesState, useEdgesState, MarkerType, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// --- CUSTOM NODE WRAPPERS ---
const CustomInputWrapper = ({ data }) => (
  <div className="w-full">
    {data.component}
    <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
  </div>
);

const CustomOutputWrapper = ({ data }) => (
  <div className="w-full">
    {data.component}
    <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
  </div>
);

// --- MAIN CONTAINER ---
import { InputNode } from "./childComponents/InputNode";
import { LoadingSpinner } from "./childComponents/LoadingSpinner";
import { OutputNode } from "./childComponents/OutputNode";

export const Container = ({ response, isLoading, onRunFlow }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      inputNodeCustom: CustomInputWrapper,
      outputNodeCustom: CustomOutputWrapper,
    }),
    [],
  );

  const boxWidth = 520;
  const arrowGap = 80;

  const initialNodes = [
    {
      id: "input-1",
      type: "inputNodeCustom",
      position: { x: 0, y: 0 },
      data: { component: <InputNode onRunFlow={onRunFlow} isLoading={isLoading} /> },
      style: { width: boxWidth },
    },
    {
      id: "output-1",
      type: "outputNodeCustom",
      position: { x: boxWidth + arrowGap, y: 0 },
      data: { component: <OutputNode response={response} /> },
      style: { width: boxWidth },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState([
    {
      id: "e-io",
      source: "input-1",
      target: "output-1",
      type: "straight",
      animated: isLoading,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#22d3ee",
        width: 20,
        height: 20,
      },
      style: { stroke: "#22d3ee", strokeWidth: 3 },
    },
  ]);

  // syncing internal React Flow state with external props
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "input-1") {
          return {
            ...node,
            data: { ...node.data, component: <InputNode onRunFlow={onRunFlow} isLoading={isLoading} /> },
          };
        }
        if (node.id === "output-1") {
          return {
            ...node,
            data: { ...node.data, component: <OutputNode response={response} /> },
          };
        }
        return node;
      }),
    );
  }, [response, isLoading, onRunFlow, setNodes]);

  return (
    <div className="w-11/12 max-w-7xl mx-auto flex flex-col mb-16 lg:mb-0">
      {isMobile ? (
        /* MOBILE VIEW */
        <div className="flex flex-col items-center py-4 w-full">
          <div className="w-full max-w-130">
            <InputNode onRunFlow={onRunFlow} isLoading={isLoading} />
          </div>

          <div className="flex flex-col items-center my-8">
            <div className={`w-1 h-12 bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] ${isLoading ? "animate-pulse" : ""}`}></div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-12 border-t-cyan-400/80"></div>
          </div>

          <div className="w-full max-w-130">
            <OutputNode response={response} />
          </div>
        </div>
      ) : (
        /* DESKTOP VIEW */
        <div className="h-125 w-full">
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} fitView proOptions={{ hideAttribution: true }} zoomOnScroll={false} panOnDrag={false} nodesDraggable={false} nodesConnectable={false} elementSelectable={false} />
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      <style>{`
        .react-flow__node {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .react-flow__edge-path {
          filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.8));
        }
      `}</style>
    </div>
  );
};
