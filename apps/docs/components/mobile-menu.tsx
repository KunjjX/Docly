"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Search, ExternalLink } from "lucide-react";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

const menuLinks = [
    { label: "Features", href: "/#features" },
    { label: "Documentation", href: "/docs", highlight: true },
    { label: "Changelog", href: "/changelog" },
    { label: "GitHub", href: "https://github.com/KunjjX/Docly", external: true },
    { label: "npm", href: "https://www.npmjs.com/package/docly", external: true },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[90] md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="absolute right-0 top-0 bottom-0 w-[80vw] max-w-sm bg-[var(--background)] border-l border-[var(--border)] shadow-2xl flex flex-col animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                    <span className="font-bold text-lg flex items-center gap-2">
                        <span className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-white text-xs">
                            D
                        </span>
                        Docly
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 text-[var(--subtext)] hover:text-[var(--foreground)]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Links */}
                <div className="flex-1 p-6 space-y-1">
                    {menuLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={onClose}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className={`block py-3 text-xl font-semibold transition-colors ${link.highlight
                                    ? "text-primary"
                                    : "text-[var(--foreground)] hover:text-primary"
                                }`}
                        >
                            {link.label}
                            {link.external && (
                                <ExternalLink className="inline w-4 h-4 ml-2 opacity-50" />
                            )}
                            {link.highlight && (
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-2 align-middle" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Bottom */}
                <div className="p-4 border-t border-[var(--border)] space-y-3">
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--subtext)]">
                        <Search className="w-4 h-4" />
                        Search Documentation...
                    </button>
                    <Link
                        href="/docs"
                        onClick={onClose}
                        className="block w-full text-center px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Get Started →
                    </Link>
                    <div className="flex items-center justify-between text-xs text-[var(--subtext)] pt-2">
                        <span>v2.4.0</span>
                        <div className="flex gap-3">
                            <Link href="#" className="hover:text-primary">Terms</Link>
                            <Link href="#" className="hover:text-primary">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
