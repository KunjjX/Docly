"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    Terminal,
    Search,
    Moon,
    Sun,
    Menu,
    Github,
} from "lucide-react";
import { SearchModal } from "./search-modal";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Docs", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Blog", href: "#" },
];

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <nav className="fixed w-full z-50 top-0 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-8">
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-bold text-xl tracking-tight"
                            >
                                <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <Terminal className="w-4 h-4" />
                                </span>
                                Docly
                            </Link>

                            {/* Desktop Links */}
                            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--subtext)]">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-md text-sm text-[var(--subtext)] hover:border-primary/50 transition-colors w-64"
                            >
                                <Search className="w-4 h-4 shrink-0" />
                                <span className="flex-1 text-left opacity-50">
                                    Search documentation...
                                </span>
                                <kbd className="border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono bg-[var(--background)]">
                                    ⌘K
                                </kbd>
                            </button>

                            {/* GitHub */}
                            <a
                                href="https://github.com/KunjjX/Docly"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[var(--subtext)] hover:text-primary transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>

                            {/* Theme Toggle */}
                            {mounted && (
                                <button
                                    onClick={() =>
                                        setTheme(theme === "dark" ? "light" : "dark")
                                    }
                                    className="p-2 rounded-full text-[var(--subtext)] hover:bg-[var(--surface)] transition-colors"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-4 h-4" />
                                    ) : (
                                        <Moon className="w-4 h-4" />
                                    )}
                                </button>
                            )}

                            {/* CTA */}
                            <Link
                                href="/docs"
                                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover transition-colors shadow-[0_0_15px_-3px_var(--color-primary-glow)]"
                            >
                                Get Started
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden p-2 text-[var(--subtext)] hover:text-[var(--foreground)]"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
            <MobileMenu
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </>
    );
}
