export interface DocPage {
    slug: string;
    title: string;
    description: string;
    category: string;
    content: DocSection[];
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
}

export interface DocSection {
    type: "heading" | "paragraph" | "code" | "callout" | "list";
    content: string;
    language?: string;
    calloutType?: "info" | "warning" | "tip";
    calloutTitle?: string;
    items?: string[];
    id?: string;
}

export const docsSidebar = [
    {
        category: "GETTING STARTED",
        items: [
            { slug: "introduction", title: "Introduction" },
            { slug: "installation", title: "Installation" },
            { slug: "project-structure", title: "Project Structure" },
            { slug: "cli-commands", title: "CLI Commands" },
        ],
    },
    {
        category: "CORE CONCEPTS",
        items: [
            { slug: "architecture", title: "Architecture" },
            { slug: "auto-generation", title: "Auto-Generation" },
            { slug: "markdown-extensions", title: "Markdown Extensions" },
        ],
    },
    {
        category: "GUIDES",
        items: [
            { slug: "custom-themes", title: "Custom Themes" },
            { slug: "deploying-to-vercel", title: "Deploying to Vercel" },
            { slug: "github-actions", title: "Integration with GitHub Actions" },
        ],
    },
    {
        category: "REFERENCE",
        items: [
            { slug: "configuration", title: "Configuration Options" },
            { slug: "plugin-api", title: "Plugin API" },
        ],
    },
];

const allSlugs = docsSidebar.flatMap((s) => s.items);

function getNav(slug: string) {
    const idx = allSlugs.findIndex((s) => s.slug === slug);
    return {
        prev: idx > 0 ? allSlugs[idx - 1] : undefined,
        next: idx < allSlugs.length - 1 ? allSlugs[idx + 1] : undefined,
    };
}

const pages: Record<string, DocPage> = {
    introduction: {
        slug: "introduction",
        title: "Introduction",
        description:
            "Welcome to Docly — the AI-powered documentation generator for modern engineering teams.",
        category: "Getting Started",
        ...getNav("introduction"),
        content: [
            {
                type: "paragraph",
                content:
                    "Docly is a next-generation documentation platform that uses AI to analyze your codebase and generate beautiful, comprehensive documentation automatically. It reads your code comments, types, and structure to produce human-readable explanations that stay in sync with your code.",
            },
            { type: "heading", content: "Why Docly?", id: "why-docly" },
            {
                type: "paragraph",
                content:
                    "Most documentation tools require you to write and maintain markdown files separately from your code. Docly takes a different approach — it treats your code as the single source of truth.",
            },
            {
                type: "list",
                content: "",
                items: [
                    "Zero-config setup for most projects",
                    "Supports 20+ programming languages",
                    "AI-powered explanations from code comments and types",
                    "Built-in search powered by Algolia",
                    "Customizable themes with Tailwind CSS",
                    "Deploy anywhere — Vercel, Netlify, GitHub Pages",
                ],
            },
            { type: "heading", content: "Quick Start", id: "quick-start" },
            {
                type: "code",
                content: "npm install -g docly-cli\ndocly init\ndocly dev",
                language: "bash",
            },
            {
                type: "callout",
                content:
                    "Docly works best with TypeScript projects that have JSDoc comments, but it supports plain JavaScript and many other languages too.",
                calloutType: "tip",
                calloutTitle: "Pro Tip",
            },
        ],
    },
    installation: {
        slug: "installation",
        title: "Installation",
        description:
            "Get started with Docly by installing the CLI tool globally or adding it to your project.",
        category: "Getting Started",
        ...getNav("installation"),
        content: [
            {
                type: "paragraph",
                content:
                    "Get started with Docly by installing the CLI tool globally or adding it to your project. Docly works out of the box with zero configuration for most projects.",
            },
            { type: "heading", content: "Prerequisites", id: "prerequisites" },
            {
                type: "list",
                content: "",
                items: [
                    "Node.js 18.0.0 or later",
                    "macOS, Windows (including WSL), and Linux are supported",
                ],
            },
            {
                type: "heading",
                content: "Automatic Installation",
                id: "automatic-installation",
            },
            {
                type: "paragraph",
                content:
                    'We recommend creating a new Docly app using `create-docly-app`, which sets up everything automatically for you.',
            },
            {
                type: "code",
                content:
                    "npx create-docly-app@latest\n\n# or using yarn\nyarn create docly-app\n\n# or using pnpm\npnpm create docly-app",
                language: "bash",
            },
            {
                type: "callout",
                content:
                    "You'll be asked a few questions about your project preferences, like whether you want to use TypeScript or include a blog section.",
                calloutType: "info",
                calloutTitle: "Interactive Setup",
            },
            {
                type: "heading",
                content: "Manual Installation",
                id: "manual-installation",
            },
            {
                type: "paragraph",
                content:
                    "If you prefer to add Docly to an existing project manually, install the package as a dependency:",
            },
            {
                type: "code",
                content: "npm install docly --save-dev",
                language: "bash",
            },
            {
                type: "paragraph",
                content:
                    "Then, add the following scripts to your `package.json`:",
            },
            {
                type: "code",
                content: `{
  "scripts": {
    "docs:dev": "docly dev",
    "docs:build": "docly build",
    "docs:preview": "docly preview"
  }
}`,
                language: "json",
            },
            { type: "heading", content: "Next Steps", id: "next-steps" },
            {
                type: "paragraph",
                content:
                    "Now that you've installed Docly, you can start creating your documentation. Check out the Project Structure and Configuration guides to get going.",
            },
        ],
    },
};

// Generate placeholder pages for remaining slugs
for (const section of docsSidebar) {
    for (const item of section.items) {
        if (!pages[item.slug]) {
            pages[item.slug] = {
                slug: item.slug,
                title: item.title,
                description: `Learn about ${item.title.toLowerCase()} in Docly.`,
                category: section.category,
                ...getNav(item.slug),
                content: [
                    {
                        type: "paragraph",
                        content: `This page covers ${item.title.toLowerCase()}. Documentation content is coming soon.`,
                    },
                    {
                        type: "callout",
                        content:
                            "This page is under construction. Check back soon for full documentation.",
                        calloutType: "info",
                        calloutTitle: "Coming Soon",
                    },
                ],
            };
        }
    }
}

export function getDocPage(slug: string): DocPage | undefined {
    return pages[slug];
}

export function getAllDocSlugs(): string[] {
    return Object.keys(pages);
}
