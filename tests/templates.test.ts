import { describe, expect, test } from 'vitest';
import {
  buildApiDocsPrompt,
  buildArchitecturePrompt,
  buildDeployPrompt,
  buildDiagramPrompt,
  buildReadmePrompt,
  buildRequirementsPrompt,
  buildSecurityPrompt,
  buildSetupPrompt,
  buildSRSPrompt,
  buildTestCasesPrompt,
  buildWorkflowPrompt,
} from '../src/templates/index.js';
import type { ProjectData } from '../src/types';

const sampleProject: ProjectData = {
  name: 'test-project',
  description: 'A test project description',
  version: '1.0.0',
  techStack: {
    backend: 'Express.js',
    frontend: 'React',
    database: 'MongoDB',
    authentication: 'JWT',
    language: 'TypeScript',
  },
  dependencies: ['express', 'react', 'mongoose', 'jsonwebtoken'],
  devDependencies: ['vitest', 'typescript'],
  structure: ['src', 'tests', 'docs'],
  scripts: ['start', 'dev', 'test', 'build'],
  entryPoints: ['src/index.ts'],
};

describe('Prompt Builders', () => {
  test('buildReadmePrompt should include project name and system prefix', () => {
    const result = buildReadmePrompt(sampleProject);
    expect(result).toContain('test-project');
    expect(result).toContain('Express.js');
    expect(result).toContain('React');
    expect(result).toContain('MongoDB');
    expect(result).toContain('senior software architect');
    expect(result).toContain('README.md');
    expect(result).toContain('**Project Structure:**');
    expect(result).toContain('- src/');
    expect(result).toContain('- tests/');
    expect(result).toContain('**Key Dependencies:**');
    expect(result).toContain('- express');
    expect(result).toContain('- react');
    expect(result).toContain('**Entry Points:**');
    expect(result).toContain('- src/index.ts');
  });

  test('buildSRSPrompt should include IEEE 830 sections', () => {
    const result = buildSRSPrompt(sampleProject);
    expect(result).toContain('Software Requirements Specification');
    expect(result).toContain('test-project');
    expect(result).toContain('Functional Requirements');
    expect(result).toContain('Non-Functional Requirements');
    expect(result).toContain('System Constraints');
    expect(result).toContain('senior software architect');
    expect(result).toContain('Appendix');
    expect(result).toContain('IEEE 830');
  });

  test('buildArchitecturePrompt should include architecture sections', () => {
    const result = buildArchitecturePrompt(sampleProject);
    expect(result).toContain('architecture documentation');
    expect(result).toContain('test-project');
    expect(result).toContain('System Overview');
    expect(result).toContain('Component Breakdown');
    expect(result).toContain('Data Flow');
    expect(result).toContain('Mermaid Diagram');
    expect(result).toContain('senior software architect');
  });

  test('buildWorkflowPrompt should include workflow sections', () => {
    const result = buildWorkflowPrompt(sampleProject);
    expect(result).toContain('workflow documentation');
    expect(result).toContain('User Workflows');
    expect(result).toContain('System Workflows');
    expect(result).toContain('Error Handling');
    expect(result).toContain('Mermaid.js');
  });

  test('buildTestCasesPrompt should include test case sections', () => {
    const result = buildTestCasesPrompt(sampleProject);
    expect(result).toContain('test case document');
    expect(result).toContain('Unit Tests');
    expect(result).toContain('Integration Tests');
    expect(result).toContain('End-to-End Tests');
    expect(result).toContain('Test Table');
  });

  test('buildApiDocsPrompt should include API doc sections', () => {
    const result = buildApiDocsPrompt(sampleProject);
    expect(result).toContain('API documentation');
    expect(result).toContain('API Overview');
    expect(result).toContain('Endpoints');
    expect(result).toContain('Error Codes');
    expect(result).toContain('Rate Limiting');
    expect(result).toContain('Authentication');
  });

  test('buildSetupPrompt should include setup sections', () => {
    const result = buildSetupPrompt(sampleProject);
    expect(result).toContain('setup guide');
    expect(result).toContain('Prerequisites');
    expect(result).toContain('Installation Steps');
    expect(result).toContain('Environment Configuration');
    expect(result).toContain('Running the Project');
    expect(result).toContain('Common Issues');
  });

  test('buildDeployPrompt should include deployment sections', () => {
    const result = buildDeployPrompt(sampleProject);
    expect(result).toContain('deployment guide');
    expect(result).toContain('Deployment Options');
    expect(result).toContain('Build Process');
    expect(result).toContain('CI/CD Setup');
    expect(result).toContain('Post-Deployment');
  });

  test('buildSecurityPrompt should include security sections', () => {
    const result = buildSecurityPrompt(sampleProject);
    expect(result).toContain('security documentation');
    expect(result).toContain('Authentication');
    expect(result).toContain('Authorization');
    expect(result).toContain('Data Protection');
    expect(result).toContain('API Security');
    expect(result).toContain('Vulnerability Management');
  });

  test('buildRequirementsPrompt should include requirements sections', () => {
    const result = buildRequirementsPrompt(sampleProject);
    expect(result).toContain('requirements matrix');
    expect(result).toContain('Functional Requirements');
    expect(result).toContain('Non-Functional Requirements');
    expect(result).toContain('Technical Requirements');
    expect(result).toContain('Feature-Module Mapping');
    expect(result).toContain('Traceability Matrix');
  });

  test('buildDiagramPrompt should include diagram type', () => {
    const result = buildDiagramPrompt(sampleProject, 'architecture');
    expect(result).toContain('Mermaid.js diagram');
    expect(result).toContain('ARCHITECTURE');
    expect(result).toContain('flowchart TD');
    expect(result).toContain('Raw Code Only');
    expect(result).toContain('senior software architect');
  });

  test('buildDiagramPrompt should include previous error when provided', () => {
    const result = buildDiagramPrompt(sampleProject, {
      diagramType: 'sequence',
      previousError: 'Invalid syntax detected',
    });
    expect(result).toContain('PREVIOUS ATTEMPT ERROR');
    expect(result).toContain('Invalid syntax detected');
    expect(result).toContain('SEQUENCE');
    expect(result).toContain('sequenceDiagram');
  });

  test('buildDiagramPrompt should support ER diagram type', () => {
    const result = buildDiagramPrompt(sampleProject, 'er');
    expect(result).toContain('ER');
    expect(result).toContain('erDiagram');
  });

  test('buildDiagramPrompt should default to architecture', () => {
    const result = buildDiagramPrompt(sampleProject);
    expect(result).toContain('ARCHITECTURE');
  });

  test('formatTechStack should format with bullet points', () => {
    const result = buildReadmePrompt(sampleProject);
    expect(result).toContain('- backend:');
    expect(result).toContain('- frontend:');
    expect(result).toContain('- database:');
    expect(result).not.toContain('"backend":');
  });
});
