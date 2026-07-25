import type { CLIOptions, ProjectData, TechStack } from '../types';

const SYSTEM_PREFIX =
  'You are a senior software architect and technical writer. Generate clear, professional documentation in Markdown format. Be specific to the project context and avoid generic filler content.';

function formatTechStack(techStack: TechStack): string {
  const entries = Object.entries(techStack)
    .filter(([, v]) => v && v !== 'None')
    .map(([k, v]) => `- ${k}: ${v}`);
  return entries.join('\n');
}

export function buildReadmePrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate a comprehensive and professional README.md file for the following project:

**Project Details:**
- Name: ${projectData.name}
- Description: ${projectData.description}
- Version: ${projectData.version}
- Language: ${projectData.techStack.language}
- Tech Stack:
${formatTechStack(projectData.techStack)}

**Project Structure:**
${projectData.structure.map(dir => `- ${dir}/`).join('\n')}

**Key Dependencies:**
${projectData.dependencies
  .slice(0, 20)
  .map(dep => `- ${dep}`)
  .join('\n')}

**Entry Points:**
${projectData.entryPoints.map(e => `- ${e}`).join('\n')}

---

**Instructions:**
Generate a standard, high-quality README.md that includes:
1. **Title & Badges** - Based on project metadata.
2. **Introduction** - A clear explanation of what the project does.
3. **Features** - List key features based on dependencies and project structure.
4. **Tech Stack** - List the technologies used.
5. **Prerequisites** - What's needed to run the project (e.g., Node.js version).
6. **Installation** - Standard steps to install dependencies.
7. **Usage** - How to run the project (look at scripts: ${projectData.scripts.join(', ')}).
8. **Project Structure** - Brief explanation of the main directories.
9. **Configuration** - Mention environment variables if applicable.
10. **Contributing** - Standard contribution guidelines.
11. **License** - Mention MIT or appropriate license.

Format in clean Markdown. Be specific to the project's actual stack and purpose.`;
}

export function buildSRSPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate a Software Requirements Specification (SRS) document for the project: "${projectData.name}".

**Project Information:**
- Description: ${projectData.description}
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Main Components: ${projectData.structure.join(', ')}

---

**Instructions:**
Create a detailed SRS document including:
1. **Introduction** - Purpose, scope, definitions, and references.
2. **Overall Description** - Product perspective, functions, user classes, operating environment, assumptions.
3. **Functional Requirements** - List specific functionalities based on the project type and dependencies. Use a table with ID, Description, Priority.
4. **Non-Functional Requirements** - Performance, security, usability, reliability requirements.
5. **System Constraints** - Technical or environmental limitations.
6. **Appendix** - Glossary of terms, references.

The document should follow IEEE 830 standards and be tailored to the project's specific nature.`;
}

export function buildWorkflowPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate workflow documentation and Mermaid diagrams for the project: "${projectData.name}".

**Project Information:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Structure: ${projectData.structure.join(', ')}
- Entry Points: ${projectData.entryPoints.join(', ')}

---

**Instructions:**
Document the logical flows within the system:
1. **User Workflows** - Primary ways users interact with the system.
2. **System Workflows** - Data flow between components.
3. **Error Handling** - How the system handles common failure points.
4. **Visual Diagrams** - Include Mermaid.js diagrams for key processes (e.g., sequence diagrams or flowcharts).

Analyze the project structure and dependencies to infer the most likely workflows.`;
}

export function buildTestCasesPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate a comprehensive test case document for the project: "${projectData.name}".

**Project Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Scripts: ${projectData.scripts.join(', ')}
- Dependencies: ${projectData.dependencies.slice(0, 15).join(', ')}

---

**Instructions:**
Define a testing strategy and specific test cases:
1. **Unit Tests** - For core logic and utilities.
2. **Integration Tests** - For component interactions (e.g., API to Database).
3. **End-to-End Tests** - For primary user journeys.
4. **Test Table** - Include ID, Description, Prerequisites, Steps, and Expected Result for at least 5-10 key test cases.

Focus on the most critical parts of the project based on its structure and dependencies.`;
}

export function buildArchitecturePrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate architecture documentation for the project: "${projectData.name}".

**Project Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Structure: ${projectData.structure.join(', ')}
- Entry Points: ${projectData.entryPoints.join(', ')}
- Language: ${projectData.techStack.language}

---

**Instructions:**
Create a professional architecture document:
1. **System Overview** - High-level description of the architecture (e.g., Monolithic, Microservices, Layered).
2. **Component Breakdown** - Explain the purpose and responsibilities of each main directory/component.
3. **Data Flow** - How data moves through the system.
4. **Mermaid Diagram** - A high-level architecture diagram showing component interactions.
5. **Tech Decisions** - Rationale for the chosen tech stack based on project goals.

Ensure the architecture description matches the actual file structure provided.`;
}

export function buildApiDocsPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate comprehensive API documentation for the project: "${projectData.name}".

**Project Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Structure: ${projectData.structure.join(', ')}
- Entry Points: ${projectData.entryPoints.join(', ')}

---

**Instructions:**
Create professional API documentation including:
1. **API Overview** - Base URL, authentication method, response format.
2. **Endpoints** - List all endpoints with method, path, description, request/response examples.
3. **Request/Response Examples** - JSON samples for each endpoint.
4. **Error Codes** - Common error codes and their meanings.
5. **Rate Limiting** - If applicable, mention rate limits.
6. **Authentication** - How to authenticate requests.

Analyze the project structure to infer API endpoints (look for routes/, controllers/, api/ folders).`;
}

export function buildSetupPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate a comprehensive setup guide for the project: "${projectData.name}".

**Project Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Dependencies: ${projectData.dependencies.slice(0, 20).join(', ')}
- Scripts: ${projectData.scripts.join(', ')}

---

**Instructions:**
Create a detailed setup guide including:
1. **Prerequisites** - Required software, versions, and tools.
2. **Installation Steps** - Step-by-step installation process.
3. **Environment Configuration** - Environment variables and config files needed.
4. **Database Setup** - If applicable, database installation and seeding.
5. **Running the Project** - Commands to start development and production modes.
6. **Common Issues** - Troubleshooting common setup problems.

Make the guide beginner-friendly with clear command examples.`;
}

export function buildDeployPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate a deployment guide for the project: "${projectData.name}".

**Project Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Scripts: ${projectData.scripts.join(', ')}
- Language: ${projectData.techStack.language}

---

**Instructions:**
Create a professional deployment guide including:
1. **Deployment Options** - List hosting platforms suitable for this stack (Vercel, Heroku, AWS, etc.).
2. **Build Process** - Steps to build for production.
3. **Environment Variables** - Production environment configuration.
4. **CI/CD Setup** - GitHub Actions or other CI/CD pipeline setup.
5. **Docker** - If applicable, Dockerfile and docker-compose setup.
6. **Post-Deployment** - Monitoring, logging, and health checks.

Tailor the guide to the specific tech stack used.`;
}

export function buildSecurityPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate security documentation for the project: "${projectData.name}".

**Project Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Dependencies: ${projectData.dependencies.slice(0, 15).join(', ')}

---

**Instructions:**
Create comprehensive security documentation including:
1. **Authentication** - How user authentication works (JWT, sessions, OAuth, etc.).
2. **Authorization** - Role-based access control and permissions.
3. **Data Protection** - Encryption, sensitive data handling, GDPR compliance.
4. **API Security** - Rate limiting, CORS, input validation.
5. **Security Best Practices** - Password policies, XSS/CSRF protection.
6. **Vulnerability Management** - How to report security issues.

Analyze dependencies to identify security-related packages and infer security practices.`;
}

export function buildRequirementsPrompt(projectData: ProjectData): string {
  return `${SYSTEM_PREFIX}

Generate a requirements matrix for the project: "${projectData.name}".

**Project Context:**
- Description: ${projectData.description}
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Structure: ${projectData.structure.join(', ')}

---

**Instructions:**
Create a detailed requirements matrix including:
1. **Functional Requirements** - Table with ID, Description, Priority, Status, Module.
2. **Non-Functional Requirements** - Performance, security, usability requirements.
3. **Technical Requirements** - System dependencies and constraints.
4. **Feature-Module Mapping** - Which features map to which code modules.
5. **Traceability Matrix** - Requirements to test cases mapping.

Use tables for clear visualization. Prioritize requirements as High/Medium/Low.`;
}

const SHARED_MERMAID_STYLES = `
    %% Global Styling
    classDef default fill:#ffffff,stroke:#333333,stroke-width:1px;
    classDef container fill:#f9f9f9,stroke:#cccccc,stroke-width:1px,stroke-dasharray: 5 5,rx:5,ry:5;
    classDef service fill:#e3f2fd,stroke:#2196f3,stroke-width:1px,rx:5,ry:5;
    classDef storage fill:#f1f8e9,stroke:#4caf50,stroke-width:1px;
    classDef external fill:#ffebee,stroke:#f44336,stroke-width:1px,rx:5,ry:5;
`;

export function buildDiagramPrompt(projectData: ProjectData, _options?: CLIOptions): string;
export function buildDiagramPrompt(projectData: ProjectData, diagramType?: string): string;
export function buildDiagramPrompt(
  projectData: ProjectData,
  diagramTypeOrOptions?: string | CLIOptions
): string {
  const isOptions = typeof diagramTypeOrOptions !== 'string';
  const diagramType = isOptions
    ? diagramTypeOrOptions?.diagramType || 'architecture'
    : diagramTypeOrOptions || 'architecture';

  const previousError = isOptions
    ? (diagramTypeOrOptions as CLIOptions & { previousError?: string })?.previousError
    : undefined;

  const isFlowchartLike = [
    'architecture',
    'workflow',
    'dfd',
    'component',
    'deployment',
    'dfd-level-1',
    'dfd-level-2',
    'dfd-level-3',
    'usecase',
  ].includes(diagramType);
  const isStateLike = ['activity', 'state'].includes(diagramType);
  const isSequence = diagramType === 'sequence';
  const isClass = diagramType === 'class';
  const isER = ['er', 'erd'].includes(diagramType);

  let rules = '';
  let stylingInstructions = '';
  let initDirective = '';

  if (isFlowchartLike) {
    if (diagramType === 'component') {
      rules = `
1. Syntax: \`flowchart TD\`.
2. Nodes:
   - Use \`subgraph "Name"\` for grouping (Do NOT use \`package\`).
   - Use \`[Component]\` syntax for nodes (e.g. \`id["Component Name"]\`).
   - IDs must be alphanumeric.
3. Edges: \`CompA -->|Label| CompB\`.
4. Style: Create a clean, modular layout.`;
    } else if (diagramType === 'deployment') {
      rules = `
1. Syntax: \`flowchart TD\`.
2. Nodes:
   - Use \`subgraph "Node Name"\` for environments.
   - IDs must be STRICTLY alphanumeric (e.g. \`Server1\`).
   - Edges: \`Server1 -- "Protocol" --> Server2\`.
3. Layout: Ensure clear separation of environments.`;
    } else if (diagramType === 'usecase') {
      rules = `
1. Syntax: \`flowchart TD\`.
2. **STRICTLY** DO NOT use \`usecaseDiagram\`. Use \`flowchart TD\`.
3. Actors: Use \`id([Actor Name])\` shape.
4. Cases: Use \`id((Use Case Name))\` shape.
5. Relationships: \`Actor --> Case\`.
6. Grouping: Use \`subgraph SystemID ["System Name"]\` (Valid Alphanumeric ID).
7. Comments: Use \`%%\`. Place comments on their OWN LINE.
8. LABELS: Always quote labels inside shapes.`;
    } else {
      rules = `
1. Syntax: \`flowchart TD\`.
2. Nodes: Simple alphanumeric IDs quoted if needed (e.g. \`id["Label"]\`).
3. Edges: \`A -->|Label| B\`.
4. Grouping: Use \`subgraph GroupID ["Title"]\` (Valid Alphanumeric ID required).`;
    }

    stylingInstructions = `
4. MANDATORY STYLING:
   - Copy this EXACTLY inside the flowchart:
   ${SHARED_MERMAID_STYLES}
   - Apply classes using \`:::\` ONLY for nodes (e.g. \`node:::service\`).
   - FOR SUBGRAPHS: Do NOT use \`:::\` on the subgraph line. Use \`class SubgraphID container\` at the end.
   - Classes to use:
     - \`service\` for Logic/Compute/Actors/Components.
     - \`storage\` for Database/Files/Artifacts.
     - \`external\` for Third-party/End Users.
     - \`container\` for Subgraphs/Packages.`;
  } else if (isStateLike) {
    rules = `
1. Syntax: \`stateDiagram-v2\`.
2. States: Use readable descriptions or IDs.
3. Transitions: \`State1 --> State2 : Description\`.`;
    stylingInstructions = `
4. STYLING:
   - You MAY use \`classDef\` if supported, but prioritize valid syntax.`;
  } else if (isSequence) {
    rules = `
1. Syntax: \`sequenceDiagram\`.
2. Participants: \`participant A as "Actor"\`.
3. Messages: \`A->>B: Message\`.`;
    stylingInstructions = `
4. STYLING: Do NOT use \`classDef\`. Use standard sequence diagram syntax only.`;
  } else if (isClass) {
    rules = `
1. Syntax: \`classDiagram\`.
2. Classes: \`class ClassName { +Method() }\`.
3. Relations: \`ClassA --|> ClassB\`.`;
    stylingInstructions = `
4. STYLING: Do NOT use \`classDef\` or \`:::\` syntax.`;
  } else if (isER) {
    initDirective = `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'primaryTextColor': '#000000', 'lineColor': '#000000', 'textColor': '#000000', 'attributeBackgroundOdd': '#f0f0f0', 'attributeBackgroundEven': '#e0e0e0' }}}%%`;

    rules = `
1. Syntax: \`erDiagram\`.
2. Entities: \`ENTITY { type name }\` (e.g., \`USER { int id string name }\`).
3. Relations: \`ENTITY ||--o{ OTHER : label\`.
4. **CONTENT**: You MUST list significant attributes with types.
   - Mark Primary Keys with \`PK\` and Foreign Keys with \`FK\`.
5. Layout: Ensure related entities are grouped.`;
    stylingInstructions = `
4. STYLING:
   - Do NOT use \`classDef\`.
   - The theme is handled by the init directive (Already Included).`;
  } else {
    rules = `1. Syntax: \`flowchart TD\`.`;
  }

  const errorFeedback = previousError
    ? `\n**PREVIOUS ATTEMPT ERROR:**\nYour previous output had this error: "${previousError}".\nPlease fix this issue in your new response.\n`
    : '';

  return `${SYSTEM_PREFIX}

Generate a Mermaid.js diagram code for the project: "${projectData.name}".

**Diagram Type:** ${diagramType.toUpperCase()}
**Context:**
- Tech Stack:
${formatTechStack(projectData.techStack)}
- Structure: ${projectData.structure.join(', ')}
${errorFeedback}
**CRITICAL OUTPUT RULES:**
1. **Raw Code Only**: Return ONLY the Mermaid code. No markdown blocks, no \`\`\` wrappers.
2. **Valid Syntax**: Ensure strictly valid syntax for **${diagramType}**.
${rules}
${stylingInstructions}
3. **Content**:
   - Use the provided project structure and tech stack to infer nodes/components.
   - Keep labels concise.
4. **Init Directive**:
   - If provided here, include it at the VERY TOP of the file:
   ${initDirective}
`;
}

export const DIAGRAM_STYLES = SHARED_MERMAID_STYLES;
