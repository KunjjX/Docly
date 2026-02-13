import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Changelog — Docly",
    description:
        "Latest updates and improvements to Docly. We're constantly improving our AI models to help you generate better documentation faster.",
};

type BadgeType = "added" | "improved" | "fixed";

interface ChangeItem {
    badge: BadgeType;
    text: string;
    bold?: string;
}

interface Release {
    date: string;
    version: string;
    title: string;
    description?: string;
    latest?: boolean;
    changes: ChangeItem[];
    terminal?: {
        lines: string[];
    };
}

const badgeStyles: Record<BadgeType, string> = {
    added: "bg-success/20 text-success border-success/30",
    improved: "bg-primary/20 text-primary border-primary/30",
    fixed: "bg-error/20 text-error border-error/30",
};

const releases: Release[] = [
    {
        date: "Oct 24, 2023",
        version: "v2.1.0",
        title: "AI Context Awareness & Faster Generation",
        description:
            "This update introduces a major overhaul to our context engine. Docly now understands your project structure better by analyzing imports and dependencies before generating documentation. We've also optimized the inference pipeline.",
        latest: true,
        changes: [
            {
                badge: "added",
                text: "Support for Python virtual environments (`venv`, `pipenv`, `poetry`) auto-detection.",
            },
            {
                badge: "added",
                text: "New CLI flag `--dry-run` to preview changes without writing to disk.",
            },
            {
                badge: "improved",
                text: "on large codebases.",
                bold: "Generation speed increased by 40%",
            },
            {
                badge: "fixed",
                text: "Fixed an issue where Markdown tables were sometimes malformed in the output.",
            },
        ],
    },
    {
        date: "Oct 12, 2023",
        version: "v2.0.5",
        title: "Stability Improvements & Windows Support",
        description:
            "A maintenance release focused on squashing bugs reported by our Windows user base.",
        changes: [
            {
                badge: "fixed",
                text: "Critical: CLI crash on Windows terminals when using PowerShell due to encoding issues.",
            },
            {
                badge: "fixed",
                text: "Path resolution errors for nested directories in monorepos.",
            },
            {
                badge: "improved",
                text: "Better error messages when API rate limits are exceeded.",
            },
        ],
    },
    {
        date: "Sep 28, 2023",
        version: "v2.0.0",
        title: "Major Release: Docly Cloud Sync",
        description:
            "We're thrilled to announce Docly 2.0! This release introduces Cloud Sync, allowing you to host your documentation directly on Docly's platform with a single command.",
        changes: [
            {
                badge: "added",
                text: "Deploy docs instantly with `docly deploy`.",
                bold: "Cloud Sync:",
            },
            {
                badge: "added",
                text: "Team collaboration features for Enterprise plans.",
            },
            {
                badge: "improved",
                text: "Completely redesigned CLI output with colorful progress bars.",
            },
        ],
        terminal: {
            lines: [
                "$ docly deploy --public",
                "> Analyzing project...",
                "> Generating docs...",
                "> Deploying to https://docly.dev/u/project-alpha",
                "✔ Published successfully!",
            ],
        },
    },
];

function Badge({ type }: { type: BadgeType }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${badgeStyles[type]}`}
        >
            {type}
        </span>
    );
}

export default function ChangelogPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        v2.1.0 is now live
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                            Change
                        </span>
                        log
                    </h1>
                    <p className="text-lg text-[var(--subtext)] max-w-xl mb-8">
                        Latest updates and improvements to Docly. We&apos;re constantly
                        improving our AI models to help you generate better documentation
                        faster.
                    </p>
                    {/* Email Subscribe */}
                    <div className="flex gap-2 max-w-md">
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="flex-1 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-[var(--subtext)]/50"
                        />
                        <button className="px-5 py-2 bg-[var(--foreground)] text-[var(--background)] font-medium text-sm rounded-md hover:opacity-90 transition-opacity">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[7.5rem] sm:left-[9rem] top-0 bottom-0 w-px bg-[var(--border)] hidden sm:block" />

                    {releases.map((release, idx) => (
                        <div key={release.version} className="relative mb-20">
                            {/* Date & Dot */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-[6.5rem] sm:w-[8rem] text-right shrink-0">
                                    <time className="text-sm font-mono text-[var(--subtext)]">
                                        {release.date}
                                    </time>
                                </div>
                                <div className="relative z-10 w-3 h-3 rounded-full bg-primary border-2 border-[var(--background)] hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border)]">
                                        {release.version}
                                    </span>
                                    {release.latest && (
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                            Latest Release
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="sm:ml-[10rem] sm:pl-4">
                                <h2 className="text-2xl font-bold mb-3">{release.title}</h2>
                                {release.description && (
                                    <p className="text-[var(--subtext)] leading-relaxed mb-6">
                                        {release.description}
                                    </p>
                                )}

                                {/* Terminal */}
                                {release.terminal && (
                                    <div className="my-6 rounded-lg overflow-hidden border border-[var(--border)] dark:border-[#333] bg-[#0a0a0a]">
                                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#333] bg-[#161b22]">
                                            <span className="text-xs text-[#888] font-mono">
                                                Terminal
                                            </span>
                                            <div className="flex space-x-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-error" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-success" />
                                            </div>
                                        </div>
                                        <pre className="p-4 text-sm font-mono leading-6 text-[#e6edf3]">
                                            {release.terminal.lines.map((line, i) => (
                                                <div key={i}>
                                                    {line.startsWith("$") ? (
                                                        <>
                                                            <span className="text-[#888]">$ </span>
                                                            <span className="text-white">
                                                                {line.slice(2)}
                                                            </span>
                                                        </>
                                                    ) : line.startsWith(">") ? (
                                                        <span className="text-[#888]">{line}</span>
                                                    ) : line.startsWith("✔") ? (
                                                        <span className="text-success">{line}</span>
                                                    ) : (
                                                        <span>{line}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </pre>
                                    </div>
                                )}

                                {/* Changes */}
                                <div className="space-y-3">
                                    {release.changes.map((change, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <Badge type={change.badge} />
                                            <p className="text-sm text-[var(--subtext)] leading-relaxed pt-0.5">
                                                {change.bold && (
                                                    <span className="font-bold text-[var(--foreground)]">
                                                        {change.bold}{" "}
                                                    </span>
                                                )}
                                                {change.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-8">
                    <button className="flex items-center gap-2 px-6 py-2.5 border border-[var(--border)] rounded-full text-sm text-[var(--subtext)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-colors">
                        Load older releases
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
