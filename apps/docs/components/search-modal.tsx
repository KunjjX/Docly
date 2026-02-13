"use client";

import { useEffect, useRef } from "react";
import { Search, FileText, Settings, Code, MapPin, Layers, X } from "lucide-react";

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

const searchResults = [
    {
        category: "COMMANDS",
        items: [
            {
                icon: <Code className="w-4 h-4" />,
                title: "generate-docs",
                subtitle: "CLI › Basic Usage",
            },
            {
                icon: <Settings className="w-4 h-4" />,
                title: "update-config",
                subtitle: "CLI › Configuration",
            },
        ],
    },
    {
        category: "DOCUMENTATION",
        items: [
            {
                icon: <FileText className="w-4 h-4" />,
                title: "Getting Started with Docly",
                subtitle: "Documentation › Introduction",
            },
            {
                icon: <MapPin className="w-4 h-4" />,
                title: "AI Model Integration",
                subtitle: "Advanced › Models",
            },
            {
                icon: <Layers className="w-4 h-4" />,
                title: "REST API Reference",
                subtitle: "API › Endpoints",
            },
        ],
    },
];

export function SearchModal({ open, onClose }: SearchModalProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-xl mx-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border)]">
                    <Search className="w-5 h-5 text-[var(--subtext)]" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search documentation..."
                        className="flex-1 bg-transparent text-lg outline-none placeholder:text-[var(--subtext)]/50"
                    />
                    <button
                        onClick={onClose}
                        className="px-2 py-0.5 text-xs font-mono border border-[var(--border)] rounded bg-[var(--background)] text-[var(--subtext)]"
                    >
                        ESC
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto p-2">
                    {searchResults.map((group) => (
                        <div key={group.category} className="mb-2">
                            <p className="px-3 py-2 text-xs font-semibold tracking-wider text-[var(--subtext)] uppercase">
                                {group.category}
                            </p>
                            {group.items.map((item, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 text-left transition-colors group"
                                    onClick={onClose}
                                >
                                    <span className="text-[var(--subtext)] group-hover:text-primary transition-colors">
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="font-medium text-sm">{item.title}</p>
                                        <p className="text-xs text-[var(--subtext)]">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 px-4 py-3 border-t border-[var(--border)] text-xs text-[var(--subtext)]">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 border border-[var(--border)] rounded bg-[var(--background)] font-mono">↵</kbd>
                        to select
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 border border-[var(--border)] rounded bg-[var(--background)] font-mono">↑</kbd>
                        <kbd className="px-1.5 py-0.5 border border-[var(--border)] rounded bg-[var(--background)] font-mono">↓</kbd>
                        to navigate
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 border border-[var(--border)] rounded bg-[var(--background)] font-mono">esc</kbd>
                        to close
                    </span>
                </div>
            </div>
        </div>
    );
}
