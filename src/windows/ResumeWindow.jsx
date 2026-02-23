import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/resumeData";

export default function ResumeWindow() {
    const [downloading, setDownloading] = useState(false);

    const parseUrl = (value) => {
        try {
            return value ? new URL(value) : null;
        } catch {
            return null;
        }
    };

    const githubUrl = parseUrl(personalInfo.github);
    const linkedinUrl = parseUrl(personalInfo.linkedin);
    const portfolioUrl = parseUrl(personalInfo.portfolio);

    const githubLabel = githubUrl
        ? `@${githubUrl.pathname.split("/").filter(Boolean)[0] || githubUrl.hostname}`
        : personalInfo.github;
    const linkedinLabel = linkedinUrl
        ? linkedinUrl.pathname.replace(/^\/+/, "")
        : personalInfo.linkedin;
    const portfolioLabel = portfolioUrl
        ? portfolioUrl.hostname.replace(/^www\./, "")
        : "Add portfolio URL";

    const stats = [
        { label: "Projects", value: String(personalInfo.systemStats.projects), icon: "🚀", color: "#5e81f4" },
        { label: "Coffees", value: personalInfo.systemStats.coffees, icon: "☕", color: "#10b981" },
        { label: "Experience", value: personalInfo.systemStats.uptime, icon: "💼", color: "#f59e0b" },
        { label: "GitHub", value: githubLabel, icon: "🐙", color: "#8b5cf6" },
    ];

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => setDownloading(false), 2000);
    };

    return (
        <div className="h-full overflow-auto p-6" style={{ color: "var(--os-text)" }}>
            {/* Hero Section */}
            <motion.div
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Avatar */}
                <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.04 }}
                >
                    <div
                        className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl font-bold"
                        style={{
                            background: "linear-gradient(135deg, rgba(94,129,244,0.25), rgba(139,92,246,0.25))",
                            border: "2px solid rgba(94,129,244,0.35)",
                            boxShadow: "0 0 30px rgba(94,129,244,0.2)",
                        }}
                    >
                        {personalInfo.name.charAt(0)}
                    </div>
                    {/* Online indicator */}
                    <div
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{
                            background: "#10b981",
                            borderColor: "var(--os-surface)",
                            boxShadow: "0 0 8px #10b981",
                        }}
                    >
                        <span className="text-[9px] text-white font-bold">✓</span>
                    </div>
                </motion.div>

                {/* Name & Info */}
                <div className="flex-1 text-center sm:text-left">
                    <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "var(--os-accent)" }}>
                        /usr/bin/maheshwar — Process Active
                    </div>
                    <h1 className="text-3xl font-black mb-1" style={{ color: "var(--os-text)" }}>
                        {personalInfo.name}
                    </h1>
                    <p className="text-base font-medium mb-2" style={{ color: "var(--os-accent)" }}>
                        {personalInfo.title}
                    </p>
                    <p className="text-sm mb-3 max-w-lg" style={{ color: "var(--os-text-dim)", lineHeight: 1.7 }}>
                        {personalInfo.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: "rgba(94,129,244,0.15)", color: "var(--os-accent)", border: "1px solid rgba(94,129,244,0.25)" }}>
                            📍 {personalInfo.location}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>
                            ✅ Open to Opportunities
                        </span>
                    </div>
                </div>

                {/* Download button */}
                <motion.button
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm"
                    style={{
                        background: downloading
                            ? "rgba(16,185,129,0.2)"
                            : "linear-gradient(135deg, #5e81f4, #8b5cf6)",
                        color: "white",
                        boxShadow: downloading ? "0 0 20px rgba(16,185,129,0.4)" : "0 4px 20px rgba(94,129,244,0.4)",
                        border: "none",
                        cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                >
                    {downloading ? (
                        <>
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            >
                                ↻
                            </motion.span>
                            Downloading...
                        </>
                    ) : (
                        <>📥 Download PDF</>
                    )}
                </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        className="glass-card rounded-xl p-4 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ y: -3, scale: 1.02 }}
                    >
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-xs" style={{ color: "var(--os-text-muted)" }}>{s.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Contact Links */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--os-text-muted)" }}>
                    — Contact Endpoints —
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                        { label: "Email", value: personalInfo.email, icon: "📧", href: `mailto:${personalInfo.email}` },
                        { label: "GitHub", value: githubLabel, icon: "🐙", href: personalInfo.github },
                        { label: "LinkedIn", value: linkedinLabel, icon: "🔗", href: personalInfo.linkedin },
                        { label: "Portfolio", value: portfolioLabel, icon: "🌐", href: personalInfo.portfolio },
                    ].filter((link) => Boolean(link.href)).map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                textDecoration: "none",
                                color: "var(--os-text)",
                            }}
                            whileHover={{
                                background: "rgba(94,129,244,0.08)",
                                borderColor: "rgba(94,129,244,0.25)",
                                x: 3,
                            }}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <div>
                                <div className="text-xs" style={{ color: "var(--os-text-muted)" }}>{link.label}</div>
                                <div className="text-sm font-medium">{link.value}</div>
                            </div>
                            <span className="ml-auto opacity-0 group-hover:opacity-100 text-xs" style={{ color: "var(--os-accent)" }}>
                                ↗
                            </span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
