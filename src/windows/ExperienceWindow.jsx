import React, { useState } from "react";
import { motion } from "framer-motion";
import { experience, education } from "../data/resumeData";

const statusConf = {
    running: { color: "#10b981", label: "RUNNING", icon: "▶" },
    terminated: { color: "#ef4444", label: "TERMINATED", icon: "■" },
    sleeping: { color: "#f59e0b", label: "SLEEPING", icon: "⏸" },
};

export default function ExperienceWindow() {
    const [expanded, setExpanded] = useState("EXP-001");
    const [activeTab, setActiveTab] = useState("experience");

    return (
        <div className="h-full flex flex-col" style={{ color: "var(--os-text)" }}>
            {/* Tabs */}
            <div
                className="flex border-b px-4"
                style={{ borderColor: "var(--os-border)", background: "rgba(255,255,255,0.02)" }}
            >
                {[
                    { id: "experience", label: "💼 Experience", count: experience.length },
                    { id: "education", label: "🎓 Education", count: education.length },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className="px-4 py-3 text-sm font-medium transition-all relative"
                        style={{
                            color: activeTab === tab.id ? "var(--os-accent)" : "var(--os-text-muted)",
                            background: "transparent",
                            border: "none",
                            borderBottom: activeTab === tab.id ? "2px solid var(--os-accent)" : "2px solid transparent",
                            marginBottom: -1,
                            cursor: "pointer",
                        }}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        <span
                            className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-mono"
                            style={{
                                background: activeTab === tab.id ? "rgba(94,129,244,0.2)" : "rgba(255,255,255,0.06)",
                                color: activeTab === tab.id ? "var(--os-accent)" : "var(--os-text-muted)",
                            }}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
                {activeTab === "experience" && (
                    <div className="relative">
                        {/* Vertical timeline line */}
                        <div
                            className="absolute left-6 top-0 bottom-0 w-px"
                            style={{ background: "linear-gradient(to bottom, var(--os-accent), rgba(94,129,244,0.1))" }}
                        />

                        <div className="space-y-4 pl-14">
                            {experience.map((exp, i) => {
                                const sc = statusConf[exp.status] || statusConf.terminated;
                                const isExpanded = expanded === exp.id;

                                return (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        {/* Timeline node */}
                                        <div
                                            className="absolute"
                                            style={{
                                                left: "calc(1.5rem - 6px)",
                                                marginTop: "1.4rem",
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                background: sc.color,
                                                boxShadow: exp.status === "running" ? `0 0 12px ${sc.color}` : "none",
                                                border: "2px solid var(--os-surface)",
                                            }}
                                        />

                                        {/* Card */}
                                        <motion.div
                                            className="rounded-xl overflow-hidden cursor-pointer"
                                            style={{
                                                background: isExpanded
                                                    ? `linear-gradient(135deg, ${exp.color}12, rgba(255,255,255,0.03))`
                                                    : "rgba(255,255,255,0.03)",
                                                border: `1px solid ${isExpanded ? exp.color + "35" : "rgba(255,255,255,0.07)"}`,
                                            }}
                                            whileHover={{ x: 3, borderColor: `${exp.color}30` }}
                                            onClick={() => setExpanded(isExpanded ? null : exp.id)}
                                        >
                                            {/* Header */}
                                            <div className="px-4 py-3">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span
                                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                                style={{
                                                                    background: sc.color,
                                                                    boxShadow: exp.status === "running" ? `0 0 8px ${sc.color}` : "none",
                                                                }}
                                                            />
                                                            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: sc.color }}>
                                                                {exp.id} • {sc.label}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-bold text-base">{exp.role}</h3>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                                            <span className="text-sm font-semibold" style={{ color: exp.color }}>
                                                                {exp.company}
                                                            </span>
                                                            <span className="text-xs" style={{ color: "var(--os-text-muted)" }}>
                                                                📍 {exp.location}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <div
                                                            className="text-xs font-mono px-2 py-1 rounded-lg"
                                                            style={{ background: "rgba(255,255,255,0.06)", color: "var(--os-text-muted)" }}
                                                        >
                                                            {exp.period}
                                                        </div>
                                                        <div className="text-[10px] mt-1 font-mono" style={{ color: "var(--os-text-muted)" }}>
                                                            PID {exp.pid}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-sm mt-2" style={{ color: "var(--os-text-dim)", lineHeight: 1.6 }}>
                                                    {exp.description}
                                                </p>
                                            </div>

                                            {/* Expanded details */}
                                            {isExpanded && (
                                                <motion.div
                                                    className="px-4 pb-4"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {/* Bullet log entries */}
                                                    <div
                                                        className="mt-2 rounded-lg overflow-hidden font-mono text-xs"
                                                        style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
                                                    >
                                                        <div
                                                            className="px-3 py-1.5 border-b text-[10px] uppercase tracking-wider"
                                                            style={{ borderColor: "rgba(255,255,255,0.06)", color: "var(--os-text-muted)" }}
                                                        >
                                                            [SYSTEM LOG] — Achievements
                                                        </div>
                                                        {exp.bullets.map((b, bi) => (
                                                            <div
                                                                key={bi}
                                                                className="px-3 py-1.5 border-b flex items-start gap-2"
                                                                style={{ borderColor: "rgba(255,255,255,0.04)", color: "rgba(180,210,255,0.8)" }}
                                                            >
                                                                <span style={{ color: exp.color }}>→</span>
                                                                <span style={{ lineHeight: 1.5 }}>{b}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Tech stack */}
                                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                                        {exp.tech.map((t) => (
                                                            <span
                                                                key={t}
                                                                className="px-2 py-1 rounded-lg text-[11px] font-mono font-medium"
                                                                style={{
                                                                    background: `${exp.color}15`,
                                                                    color: exp.color,
                                                                    border: `1px solid ${exp.color}30`,
                                                                }}
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === "education" && (
                    <div className="space-y-4">
                        {education.map((edu, i) => (
                            <motion.div
                                key={edu.degree}
                                className="rounded-xl p-4"
                                style={{
                                    background: `linear-gradient(135deg, ${edu.color}10, rgba(255,255,255,0.02))`,
                                    border: `1px solid ${edu.color}25`,
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">🎓</span>
                                            <h3 className="font-bold text-base">{edu.degree}</h3>
                                        </div>
                                        <p className="text-sm font-semibold" style={{ color: edu.color }}>
                                            {edu.institution}
                                        </p>
                                        <p className="text-xs mt-1" style={{ color: "var(--os-text-muted)" }}>
                                            📍 {edu.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "var(--os-text-muted)" }}>
                                            {edu.period}
                                        </div>
                                        <div className="mt-2 text-sm font-bold" style={{ color: edu.color }}>
                                            GPA: {edu.gpa}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
