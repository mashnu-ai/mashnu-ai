import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play, ShieldAlert, Cpu, Settings, Database, ArrowRight } from 'lucide-react';
import { Node, Edge } from '../types';

interface AgentGraphProps {
  nodes: Node[];
  edges: Edge[];
}

export default function AgentGraph({ nodes, edges }: AgentGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Compute a structured layered DAG layout
  const layout = useMemo(() => {
    if (!nodes || nodes.length === 0) return { nodesWithCoords: [], edgePaths: [] };

    // 1. Group nodes by type / rank
    const triggerNodes = nodes.filter(n => n.type === 'trigger');
    const modelNodes = nodes.filter(n => n.type === 'model');
    const actionNodes = nodes.filter(n => n.type === 'action');
    const otherNodes = nodes.filter(n => n.type !== 'trigger' && n.type !== 'model' && n.type !== 'action');

    // Combine into distinct visual layers (horizontal layout)
    // Layer 0: Triggers
    // Layer 1: Middleware / RAG / Conditions
    // Layer 2: LLM Core Models
    // Layer 3: Actions
    const layers = [triggerNodes, otherNodes, modelNodes, actionNodes].filter(layer => layer.length > 0);

    const width = 800;
    const height = 400;
    const layerSpacing = width / (layers.length + 0.2);

    const coords: Record<string, { x: number; y: number }> = {};

    layers.forEach((layer, layerIdx) => {
      const x = (layerIdx + 0.6) * layerSpacing;
      const layerHeight = layer.length * 90;
      const startY = (height - layerHeight) / 2 + 45;

      layer.forEach((node, nodeIdx) => {
        coords[node.id] = {
          x,
          y: startY + nodeIdx * 90
        };
      });
    });

    const nodesWithCoords = nodes.map(node => ({
      ...node,
      ...coords[node.id] || { x: 100, y: 100 }
    }));

    // Find connections
    const edgePaths = edges.map((edge, idx) => {
      const from = coords[edge.source];
      const to = coords[edge.target];

      if (!from || !to) return null;

      // Draw standard bezier curve for clean visual look
      const dx = to.x - from.x;
      const controlX1 = from.x + dx * 0.4;
      const controlX2 = from.x + dx * 0.6;
      const pathData = `M ${from.x} ${from.y} C ${controlX1} ${from.y}, ${controlX2} ${to.y}, ${to.x} ${to.y}`;

      return {
        id: `edge-${edge.source}-${edge.target}-${idx}`,
        pathData,
        condition: edge.condition,
        source: edge.source,
        target: edge.target,
        midX: (from.x + to.x) / 2,
        midY: (from.y + to.y) / 2
      };
    }).filter(Boolean);

    return { nodesWithCoords, edgePaths };
  }, [nodes, edges]);

  const { nodesWithCoords, edgePaths } = layout;

  const selectedNode = useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'trigger':
        return <Play className="w-4 h-4 text-emerald-400" />;
      case 'condition':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'model':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'rag':
        return <Database className="w-4 h-4 text-indigo-400" />;
      default:
        return <Settings className="w-4 h-4 text-slate-400" />;
    }
  };

  const getNodeColorClass = (type: string, isSelected: boolean) => {
    if (isSelected) {
      return 'border-cyan-500 bg-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-slate-100';
    }
    switch (type) {
      case 'trigger':
        return 'border-emerald-500/40 hover:border-emerald-400 bg-slate-950/90 text-slate-200';
      case 'condition':
        return 'border-amber-500/40 hover:border-amber-400 bg-slate-950/90 text-slate-200';
      case 'model':
        return 'border-cyan-500/40 hover:border-cyan-400 bg-slate-950/90 text-slate-200';
      case 'rag':
        return 'border-indigo-500/40 hover:border-indigo-400 bg-slate-950/90 text-slate-200';
      default:
        return 'border-slate-800 hover:border-slate-600 bg-slate-950/90 text-slate-300';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border border-slate-800/80 rounded-xl bg-slate-950/40 backdrop-blur-md overflow-hidden">
      {/* Graph Visualizer Canvas */}
      <div className="lg:col-span-8 p-4 relative min-h-[360px] flex items-center justify-center bg-slate-950/60">
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 pointer-events-none">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Pipeline Visualizer</span>
          <span className="text-xs text-slate-400 font-medium">Click any node to inspect system schemas</span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-x-4 gap-y-2 z-10 text-[10px] font-mono text-slate-400 bg-slate-950/80 p-2 rounded border border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/60 block" />
            <span>Trigger Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/60 block" />
            <span>Condition / Check</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500/20 border border-cyan-500/60 block" />
            <span>Core Model</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-indigo-500/20 border border-indigo-500/60 block" />
            <span>RAG context</span>
          </div>
        </div>

        <svg className="w-full max-w-[800px] h-[400px] select-none" viewBox="0 0 800 400">
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4C463B" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#C15F3C" />
            </marker>
          </defs>

          {/* Render Connections / Edges */}
          {edgePaths.map((edge) => {
            if (!edge) return null;
            const isActive = selectedNodeId === edge.source || selectedNodeId === edge.target;

            return (
              <g key={edge.id}>
                <path
                  d={edge.pathData}
                  fill="none"
                  stroke={isActive ? '#C15F3C' : '#2A2519'}
                  strokeWidth={isActive ? 2 : 1.5}
                  markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow)'}
                  className="transition-colors duration-300"
                />
                {edge.condition && (
                  <g transform={`translate(${edge.midX}, ${edge.midY - 12})`}>
                    <rect
                      x="-55"
                      y="-8"
                      width="110"
                      height="16"
                      rx="4"
                      fill="#26221A"
                      stroke={isActive ? '#C15F3C/30' : '#2A2519'}
                      strokeWidth="1"
                    />
                    <text
                      fill={isActive ? '#D08055' : '#8B8271'}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {edge.condition}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render Interactive Nodes */}
          {nodesWithCoords.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                className="cursor-pointer"
              >
                {/* Node Outer Container (Floating animation if selected) */}
                <motion.rect
                  x="-75"
                  y="-26"
                  width="150"
                  height="52"
                  rx="6"
                  className={`${getNodeColorClass(node.type, isSelected)} border transition-all duration-300`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Left Colored Indicator Strip */}
                <rect
                  x="-74"
                  y="-25"
                  width="4"
                  height="50"
                  rx="2"
                  fill={
                    node.type === 'trigger' ? '#4F7D5A' :
                    node.type === 'condition' ? '#B08430' :
                    node.type === 'model' ? '#C15F3C' :
                    node.type === 'rag' ? '#3F6459' : '#8B8271'
                  }
                />

                {/* Node Label Text */}
                <text
                  x="-58"
                  y="-4"
                  fill="#F7F3EB"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  dominantBaseline="middle"
                >
                  {node.label.length > 18 ? `${node.label.slice(0, 16)}...` : node.label}
                </text>

                {/* Node Sub-Type Badge Text */}
                <text
                  x="-58"
                  y="12"
                  fill="#A39A87"
                  fontSize="9"
                  fontFamily="monospace"
                  dominantBaseline="middle"
                >
                  {node.id}
                </text>

                {/* Icon Placement on Right */}
                <g transform="translate(52, 0)">
                  <circle r="12" fill="#211D16" stroke={isSelected ? 'rgba(193, 95, 60, 0.6)' : '#2A2519'} strokeWidth="1" />
                  <g transform="translate(-8, -8)">
                    {React.cloneElement(getNodeIcon(node.type) as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' })}
                  </g>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Description Sidebar Panel */}
      <div className="lg:col-span-4 border-l border-slate-800/80 bg-slate-950/80 p-5 flex flex-col h-full justify-between">
        <div>
          {selectedNode ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[9px] font-mono rounded uppercase tracking-wider ${
                  selectedNode.type === 'trigger' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  selectedNode.type === 'condition' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  selectedNode.type === 'model' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                  selectedNode.type === 'rag' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                  'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                }`}>
                  {selectedNode.type} Node
                </span>
                <span className="text-[10px] font-mono text-slate-500">{selectedNode.id}</span>
              </div>

              <h4 className="text-sm font-semibold text-slate-100 font-display tracking-wide">{selectedNode.label}</h4>
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Operational Schema</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{selectedNode.description}</p>
              </div>

              <div className="border-t border-slate-900 pt-3 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Deduction Logic</span>
                <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/50 font-mono text-[10px] text-slate-400 space-y-1">
                  <div><span className="text-cyan-400">class</span> {selectedNode.id}Node(LangGraphNode) {'{'}</div>
                  <div className="pl-3 text-slate-500">// Execution signature</div>
                  <div className="pl-3">async def execute(self, state: AgentState):</div>
                  <div className="pl-6 text-slate-300">
                    {selectedNode.type === 'trigger' ? 'return await self.ingest_trigger(state)' :
                     selectedNode.type === 'model' ? 'return await self.invoke_llm(state)' :
                     selectedNode.type === 'rag' ? 'return await self.vector_query(state)' :
                     selectedNode.type === 'condition' ? 'return self.evaluate_route(state)' :
                     'return await self.run_action_bindings(state)'}
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-[250px] flex flex-col items-center justify-center text-center p-4">
              <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center mb-3">
                <Settings className="w-4 h-4 text-slate-500 animate-spin-slow" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Select any node in the canvas</p>
              <p className="text-[10px] text-slate-500 mt-1 max-w-[180px]">
                Click an execution step to inspect the underlying Python code block and active telemetry endpoints.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-900 pt-4 mt-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>State Synchronized via LangGraph Core</span>
          </div>
        </div>
      </div>
    </div>
  );
}
