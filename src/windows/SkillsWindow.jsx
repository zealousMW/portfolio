import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/resumeData";

const levelLabel = (l) => {
    if (l >= 90) return { label: "Expert", color: "#10b981" };
    if (l >= 75) return { label: "Advanced", color: "#5e81f4" };
    if (l >= 55) return { label: "Proficient", color: "#f59e0b" };
    if (l >= 35) return { label: "Learning", color: "#f97316" };
    return { label: "Beginner", color: "#6b7280" };
};

const statusDot = {
    active: { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "active" },
    idle: { color: "#6b7280", bg: "rgba(107,114,128,0.12)", label: "idle" },
    sleeping: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "sleeping" },
    learning: { color: "#06b6d4", bg: "rgba(6,182,212,0.12)", label: "learning" },
};

export default function SkillsWindow() {
    const [activeCategory, setActiveCategory] = useState(null);

    const displayed = activeCategory
        ? skills.filter((s) => s.category === activeCategory)
        : skills;

    return (
        <div className="h-full flex flex-col" style={{ color: "var(--os-text)" }}>
            {/* Header */}
            <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: "var(--os-border)", background: "rgba(255,255,255,0.02)" }}
            >
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--os-text-muted)" }}>
                    📦 INSTALLED PACKAGES — {skills.reduce((acc, s) => acc + s.packages.length, 0)} total
                </span>
                <div className="flex gap-1.5">
                    <button
                        className="px-2.5 py-1 rounded-lg text-xs transition-all"
                        style={{
                            background: !activeCategory ? "rgba(94,129,244,0.2)" : "transparent",
                            color: !activeCategory ? "var(--os-accent)" : "var(--os-text-muted)",
                            border: `1px solid ${!activeCategory ? "rgba(94,129,244,0.3)" : "transparent"}`,
                        }}
                        onClick={() => setActiveCategory(null)}
                    >
                        All
                    </button>
                    {skills.map((s) => (
                        <button
                            key={s.category}
                            className="px-2.5 py-1 rounded-lg text-xs transition-all"
                            style={{
                                background: activeCategory === s.category ? `${s.color}22` : "transparent",
                                color: activeCategory === s.category ? s.color : "var(--os-text-muted)",
                                border: `1px solid ${activeCategory === s.category ? `${s.color}40` : "transparent"}`,
                            }}
                            onClick={() => setActiveCategory(activeCategory === s.category ? null : s.category)}
                        >
                            {s.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Package list */}
            <div className="flex-1 overflow-auto p-4 space-y-6">
                {displayed.map((category, ci) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ci * 0.08 }}
                    >
                        {/* Category header */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">{category.icon}</span>
                            <h3 className="font-bold text-sm" style={{ color: "var(--os-text)" }}>
                                {category.category}
                            </h3>
                            <div
                                className="flex-1 h-px"
                                style={{ background: `linear-gradient(90deg, ${category.color}40, transparent)` }}
                            />
                            <span className="text-xs font-mono" style={{ color: "var(--os-text-muted)" }}>
                                {category.packages.length} packages
                            </span>
                        </div>

                        {/* Packages grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {category.packages.map((pkg, pi) => {
                                const level = levelLabel(pkg.level);
                                const stat = statusDot[pkg.status] || statusDot.idle;

                                return (
                                    <motion.div
                                        key={pkg.name}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group cursor-default"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: ci * 0.06 + pi * 0.04 }}
                                        whileHover={{
                                            background: `${category.color}0a`,
                                            borderColor: `${category.color}30`,
                                            x: 2,
                                        }}
                                    >
                                        {/* Status dot */}
                                        <div
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{
                                                background: stat.color,
                                                boxShadow: pkg.status === "active" ? `0 0 6px ${stat.color}` : "none",
                                            }}
                                        />

                                        {/* Name & version */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold truncate">{pkg.name}</span>
                                                <span
                                                    className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                                                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--os-text-muted)" }}
                                                >
                                                    {pkg.version}
                                                </span>
                                            </div>
                                            {/* Progress bar */}
                                            <div className="mt-1.5 flex items-center gap-2">
                                                <div
                                                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                                >
                                                    <motion.div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${category.color}, ${category.color}99)`,
                                                            boxShadow: `0 0 6px ${category.color}50`,
                                                        }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pkg.level}%` }}
                                                        transition={{ delay: ci * 0.08 + pi * 0.04 + 0.2, duration: 0.6, ease: "easeOut" }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-mono flex-shrink-0" style={{ color: level.color }}>
                                                    {level.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Level percent */}
                                        <span
                                            className="text-sm font-bold flex-shrink-0"
                                            style={{ color: category.color }}
                                        >
                                            {pkg.level}%
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
