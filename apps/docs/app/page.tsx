import Link from "next/link";
import {
  Bot,
  Zap,
  Globe,
  Search,
  Palette,
  Lock,
  CheckCircle,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import { TrustedBy } from "@/components/trusted-by";

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Analysis",
    description:
      "Our LLM engine reads your code comments, types, and structure to generate human-readable explanations automatically.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Updates",
    description:
      "Docs stay in sync with your PRs. Changes in code are instantly reflected in your documentation site.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-Language",
    description:
      "Supports TypeScript, Python, Go, Rust, and 20+ other languages out of the box with zero configuration.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Semantic Search",
    description:
      "Built-in Algolia-powered search allows your users to find exactly what they need in milliseconds.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Customizable Theme",
    description:
      "Match your brand perfectly. Use Tailwind CSS to style your documentation portal exactly how you want it.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Private Docs",
    description:
      "Host internal documentation securely with SSO integration, IP allowlisting, and granular access controls.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium text-[var(--subtext)]">
              New: Version 2.0 is now available
            </span>
            <ArrowRight className="w-3 h-3 text-[var(--subtext)]" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            AI-Powered Documentation Generator for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Developers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-[var(--subtext)] mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Stop writing docs manually. Docly analyzes your codebase and
            generates beautiful, comprehensive documentation in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover md:text-lg transition-all shadow-[0_0_20px_-5px_var(--color-primary-glow)] hover:shadow-glow-strong"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--border)] text-base font-medium rounded-md bg-[var(--background)] hover:bg-[var(--surface)] md:text-lg transition-colors"
            >
              View Documentation
            </Link>
          </div>

          {/* Terminal Demo */}
          <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-[var(--border)] dark:border-[#333] bg-[#0a0a0a] animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-[#111] border-b border-[#333]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-xs text-[#888] font-mono opacity-60">
                terminal
              </div>
            </div>
            {/* Terminal Body */}
            <div className="p-6 text-left font-mono text-sm sm:text-base bg-black/50 backdrop-blur-sm text-white">
              <div className="flex items-center gap-2">
                <span className="text-primary">➜</span>
                <span className="text-blue-300">~</span>
                <span>npm install -g docly-cli</span>
              </div>
              <div className="mt-2 text-[#888]">
                <span className="text-success">✔</span> Installed docly-cli
                v2.0.4 in 1.2s
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-primary">➜</span>
                <span className="text-blue-300">~</span>
                <span>docly init</span>
              </div>
              <div className="mt-2 text-[#888]">
                Scanning project structure...
                <br />
                Found 42 source files.
                <br />
                Generating documentation site...
              </div>
              <div className="mt-2 text-success">
                Done! Documentation is live at http://localhost:3000
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          </div>

          {/* Trusted By */}
          <div className="mt-16 flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-[var(--subtext)]">
              Trusted by engineering teams at
            </p>
            <TrustedBy />
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section
        id="features"
        className="py-24 bg-[var(--surface)] border-t border-[var(--border)] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for perfect docs
            </h2>
            <p className="mt-4 text-lg text-[var(--subtext)]">
              Built for speed and accuracy. Let AI handle the boring parts while
              you focus on writing code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Code-to-Docs Demo ─── */}
      <section className="py-24 bg-[var(--background)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                From comments to content in one click.
              </h2>
              <p className="text-lg text-[var(--subtext)] mb-8">
                Just write standard JSDoc or comments in your code. Docly parses
                them, enriches them with AI context, and builds a static site.
                No markdown files to maintain separately.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Automatic type inference from TypeScript",
                  "Generates interactive playground for API endpoints",
                  "Validates examples against your codebase",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-[var(--subtext)]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/docs"
                className="text-primary hover:text-blue-400 font-medium inline-flex items-center gap-1"
              >
                Read the technical deep dive
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Code Example */}
            <div className="lg:w-1/2 w-full">
              {/* Source Code Card */}
              <div className="relative rounded-xl border border-[var(--border)] dark:border-[#333] bg-[#0d1117] shadow-2xl overflow-hidden">
                <div className="flex border-b border-[#333] bg-[#161b22]">
                  <div className="px-4 py-2 text-xs text-white border-r border-[#333] bg-[#0d1117]">
                    example.ts
                  </div>
                  <div className="px-4 py-2 text-xs text-[#888]">
                    output.mdx
                  </div>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm leading-6">
                    <span className="text-[#ff7b72]">export</span>{" "}
                    <span className="text-[#ff7b72]">async</span>{" "}
                    <span className="text-[#ff7b72]">function</span>{" "}
                    <span className="text-[#d2a8ff]">createUser</span>(
                    {"\n"}
                    {"  "}
                    <span className="text-[#79c0ff]">email</span>:{" "}
                    <span className="text-[#79c0ff]">string</span>
                    {"\n"}): <span className="text-[#79c0ff]">Promise</span>
                    {"<"}
                    <span className="text-[#79c0ff]">User</span>
                    {">"} {"{"}
                    {"\n"}
                    {"  "}
                    <span className="text-[#8b949e]">
                      {"// Implementation..."}
                    </span>
                    {"\n"}
                    {"  "}
                    <span className="text-[#ff7b72]">return</span> db.
                    <span className="text-[#d2a8ff]">insert</span>({"{"} email{" "}
                    {"}"});{"\n"}
                    {"}"}
                  </pre>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-4 relative z-10">
                <div className="bg-primary rounded-full p-2 shadow-glow">
                  <ArrowDown className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Output Card */}
              <div className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl overflow-hidden mt-4 p-6">
                <h3 className="text-lg font-bold">createUser</h3>
                <p className="text-sm text-[var(--subtext)] mt-1">
                  Creates a new user in the database.
                </p>
                <div className="mt-4">
                  <span className="text-xs font-mono bg-[var(--background)] border border-[var(--border)] px-2 py-1 rounded">
                    POST /users
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--surface)]" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Ready to upgrade your documentation?
          </h2>
          <p className="text-xl text-[var(--subtext)] mb-10 max-w-2xl mx-auto">
            Join 10,000+ developers using Docly to maintain world-class
            documentation with zero overhead.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover md:text-lg transition-all shadow-glow"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
