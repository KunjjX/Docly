import { describe, expect, test } from 'vitest';
import { DIAGRAM_TYPES, validateDiagram } from '../src/commands/diagramGenerator.js';

describe('DIAGRAM_TYPES', () => {
  test('should contain all 14 diagram types', () => {
    expect(DIAGRAM_TYPES).toHaveLength(14);
  });

  test('should include common diagram types', () => {
    expect(DIAGRAM_TYPES).toContain('architecture');
    expect(DIAGRAM_TYPES).toContain('sequence');
    expect(DIAGRAM_TYPES).toContain('class');
    expect(DIAGRAM_TYPES).toContain('er');
    expect(DIAGRAM_TYPES).toContain('flowchart');
    expect(DIAGRAM_TYPES).toContain('component');
    expect(DIAGRAM_TYPES).toContain('deployment');
  });
});

describe('validateDiagram', () => {
  describe('activity', () => {
    test('should accept valid stateDiagram-v2', () => {
      expect(() => validateDiagram('activity', 'stateDiagram-v2\n[*] --> State1')).not.toThrow();
    });

    test('should reject non-stateDiagram syntax', () => {
      expect(() => validateDiagram('activity', 'flowchart TD\nA-->B')).toThrow(
        'Must start with stateDiagram-v2'
      );
    });

    test('should reject flowchart syntax in activity', () => {
      expect(() =>
        validateDiagram('activity', 'stateDiagram-v2\n[*] --> State1\nflowchart TD A-->B')
      ).toThrow('Activity diagram cannot use graph/flowchart syntax');
    });
  });

  describe('workflow / flowchart', () => {
    test('should accept valid flowchart', () => {
      expect(() => validateDiagram('flowchart', 'flowchart TD\nA-->B')).not.toThrow();
    });

    test('should accept valid workflow', () => {
      expect(() => validateDiagram('workflow', 'flowchart LR\nA-->B')).not.toThrow();
    });

    test('should reject non-flowchart syntax', () => {
      expect(() => validateDiagram('flowchart', 'sequenceDiagram\nA->>B')).toThrow(
        'Must start with flowchart'
      );
    });
  });

  describe('sequence', () => {
    test('should accept valid sequenceDiagram', () => {
      expect(() => validateDiagram('sequence', 'sequenceDiagram\nA->>B: Hello')).not.toThrow();
    });

    test('should reject non-sequence syntax', () => {
      expect(() => validateDiagram('sequence', 'classDiagram')).toThrow(
        'Must start with sequenceDiagram'
      );
    });
  });

  describe('class', () => {
    test('should accept valid classDiagram', () => {
      expect(() => validateDiagram('class', 'classDiagram\nclass Foo {}')).not.toThrow();
    });

    test('should reject non-class syntax', () => {
      expect(() => validateDiagram('class', 'erDiagram')).toThrow('Must start with classDiagram');
    });
  });

  describe('state', () => {
    test('should accept valid stateDiagram-v2', () => {
      expect(() => validateDiagram('state', 'stateDiagram-v2\n[*] --> Idle')).not.toThrow();
    });

    test('should reject non-state syntax', () => {
      expect(() => validateDiagram('state', 'flowchart TD')).toThrow(
        'Must start with stateDiagram-v2'
      );
    });
  });

  describe('er / erd', () => {
    test('should accept valid erDiagram', () => {
      expect(() => validateDiagram('er', 'erDiagram\nUSER { int id }')).not.toThrow();
    });

    test('should accept erd as type', () => {
      expect(() => validateDiagram('erd', 'erDiagram\nUSER { int id }')).not.toThrow();
    });

    test('should reject non-ER syntax', () => {
      expect(() => validateDiagram('er', 'flowchart TD')).toThrow('Must start with erDiagram');
    });
  });

  describe('usecase', () => {
    test('should accept flowchart syntax', () => {
      expect(() => validateDiagram('usecase', 'flowchart TD\nA-->B')).not.toThrow();
    });

    test('should accept graph syntax', () => {
      expect(() => validateDiagram('usecase', 'graph TD\nA-->B')).not.toThrow();
    });

    test('should reject non-graph/flowchart syntax', () => {
      expect(() => validateDiagram('usecase', 'sequenceDiagram')).toThrow(
        'Must start with graph or flowchart'
      );
    });
  });

  describe('architecture / component / deployment / dfd', () => {
    test('should accept flowchart syntax for architecture', () => {
      expect(() => validateDiagram('architecture', 'flowchart TD\nA-->B')).not.toThrow();
    });

    test('should accept graph syntax for component', () => {
      expect(() => validateDiagram('component', 'graph LR\nA-->B')).not.toThrow();
    });

    test('should accept C4Context syntax for deployment', () => {
      expect(() => validateDiagram('deployment', 'C4Context\nContainer(c1)')).not.toThrow();
    });

    test('should accept flowchart for dfd-level-1', () => {
      expect(() => validateDiagram('dfd-level-1', 'flowchart TD\nA-->B')).not.toThrow();
    });

    test('should reject invalid syntax', () => {
      expect(() => validateDiagram('architecture', 'sequenceDiagram')).toThrow(
        'Must start with graph or flowchart'
      );
    });
  });

  describe('edge cases', () => {
    test('should handle comments in code', () => {
      expect(() =>
        validateDiagram('flowchart', '%% comment\nflowchart TD\n%% another\nA-->B')
      ).not.toThrow();
    });

    test('should handle empty code after comments', () => {
      expect(() => validateDiagram('flowchart', '%% just a comment')).toThrow(
        'Must start with flowchart'
      );
    });

    test('should be case sensitive for diagram types', () => {
      expect(() => validateDiagram('sequence', 'SEQUENCEDIAGRAM')).toThrow(
        'Must start with sequenceDiagram'
      );
    });
  });
});
