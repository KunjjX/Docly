"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsSidebar } from "@/lib/docs";
import {
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Search,
    Github,
    ExternalLink,
} from "lucide-react";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const currentSlug = pathname.split("/").pop() || "introduction";

    return (
        <div className="pt-16" style={{ paddingTop: "4rem" }}>
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed bottom-6 right-6 z-50 md:hidden bg-primary text-white p-3 rounded-full shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>

            <div className="max-w-[90rem] mx-auto flex">
                {/* Sidebar Overlay (mobile) */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
            fixed top-16 bottom-0 z-40 w-72 bg-[var(--background)] border-r border-[var(--border)] overflow-y-auto
            transition-transform duration-200 md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
                >
                    {/* Mobile close */}
                    <div className="flex items-center justify-end p-2 md:hidden">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 text-[var(--subtext)]"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="px-4 py-6 space-y-8">
                        {docsSidebar.map((section) => (
                            <div key={section.category}>
                                <h4 className="text-xs font-bold tracking-wider text-[var(--subtext)] uppercase mb-3">
                                    {section.category}
                                </h4>
                                <ul className="space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = currentSlug === item.slug;
                                        return (
                                            <li key={item.slug}>
                                                <Link
                                                    href={`/docs/${item.slug}`}
                                                    onClick={() => setSidebarOpen(false)}
                                                    className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive
                                                        ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                                                        : "text-[var(--subtext)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                                                        }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main content area */}
                <div className="flex-1 min-w-0">{children}</div>
            </div>
        </div>
    );
}
