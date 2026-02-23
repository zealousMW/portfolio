import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/resumeData";

const statusConfig = {
    running: { color: "#10b981", dot: "🟢", label: "RUNNING", bg: "rgba(16,185,129,0.12)" },
    sleeping: { color: "#f59e0b", dot: "🟡", label: "SLEEPING", bg: "rgba(245,158,11,0.12)" },
    idle: { color: "#6b7280", dot: "⚪", label: "IDLE", bg: "rgba(107,114,128,0.12)" },
};

export default function ProjectsWindow() {
    const [selected, setSelected] = useState(null);
    const [sortBy, setSortBy] = useState("pid");

    const sorted = [...projects].sort((a, b) => {
        if (sortBy === "pid") return b.pid - a.pid;
        if (sortBy === "cpu") return parseFloat(b.cpu) - parseFloat(a.cpu);
        if (sortBy === "mem") return parseInt(b.memory) - parseInt(a.memory);
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
    });

    return (
        <div className="h-full flex flex-col" style={{ color: "var(--os-text)" }}>
            {/* Toolbar */}
            <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "var(--os-border)", background: "rgba(255,255,255,0.02)" }}
            >
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: "var(--os-text-muted)" }}>
                        PROCESS TABLE — {projects.length} processes
                    </span>
                    <span
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
                    >
                        {projects.filter(p => p.status === "running").length} running
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-xs mr-2" style={{ color: "var(--os-text-muted)" }}>Sort by:</span>
                    {["pid", "name", "cpu", "mem"].map((s) => (
                        <button
                            key={s}
                            className="px-2 py-1 rounded text-xs font-mono uppercase transition-all"
                            style={{
                                background: sortBy === s ? "rgba(94,129,244,0.2)" : "transparent",
                                color: sortBy === s ? "var(--os-accent)" : "var(--os-text-muted)",
                                border: `1px solid ${sortBy === s ? "rgba(94,129,244,0.3)" : "transparent"}`,
                            }}
                            onClick={() => setSortBy(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Process table header */}
            <div
                className="grid px-4 py-2 text-xs font-mono uppercase tracking-wider border-b"
                style={{
                    gridTemplateColumns: "60px 1fr 100px 80px 80px 100px",
                    borderColor: "var(--os-border)",
                    color: "var(--os-text-muted)",
                    background: "rgba(255,255,255,0.015)",
                }}
            >
                <span>PID</span>
                <span>NAME</span>
                <span>STATUS</span>
                <span>CPU</span>
                <span>MEM</span>
                <span>STACK</span>
            </div>

            {/* Process rows */}
            <div className="flex-1 overflow-auto">
                {sorted.map((proj, i) => {
                    const sc = statusConfig[proj.status] || statusConfig.idle;
                    const isSelected = selected?.id === proj.id;

                    return (
                        <motion.div
                            key={proj.id}
                            className="grid px-4 py-3 cursor-pointer border-b process-row transition-all"
                            style={{
                                gridTemplateColumns: "60px 1fr 100px 80px 80px 100px",
                                borderColor: "var(--os-border)",
                                background: isSelected ? "rgba(94,129,244,0.08)" : "transparent",
                                borderLeft: isSelected ? "3px solid var(--os-accent)" : "3px solid transparent",
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => setSelected(isSelected ? null : proj)}
                            whileHover={{ x: 2 }}
                        >
                            {/* PID */}
                            <span className="font-mono text-sm" style={{ color: "var(--os-text-muted)" }}>
                                {proj.pid}
                            </span>

                            {/* Name */}
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-lg flex-shrink-0">{proj.icon}</span>
                                <div className="min-w-0">
                                    <div className="font-semibold text-sm truncate">{proj.name}</div>
                                    <div className="font-mono text-xs truncate" style={{ color: "var(--os-text-muted)" }}>
                                        {proj.process}
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{
                                        background: sc.color,
                                        boxShadow: proj.status === "running" ? `0 0 6px ${sc.color}` : "none",
                                    }}
                                />
                                <span className="font-mono text-xs" style={{ color: sc.color }}>
                                    {sc.label}
                                </span>
                            </div>

                            {/* CPU */}
                            <div>
                                <span className="font-mono text-sm" style={{ color: parseFloat(proj.cpu) > 5 ? "#f59e0b" : "var(--os-text)" }}>
                                    {proj.cpu}
                                </span>
                            </div>

                            {/* Memory */}
                            <div>
                                <span className="font-mono text-sm" style={{ color: "var(--os-text)" }}>
                                    {proj.memory}
                                </span>
                            </div>

                            {/* Stack (first 2 techs) */}
                            <div className="flex flex-wrap gap-1">
                                {proj.tech.slice(0, 2).map((t) => (
                                    <span
                                        key={t}
                                        className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                                        style={{
                                            background: `${proj.color}18`,
                                            color: proj.color,
                                            border: `1px solid ${proj.color}30`,
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                                {proj.tech.length > 2 && (
                                    <span className="text-[10px] font-mono" style={{ color: "var(--os-text-muted)" }}>
                                        +{proj.tech.length - 2}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Detail panel */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="border-t overflow-hidden"
                        style={{ borderColor: "var(--os-border)", background: "var(--os-surface2)" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 240, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-4 h-full overflow-auto">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <span>{selected.icon}</span>
                                        {selected.name}
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full font-mono"
                                            style={{
                                                background: statusConfig[selected.status]?.bg,
                                                color: statusConfig[selected.status]?.color,
                                            }}
                                        >
                                            {statusConfig[selected.status]?.label}
                                        </span>
                                    </h3>
                                    <p className="text-sm mt-1" style={{ color: "var(--os-text-dim)" }}>
                                        {selected.longDescription}
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 ml-4">
                                    {selected.github && (
                                        <a
                                            href={selected.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                            style={{
                                                background: "rgba(255,255,255,0.08)",
                                                color: "var(--os-text)",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                textDecoration: "none",
                                            }}
                                        >
                                            🐙 GitHub
                                        </a>
                                    )}
                                    {selected.live && (
                                        <a
                                            href={selected.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                            style={{
                                                background: `${selected.color}20`,
                                                color: selected.color,
                                                border: `1px solid ${selected.color}40`,
                                                textDecoration: "none",
                                            }}
                                        >
                                            🚀 Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {selected.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium"
                                        style={{
                                            background: `${selected.color}18`,
                                            color: selected.color,
                                            border: `1px solid ${selected.color}35`,
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="flex gap-4 text-sm">
                                <span style={{ color: "var(--os-text-dim)" }}>⭐ {selected.stars} stars</span>
                                <span style={{ color: "var(--os-text-dim)" }}>🍴 {selected.forks} forks</span>
                                <span style={{ color: "var(--os-text-dim)" }}>🔥 {selected.uptime} uptime</span>
                                <span className="font-mono" style={{ color: "var(--os-text-muted)" }}>PID: {selected.pid}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
