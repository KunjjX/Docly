import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Bug,
    Info,
    AlertTriangle,
    Lightbulb,
    Copy,
} from "lucide-react";
import { getDocPage, getAllDocSlugs, type DocSection } from "@/lib/docs";

// Generate static params for all doc pages
export function generateStaticParams() {
    return getAllDocSlugs().map((slug) => ({ slug }));
}

// Generate metadata for each doc page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = getDocPage(slug);
    if (!page) return {};
    return {
        title: `${page.title} — Docly Docs`,
        description: page.description,
    };
}

function CalloutIcon({ type }: { type: string }) {
    switch (type) {
        case "warning":
            return <AlertTriangle className="w-4 h-4 text-warning" />;
        case "tip":
            return <Lightbulb className="w-4 h-4 text-success" />;
        default:
            return <Info className="w-4 h-4 text-primary" />;
    }
}

function CodeBlock({
    code,
    language,
}: {
    code: string;
    language?: string;
}) {
    return (
        <div className="my-6 rounded-lg overflow-hidden border border-[var(--border)] dark:border-[#333] bg-[#0a0a0a]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#333] bg-[#161b22]">
                <span className="text-xs text-[#888] font-mono">
                    {language || "Terminal"}
                </span>
                <button className="text-[#888] hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-6 text-[#e6edf3]">
                <code className="font-mono">{code}</code>
            </pre>
        </div>
    );
}

function Callout({
    section,
}: {
    section: DocSection;
}) {
    const bgMap: Record<string, string> = {
        info: "bg-primary/5 border-primary/30",
        warning: "bg-warning/5 border-warning/30",
        tip: "bg-success/5 border-success/30",
    };
    const type = section.calloutType || "info";
    return (
        <div
            className={`my-6 rounded-lg border-l-4 p-4 ${bgMap[type] || bgMap.info}`}
        >
            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                <CalloutIcon type={type} />
                {section.calloutTitle || "Note"}
            </div>
            <p className="text-sm text-[var(--subtext)] leading-relaxed">
                {section.content}
            </p>
        </div>
    );
}

function renderSection(section: DocSection, index: number) {
    switch (section.type) {
        case "heading":
            return (
                <h2
                    key={index}
                    id={section.id}
                    className="text-2xl font-bold mt-10 mb-4 scroll-mt-24"
                >
                    {section.content}
                </h2>
            );
        case "paragraph":
            return (
                <p
                    key={index}
                    className="text-[var(--subtext)] leading-7 mb-4"
                >
                    {section.content}
                </p>
            );
        case "code":
            return (
                <CodeBlock
                    key={index}
                    code={section.content}
                    language={section.language}
                />
            );
        case "callout":
            return <Callout key={index} section={section} />;
        case "list":
            return (
                <ul key={index} className="my-4 space-y-2 list-disc list-inside">
                    {section.items?.map((item, i) => (
                        <li key={i} className="text-[var(--subtext)] leading-7">
                            {item}
                        </li>
                    ))}
                </ul>
            );
        default:
            return null;
    }
}

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = getDocPage(slug);
    if (!page) notFound();

    // Extract headings for TOC
    const headings = page.content
        .filter((s) => s.type === "heading" && s.id)
        .map((s) => ({ id: s.id!, title: s.content }));

    return (
        <div className="flex">
            {/* Content */}
            <article className="flex-1 min-w-0 px-6 sm:px-8 lg:px-12 py-10 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[var(--subtext)] mb-6">
                    <Link href="/docs" className="hover:text-primary transition-colors">
                        Docs
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">{page.title}</span>
                </nav>

                {/* Title */}
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                    {page.title}
                </h1>
                <p className="text-lg text-[var(--subtext)] mb-8">
                    {page.description}
                </p>

                {/* Content Sections */}
                <div className="prose-docly">{page.content.map(renderSection)}</div>

                {/* Prev/Next Navigation */}
                <nav className="flex items-center justify-between mt-16 pt-8 border-t border-[var(--border)]">
                    {page.prev ? (
                        <Link
                            href={`/docs/${page.prev.slug}`}
                            className="group flex flex-col items-start"
                        >
                            <span className="text-xs text-[var(--subtext)] mb-1 uppercase tracking-wider">
                                Previous
                            </span>
                            <span className="flex items-center gap-1 text-primary group-hover:text-blue-400 font-medium transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                                {page.prev.title}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {page.next ? (
                        <Link
                            href={`/docs/${page.next.slug}`}
                            className="group flex flex-col items-end"
                        >
                            <span className="text-xs text-[var(--subtext)] mb-1 uppercase tracking-wider">
                                Next
                            </span>
                            <span className="flex items-center gap-1 text-primary group-hover:text-blue-400 font-medium transition-colors">
                                {page.next.title}
                                <ChevronRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </nav>
            </article>

            {/* Right Sidebar — TOC */}
            <aside className="hidden xl:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-8">
                {headings.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold tracking-wider text-[var(--subtext)] uppercase mb-4">
                            On This Page
                        </h4>
                        <ul className="space-y-2 border-l border-[var(--border)] pl-4">
                            {headings.map((h) => (
                                <li key={h.id}>
                                    <a
                                        href={`#${h.id}`}
                                        className="text-sm text-[var(--subtext)] hover:text-primary transition-colors block"
                                    >
                                        {h.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-8 space-y-3">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-[var(--subtext)] hover:text-[var(--foreground)] transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit this page on GitHub
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-[var(--subtext)] hover:text-[var(--foreground)] transition-colors"
                    >
                        <Bug className="w-3.5 h-3.5" />
                        Report an issue
                    </a>
                </div>
            </aside>
        </div>
    );
}
