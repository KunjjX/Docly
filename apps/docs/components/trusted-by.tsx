"use client";
import React, { useEffect, useState } from "react";

import { Beacon } from "@/components/ui/svgs/beacon";
import { Bolt } from "@/components/ui/svgs/bolt";
import { Cisco } from "@/components/ui/svgs/cisco";
import { Hulu } from "@/components/ui/svgs/hulu";
import { Supabase } from "@/components/ui/svgs/supabase";
import { AnimatePresence, motion } from "motion/react";
import { VercelFull } from "@/components/ui/svgs/vercel";
import { Spotify } from "@/components/ui/svgs/spotify";

const aiLogos: React.ReactNode[] = [
    <Bolt key="bolt" className="h-9 w-auto" />,
    <Beacon key="beacon" className="h-9 w-auto" />,
    <Hulu key="hulu" className="h-9 w-auto" />,
];

const hostingLogos: React.ReactNode[] = [
    <Supabase key="supabase" className="h-10 w-auto" />,
    <Spotify key="spotify" className="h-10 w-auto" />,
    <VercelFull key="vercel" className="h-9 w-auto" />,
];

const paymentsLogos: React.ReactNode[] = [
    <Hulu key="hulu" className="h-9 w-auto" />,
    <VercelFull key="vercel" className="h-9 w-auto" />,
    <Spotify key="spotify" className="h-10 w-auto" />,
];

const streamingLogos: React.ReactNode[] = [
    <Cisco key="cisco" className="h-11 w-auto" />,
    <Hulu key="hulu" className="h-9 w-auto" />,
    <Spotify key="spotify" className="h-10 w-auto" />,
];

type LogoGroup = "ai" | "hosting" | "payments" | "streaming";

const logos: { [key in LogoGroup]: React.ReactNode[] } = {
    ai: aiLogos,
    hosting: hostingLogos,
    payments: paymentsLogos,
    streaming: streamingLogos,
};

export function TrustedBy() {
    const [currentGroup, setCurrentGroup] = useState<LogoGroup>("ai");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGroup((prev) => {
                const groups = Object.keys(logos) as LogoGroup[];
                const currentIndex = groups.indexOf(prev);
                const nextIndex = (currentIndex + 1) % groups.length;
                return groups[nextIndex];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-3 items-center gap-8 md:gap-12 h-20">
                <AnimatePresence initial={false} mode="popLayout">
                    {logos[currentGroup].map((logo, i) => (
                        <motion.div
                            key={`${currentGroup}-${i}`}
                            className="flex items-center justify-center text-[var(--subtext)] hover:text-[var(--foreground)] transition-colors opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                                delay: i * 0.1,
                            }}
                        >
                            {logo}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
