import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
    { text: "ZEALOUS OS v2.0.26 — Booting kernel...", delay: 0 },
    { text: "Loading hardware abstraction layer...", delay: 300 },
    { text: "Initializing filesystem [ext4]...", delay: 600 },
    { text: "Mounting /dev/identity → Maheshwar Muthukumar...", delay: 900 },
    { text: "Starting network manager...", delay: 1200 },
    { text: "Loading skill packages:", delay: 1500 },
    { text: "  ✓ java@21           [INSTALLED]", delay: 1700 },
    { text: "  ✓ node@20.x         [INSTALLED]", delay: 1900 },
    { text: "  ✓ express@4.x       [INSTALLED]", delay: 2100 },
    { text: "  ✓ react@18.x        [INSTALLED]", delay: 2300 },
    { text: "  ✓ mysql@8.x         [INSTALLED]", delay: 2500 },
    { text: "  ✓ supabase@2.x      [INSTALLED]", delay: 2700 },
    { text: "Loading experience modules:", delay: 2950 },
    { text: "  ✓ EazeAccounts (Backend Dev Intern)  [PID: 1201]  RUNNING", delay: 3150 },
    { text: "Loading project processes:", delay: 3400 },
    { text: "  ✓ HospitalMgmt      [PID: 4201]  RUNNING  2.1% CPU", delay: 3600 },
    { text: "  ✓ DisasterResponse  [PID: 3872]  RUNNING  3.4% CPU", delay: 3800 },
    { text: "  ✓ CreditCardMgmt   [PID: 3541]  IDLE     0.5% CPU", delay: 4000 },
    { text: "Starting graphical session...", delay: 4250 },
    { text: "Applying glass compositor...", delay: 4500 },
    { text: "System ready. Welcome, root@zealous-os.", delay: 4750 },
];

export default function BootScreen({ onComplete }) {
    const [visibleLines, setVisibleLines] = useState([]);
    const [progress, setProgress] = useState(0);
    const [showEnter, setShowEnter] = useState(false);
    const termRef = useRef(null);

    useEffect(() => {
        BOOT_LINES.forEach(({ text, delay }, i) => {
            setTimeout(() => {
                setVisibleLines((prev) => [...prev, text]);
                const pct = Math.round(((i + 1) / BOOT_LINES.length) * 100);
                setProgress(pct);
                if (termRef.current) {
                    termRef.current.scrollTop = termRef.current.scrollHeight;
                }
            }, delay);
        });

        setTimeout(() => setShowEnter(true), 5100);
        setTimeout(() => onComplete(), 6500);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
            style={{
                background: "linear-gradient(135deg, #050510, #0d0820, #050510)",
            }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Scanline effect */}
            <div className="boot-scanline" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(94,129,244,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(94,129,244,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* OS Logo */}
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <div
                    className="text-7xl font-black tracking-tighter mb-2"
                    style={{
                        background: "linear-gradient(135deg, #5e81f4, #8b5cf6, #06b6d4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Inter', sans-serif",
                        textShadow: "none",
                        filter: "drop-shadow(0 0 30px rgba(94,129,244,0.5))",
                    }}
                >
                    ZEALOUS OS
                </div>
                <div className="text-sm font-mono tracking-[0.4em] uppercase" style={{ color: "rgba(94,129,244,0.7)" }}>
                    Portfolio Operating System  •  v2.0.26
                </div>
            </motion.div>

            {/* Terminal window */}
            <motion.div
                className="relative w-full max-w-2xl mx-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {/* Terminal chrome */}
                <div
                    className="rounded-xl overflow-hidden"
                    style={{
                        border: "1px solid rgba(94,129,244,0.3)",
                        boxShadow: "0 0 40px rgba(94,129,244,0.15), 0 20px 60px rgba(0,0,0,0.8)",
                    }}
                >
                    {/* Titlebar */}
                    <div
                        className="flex items-center gap-2 px-4 py-3"
                        style={{ background: "rgba(20,20,40,0.95)", borderBottom: "1px solid rgba(94,129,244,0.2)" }}
                    >
                        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                        <span className="ml-3 text-xs font-mono" style={{ color: "rgba(94,129,244,0.7)" }}>
                            root@zealous-os — /boot/init
                        </span>
                    </div>

                    {/* Terminal body */}
                    <div
                        ref={termRef}
                        className="p-5 h-72 overflow-y-auto font-mono text-sm"
                        style={{
                            background: "rgba(5, 5, 15, 0.95)",
                            color: "rgba(180, 210, 255, 0.85)",
                            lineHeight: "1.6",
                        }}
                    >
                        {visibleLines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.15 }}
                                className="leading-relaxed"
                                style={{
                                    color: line.includes("✓")
                                        ? "#10b981"
                                        : line.includes("[")
                                            ? "#5e81f4"
                                            : "rgba(180, 210, 255, 0.85)",
                                }}
                            >
                                <span style={{ color: "rgba(94,129,244,0.5)" }}>$ </span>
                                {line}
                            </motion.div>
                        ))}
                        {/* Blinking cursor */}
                        <span
                            className="inline-block w-2 h-4 ml-1 cursor-blink"
                            style={{ background: "#5e81f4", verticalAlign: "middle" }}
                        />
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5 px-1">
                    <div className="flex justify-between text-xs font-mono mb-2" style={{ color: "rgba(94,129,244,0.6)" }}>
                        <span>System initialization</span>
                        <span>{Math.min(Math.round(progress), 100)}%</span>
                    </div>
                    <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                        <motion.div
                            className="h-full rounded-full shimmer-bar"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Enter prompt */}
                <AnimatePresence>
                    {showEnter && (
                        <motion.div
                            className="mt-5 text-center cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                            onClick={onComplete}
                        >
                            <span
                                className="font-mono text-sm tracking-widest uppercase"
                                style={{ color: "rgba(94,129,244,0.8)" }}
                            >
                                ▶ Press any key or click to enter →
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Copyright footer */}
            <motion.div
                className="absolute bottom-8 text-xs font-mono"
                style={{ color: "rgba(94,129,244,0.35)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                ZEALOUS OS  ©2026  •  All system components loaded  •  Session ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
            </motion.div>
        </motion.div>
    );
}
