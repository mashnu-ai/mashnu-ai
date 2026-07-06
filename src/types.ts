export interface Node {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'condition' | 'rag' | 'model';
  description: string;
}

export interface Edge {
  source: string;
  target: string;
  condition?: string;
}

export interface Tool {
  name: string;
  description: string;
  apiEndpoint: string;
  mockResponseSample: string;
}

export interface RagContext {
  vectorDatabase: string;
  chunkStrategy: string;
  sourcesIngested: string[];
}

export interface Benchmark {
  latencyMs: number;
  accuracyRate: string;
  costPerOp: string;
  humanEffortDiff: string;
}

export interface LatencyContribution {
  component: string;
  latencyMs: number;
}

export interface CompiledAgent {
  appName: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
  systemPrompt: string;
  ragContext: RagContext;
  tools: Tool[];
  benchmarks: Benchmark;
  latencyBreakdown: LatencyContribution[];
}

export interface TraceLogLine {
  timestamp: string;
  nodeId?: string;
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';
  message: string;
  payload?: string;
}

export interface SimulationTrace {
  success: boolean;
  finalResult: string;
  totalTimeMs: number;
  tokensUsed: {
    prompt: number;
    completion: number;
    total: number;
  };
  executionTraceLogs: TraceLogLine[];
}

export interface RoadmapItem {
  id: number;
  title: string;
  quarter: string;
  status: 'In Production' | 'Live/GA' | 'Beta Testing' | 'Active R&D' | 'Scheduled';
  description: string;
  specs: string[];
  whatItDoes: string;
  whoItsFor: string;
  technicalDifferentiator: string;
  ctaText: string;
  phase: 'Live' | 'Building' | 'Platform Layer';
}
