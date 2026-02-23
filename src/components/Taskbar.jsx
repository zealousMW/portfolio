import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../store/useOSStore";

// Pinned apps shown as icons in the taskbar
const PINNED_APPS = [
    { id: "about",      label: "About Me",    icon: "👤", color: "#f97316" },
    { id: "resume",     label: "Resume",      icon: "📄", color: "#5e81f4" },
    { id: "projects",   label: "Projects",    icon: "🚀", color: "#8b5cf6" },
    { id: "skills",     label: "Skills",      icon: "🛠️", color: "#10b981" },
    { id: "experience", label: "Experience",  icon: "💼", color: "#f59e0b" },
    { id: "contact",    label: "Terminal",    icon: "⌨️", color: "#06b6d4" },
    { id: "doom",       label: "DOOM (1993)", icon: "🔫", color: "#ef4444" },
];

export default function Taskbar({ onOpenApp }) {
    const { windows, focusWindow, theme, setTheme, addNotification } = useOSStore();
    const [clock, setClock] = useState(new Date());
    const [hoveredApp, setHoveredApp] = useState(null);
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const t = setInterval(() => setClock(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (d) =>
        d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    const formatDate = (d) =>
        d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

    const themes = [
        { id: "dark", label: "Dark Mode", icon: "🌙", desc: "Deep space" },
        { id: "light", label: "Light Mode", icon: "☀️", desc: "Clean & bright" },
        { id: "glass", label: "Glass UI", icon: "💎", desc: "Frosted blur" },
    ];

    const handleThemeChange = (t) => {
        setTheme(t);
        setShowThemeMenu(false);
        addNotification(`Theme changed to ${t} mode`, "info");
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            const match = PINNED_APPS.find((a) =>
                a.label.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (match) { onOpenApp(match.id); setSearchQuery(""); }
        }
    };

    const isOpen = (id) => windows.some((w) => w.id === id);

    return (
        <>
            {/* ===== TASKBAR (Bottom) ===== */}
            <div
                className="fixed bottom-0 left-0 right-0 h-14 taskbar-glass flex items-center px-3 z-[500] select-none gap-2"
            >
                {/* === Z Start Button (Zorin-style) === */}
                <motion.button
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white flex-shrink-0"
                    style={{
                        background: "linear-gradient(135deg, #5e81f4 0%, #8b5cf6 100%)",
                        boxShadow: "0 2px 14px rgba(94,129,244,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                        fontSize: 18,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.03em",
                    }}
                    whileHover={{ scale: 1.08, boxShadow: "0 4px 20px rgba(94,129,244,0.7)" }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => addNotification("Welcome to Zealous OS! 🚀", "info")}
                    title="Start"
                >
                    Z
                </motion.button>

                {/* Divider */}
                <div className="w-px h-6 flex-shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />

                {/* === Pinned App Icons === */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    {PINNED_APPS.map((app) => {
                        const open = isOpen(app.id);
                        const win = windows.find((w) => w.id === app.id);
                        return (
                            <div
                                key={app.id}
                                className="relative"
                                onMouseEnter={() => setHoveredApp(app.id)}
                                onMouseLeave={() => setHoveredApp(null)}
                            >
                                <motion.button
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl relative"
                                    style={{
                                        background: open
                                            ? `linear-gradient(135deg, ${app.color}55, ${app.color}33)`
                                            : "rgba(255,255,255,0.08)",
                                        border: open
                                            ? `1px solid ${app.color}77`
                                            : "1px solid rgba(255,255,255,0.12)",
                                        boxShadow: open ? `0 0 16px ${app.color}40, inset 0 1px 0 rgba(255,255,255,0.15)` : "none",
                                    }}
                                    whileHover={{ scale: 1.2, y: -5 }}
                                    whileTap={{ scale: 0.88 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                                    onClick={() => {
                                        if (win && win.minimized) {
                                            useOSStore.setState((state) => ({
                                                windows: state.windows.map((w) =>
                                                    w.id === app.id ? { ...w, minimized: false } : w
                                                ),
                                            }));
                                            focusWindow(app.id);
                                        } else if (win) {
                                            focusWindow(app.id);
                                        } else {
                                            onOpenApp(app.id);
                                        }
                                    }}
                                    title={app.label}
                                >
                                    {app.icon}
                                    {open && (
                                        <span
                                            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                            style={{ background: app.color }}
                                        />
                                    )}
                                </motion.button>

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {hoveredApp === app.id && (
                                        <motion.div
                                            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-10"
                                            style={{
                                                background: "rgba(10,10,30,0.95)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "var(--os-text)",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                                            }}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 4 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {app.label}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* === CENTER: Search Bar === */}
                <div className="flex-1 flex justify-center px-4">
                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl w-full"
                        style={{
                            maxWidth: 300,
                            background: "rgba(255,255,255,0.09)",
                            border: "1px solid rgba(255,255,255,0.14)",
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--os-text-muted)", flexShrink: 0 }}>
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            className="bg-transparent outline-none flex-1 text-xs taskbar-search-input"
                            style={{ color: "var(--os-text)", minWidth: 0 }}
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* System Tray (Right) */}
                <div className="flex items-center gap-2">
                    {/* Theme switcher */}
                    <div className="relative">
                        <motion.button
                            className="p-2 rounded-lg text-sm hover:bg-white hover:bg-opacity-10 transition-all"
                            style={{ color: "var(--os-text-dim)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowThemeMenu((v) => !v)}
                            title="Theme"
                        >
                            {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "💎"}
                        </motion.button>

                        <AnimatePresence>
                            {showThemeMenu && (
                                <motion.div
                                    className="absolute bottom-full right-0 mb-2 rounded-xl overflow-hidden"
                                    style={{
                                        background: "rgba(15,15,35,0.97)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                                        minWidth: 180,
                                    }}
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", fontSize: 11, color: "var(--os-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                        Appearance
                                    </div>
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-white hover:bg-opacity-5 transition-all"
                                            style={{ color: theme === t.id ? "var(--os-accent)" : "var(--os-text)" }}
                                            onClick={() => handleThemeChange(t.id)}
                                        >
                                            <span className="text-base">{t.icon}</span>
                                            <div>
                                                <div className="text-sm font-medium">{t.label}</div>
                                                <div className="text-xs" style={{ color: "var(--os-text-muted)" }}>{t.desc}</div>
                                            </div>
                                            {theme === t.id && <span className="ml-auto text-xs">✓</span>}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* System icons */}
                    <span className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-sm" style={{ color: "var(--os-text-dim)" }} title="Sound">🔊</span>
                    <span className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-sm" style={{ color: "var(--os-text-dim)" }} title="Battery">🔋</span>

                    {/* Clock */}
                    <div className="text-right">
                        <div className="system-tray-item font-semibold">{formatTime(clock)}</div>
                        <div className="system-tray-item text-[10px]">{formatDate(clock)}</div>
                    </div>
                </div>
            </div>

            {/* Click outside to close theme menu */}
            {showThemeMenu && (
                <div className="fixed inset-0 z-[498]" onClick={() => setShowThemeMenu(false)} />
            )}
        </>
    );
}
