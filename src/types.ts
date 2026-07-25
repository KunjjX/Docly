export interface TechStack {
  backend: string;
  frontend: string;
  database: string;
  authentication: string;
  language: string;
}

export interface ProjectData {
  name: string;
  description: string;
  version: string;
  techStack: TechStack;
  dependencies: string[];
  devDependencies: string[];
  structure: string[];
  scripts: string[];
  entryPoints: string[];
}

export interface CLIOptions {
  output?: string;
  overwrite?: boolean;
  ai?: string;
  format?: string;
  diagramType?: string;
  all?: boolean;
  debug?: boolean;
  dryRun?: boolean;
  previousError?: string;
}

export interface DiagramTypeMap {
  [key: string]: string[];
}

export type DocType =
  | 'readme'
  | 'srs'
  | 'architecture'
  | 'workflow'
  | 'testcases'
  | 'api-docs'
  | 'setup'
  | 'deploy'
  | 'security'
  | 'requirements'
  | 'diagram';

export type DiagramType =
  | 'architecture'
  | 'component'
  | 'deployment'
  | 'er'
  | 'class'
  | 'sequence'
  | 'state'
  | 'activity'
  | 'usecase'
  | 'flowchart'
  | 'workflow'
  | 'dfd-level-1'
  | 'dfd-level-2'
  | 'dfd-level-3';

export type ProjectType = 'node' | 'python' | 'go' | 'rust' | 'java' | 'ruby';

export type AIProvider = 'gemini' | 'openai';

export interface ConfigData {
  outputDir: string;
  aiProvider: AIProvider;
  geminiModel: string;
  openaiModel: string;
  apiTimeout: number;
  maxRetries: number;
  overwriteExisting: boolean;
  logLevel: string;
}
