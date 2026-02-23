import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../store/useOSStore";
import { personalInfo } from "../data/resumeData";
import OSWindow from "./OSWindow";
import Taskbar from "./Taskbar";
import NotificationToast from "./NotificationToast";

// Window content components
import ResumeWindow from "../windows/ResumeWindow";
import ProjectsWindow from "../windows/ProjectsWindow";
import SkillsWindow from "../windows/SkillsWindow";
import ExperienceWindow from "../windows/ExperienceWindow";
import ContactWindow from "../windows/ContactWindow";
import AboutWindow from "../windows/AboutWindow";
import DoomWindow from "../windows/DoomWindow";

const APP_MAP = {
    resume:     { title: "Resume",     icon: "📄", component: <ResumeWindow />,     width: 720,  height: 560, color: "#5e81f4" },
    projects:   { title: "Projects",   icon: "🚀", component: <ProjectsWindow />,   width: 860,  height: 580, color: "#8b5cf6" },
    skills:     { title: "Skills",     icon: "🛠️", component: <SkillsWindow />,     width: 740,  height: 560, color: "#10b981" },
    experience: { title: "Experience", icon: "💼", component: <ExperienceWindow />, width: 740,  height: 580, color: "#f59e0b" },
    contact:    { title: "Terminal",   icon: "⌨️", component: <ContactWindow />,    width: 640,  height: 480, color: "#06b6d4" },
    about:      { title: "About",      icon: "👤", component: <AboutWindow />,      width: 680,  height: 540, color: "#f97316" },
    doom:       { title: "DOOM (1993)",icon: "🔫", component: <DoomWindow />,       width: 800,  height: 560, color: "#ef4444" },
};

// Desktop icons
const DESKTOP_ICONS = [
    { id: "about",      label: "About Me",    icon: "👤", color: "#f97316" },
    { id: "resume",     label: "Resume.pdf",  icon: "📄", color: "#5e81f4" },
    { id: "projects",   label: "Projects",    icon: "🚀", color: "#8b5cf6" },
    { id: "skills",     label: "Skills",      icon: "🛠️", color: "#10b981" },
    { id: "experience", label: "Experience",  icon: "💼", color: "#f59e0b" },
    { id: "contact",    label: "Terminal",    icon: "⌨️", color: "#06b6d4" },
    { id: "doom",       label: "DOOM.exe",    icon: "🔫", color: "#ef4444" },
];

export default function Desktop() {
    const { windows, openWindow, theme } = useOSStore();
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [ripples, setRipples] = useState([]);
    const [deskClock, setDeskClock] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setDeskClock(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const handleOpenApp = (appId) => {
        const app = APP_MAP[appId];
        if (!app) return;
        openWindow(appId, app.title, app.component, app.icon, app.width, app.height);
    };

    const handleDesktopClick = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedIcon(null);
            // Ripple effect
            const ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
            setRipples((prev) => [...prev, ripple]);
            setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);
        }
    };

    // Scenic wallpaper gradient based on theme
    const bgStyle =
        theme === "light"
            ? {
                background: "linear-gradient(160deg, #ffecd2 0%, #fcb69f 22%, #c9b8eb 65%, #a18cd1 100%)",
            }
            : theme === "glass"
                ? {
                    background: "linear-gradient(160deg, #141e30 0%, #243b55 45%, #2c3e7a 100%)",
                    backgroundAttachment: "fixed",
                }
                : {
                    background: "linear-gradient(160deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
                };

    return (
        <div
            className="fixed inset-0 mesh-bg overflow-hidden"
            style={{ ...bgStyle, paddingBottom: 56 }}
            onClick={handleDesktopClick}
        >
            {/* Subtle desktop dot texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Click ripples */}
            {ripples.map((r) => (
                <motion.div
                    key={r.id}
                    className="fixed pointer-events-none rounded-full"
                    style={{
                        left: r.x - 30,
                        top: r.y - 30,
                        width: 60,
                        height: 60,
                        border: "1px solid rgba(94,129,244,0.4)",
                    }}
                    initial={{ scale: 0, opacity: 0.7 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            ))}

            {/* Desktop icons (top-left column) */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
                {DESKTOP_ICONS.map((icon, i) => (
                    <motion.div
                        key={icon.id}
                        className="flex flex-col items-center gap-1 cursor-pointer select-none"
                        style={{ width: 76 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 + 0.2 }}
                        onClick={(e) => { e.stopPropagation(); handleOpenApp(icon.id); setSelectedIcon(icon.id); }}
                    >
                        <motion.div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                            style={{
                                background: selectedIcon === icon.id
                                    ? `linear-gradient(145deg, ${icon.color}ff, ${icon.color}bb)`
                                    : `linear-gradient(145deg, ${icon.color}ee, ${icon.color}99)`,
                                boxShadow: selectedIcon === icon.id
                                    ? `0 8px 24px ${icon.color}66, inset 0 1px 0 rgba(255,255,255,0.35)`
                                    : `0 4px 14px ${icon.color}44, inset 0 1px 0 rgba(255,255,255,0.25)`,
                                border: `1.5px solid ${icon.color}44`,
                            }}
                            whileHover={{ scale: 1.12, y: -4 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            {icon.icon}
                        </motion.div>
                        <span
                            className="text-[11px] font-medium text-center leading-tight px-1 py-0.5 rounded"
                            style={{
                                color: theme === "light" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.85)",
                                background:
                                    selectedIcon === icon.id
                                        ? "rgba(94,129,244,0.35)"
                                        : "rgba(0,0,0,0.25)",
                                backdropFilter: "blur(4px)",
                                textShadow: theme === "light" ? "none" : "0 1px 3px rgba(0,0,0,0.8)",
                                maxWidth: "100%",
                                wordBreak: "break-word",
                            }}
                        >
                            {icon.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Center identity widget — shown when no windows open */}
            <AnimatePresence>
                {windows.length === 0 && (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        style={{ paddingLeft: 110, paddingBottom: 56 }}
                    >
                        {/* Clock — subtle, secondary */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className="font-extralight tabular-nums"
                                style={{
                                    fontSize: "clamp(32px, 5vw, 52px)",
                                    color: theme === "light" ? "rgba(40,25,80,0.45)" : "rgba(255,255,255,0.4)",
                                    letterSpacing: "-1px",
                                    lineHeight: 1,
                                }}
                            >
                                {deskClock.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                            </div>
                            <div
                                className="mt-1 text-xs font-medium tracking-widest uppercase"
                                style={{
                                    color: theme === "light" ? "rgba(40,25,80,0.3)" : "rgba(255,255,255,0.28)",
                                    letterSpacing: "0.2em",
                                }}
                            >
                                {deskClock.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                            </div>

                            {/* Divider */}
                            <div className="mx-auto mt-5 mb-5" style={{ width: 40, height: 1, background: theme === "light" ? "rgba(40,25,80,0.12)" : "rgba(255,255,255,0.12)" }} />

                            {/* Identity — the real hero */}
                            <div
                                className="font-black tracking-tight"
                                style={{
                                    fontSize: "clamp(28px, 4.5vw, 52px)",
                                    color: theme === "light" ? "rgba(30,15,60,0.88)" : "rgba(255,255,255,0.92)",
                                    letterSpacing: "-1.5px",
                                    lineHeight: 1.05,
                                    textShadow: theme === "light" ? "none" : "0 2px 24px rgba(0,0,0,0.4)",
                                }}
                            >
                                {personalInfo.name}
                            </div>
                            <div
                                className="mt-2 text-base font-medium tracking-wide"
                                style={{
                                    color: theme === "light" ? "rgba(94,129,244,0.85)" : "rgba(94,169,244,0.9)",
                                    letterSpacing: "0.04em",
                                }}
                            >
                                {personalInfo.title}
                            </div>
                            <div
                                className="mt-1 text-sm"
                                style={{ color: theme === "light" ? "rgba(40,25,80,0.4)" : "rgba(255,255,255,0.38)" }}
                            >
                                {personalInfo.location}
                            </div>

                            {/* Quick-action pills */}
                            <div className="mt-5 flex items-center justify-center gap-2 pointer-events-auto">
                                {[
                                    { label: "About Me", id: "about", color: "#f97316" },
                                    { label: "Projects", id: "projects", color: "#8b5cf6" },
                                    { label: "Terminal", id: "contact", color: "#06b6d4" },
                                ].map((pill) => (
                                    <motion.button
                                        key={pill.id}
                                        className="px-3 py-1.5 rounded-full text-xs font-semibold"
                                        style={{
                                            background: `${pill.color}22`,
                                            border: `1px solid ${pill.color}44`,
                                            color: pill.color,
                                            backdropFilter: "blur(8px)",
                                        }}
                                        whileHover={{ scale: 1.08, background: `${pill.color}33` }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleOpenApp(pill.id)}
                                    >
                                        {pill.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Available-for-hire badge — bottom right */}
            <AnimatePresence>
                {windows.length === 0 && (
                    <motion.div
                        className="absolute bottom-20 right-6 pointer-events-auto"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <motion.a
                            href={`mailto:${personalInfo.email}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl"
                            style={{
                                background: "rgba(16,185,129,0.12)",
                                border: "1px solid rgba(16,185,129,0.3)",
                                backdropFilter: "blur(12px)",
                                textDecoration: "none",
                            }}
                            whileHover={{ scale: 1.04, background: "rgba(16,185,129,0.2)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }}
                            />
                            <span className="text-xs font-semibold" style={{ color: "#10b981" }}>Available for opportunities</span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{personalInfo.email}</span>
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render all windows */}
            {windows.map((win) => (
                <OSWindow key={win.id} win={win} />
            ))}

            {/* Taskbar */}
            <Taskbar onOpenApp={handleOpenApp} />

            {/* Notifications */}
            <NotificationToast />
        </div>
    );
}
