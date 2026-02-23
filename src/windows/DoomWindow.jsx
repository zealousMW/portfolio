import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DOOM_BUNDLE = "https://v8.js-dos.com/bundles/doom.jsdos";
const JSDOS_JS  = "https://v8.js-dos.com/latest/js-dos.js";
const JSDOS_CSS = "https://v8.js-dos.com/latest/js-dos.css";

export default function DoomWindow() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState("idle"); // idle | loading | ready | error
    const [isMobile, setIsMobile] = useState(false);
    const [allowMobileBoot, setAllowMobileBoot] = useState(false);

    useEffect(() => {
        const detectMobile = () => {
            const smallViewport = window.innerWidth <= 768;
            const coarsePointer = window.matchMedia
                ? window.matchMedia("(pointer: coarse)").matches
                : false;
            const mobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
            setIsMobile(smallViewport && (coarsePointer || mobileUa));
        };

        detectMobile();
        window.addEventListener("resize", detectMobile);
        window.addEventListener("orientationchange", detectMobile);
        return () => {
            window.removeEventListener("resize", detectMobile);
            window.removeEventListener("orientationchange", detectMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile && !allowMobileBoot) {
            setStatus("idle");
            return;
        }

        let cancelled = false;
        // ci is the resolved js-dos CommandInterface; we need it to stop cleanly
        let resolvedCi = null;

        // Inject js-dos CSS once
        if (!document.getElementById("jsdos-css")) {
            const link = document.createElement("link");
            link.id = "jsdos-css";
            link.rel = "stylesheet";
            link.href = JSDOS_CSS;
            document.head.appendChild(link);
        }

        const boot = async () => {
            if (cancelled || !containerRef.current || !window.Dos) return;
            setStatus("loading");
            try {
                // Dos() returns a Promise<CommandInterface> in v8
                const ci = await window.Dos(containerRef.current, {
                    url: DOOM_BUNDLE,
                    autoStart: true,
                });
                if (cancelled) {
                    // Unmounted before the promise resolved — stop immediately
                    try { ci?.stop?.(); } catch { /* ignore */ }
                    return;
                }
                resolvedCi = ci;
                setStatus("ready");
            } catch (err) {
                if (!cancelled) setStatus("error");
            }
        };

        const initScript = () => {
            let scriptEl = document.getElementById("jsdos-js");
            if (window.Dos) {
                boot();
            } else if (scriptEl) {
                // Script tag exists but Dos not ready yet — wait for it
                scriptEl.addEventListener("load", boot, { once: true });
            } else {
                scriptEl = document.createElement("script");
                scriptEl.id = "jsdos-js";
                scriptEl.src = JSDOS_JS;
                scriptEl.addEventListener("load", boot, { once: true });
                document.head.appendChild(scriptEl);
            }
        };

        initScript();

        return () => {
            cancelled = true;
            // Stop only if the ci has actually resolved; otherwise the
            // still-pending Web Lock causes the AbortError
            try { resolvedCi?.stop?.(); } catch { /* ignore */ }
        };
    }, [allowMobileBoot, isMobile]);

    return (
        <div className="h-full flex flex-col" style={{ background: "#000", color: "#fff" }}>
            {/* Header bar */}
            <div
                className="flex items-center justify-between px-4 py-2 flex-shrink-0"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,0,0,0.25)",
                }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-base">🔫</span>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#ef4444" }}>
                        DOOM
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.15)", color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        id Software © 1993
                    </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <span>WASD / Arrow Keys — Move</span>
                    <span>Ctrl — Shoot</span>
                    <span>Alt — Strafe</span>
                    <span>Space — Use / Open</span>
                    <span style={{ color: status === "ready" ? "#10b981" : status === "loading" ? "#f59e0b" : status === "error" ? "#ef4444" : "rgba(255,255,255,0.3)" }}>
                        ● {status === "ready" ? "Running" : status === "loading" ? "Loading…" : status === "error" ? "Error" : "Initializing"}
                    </span>
                </div>
            </div>

            {/* js-dos canvas mount point */}
            <div
                ref={containerRef}
                className="flex-1 w-full"
                style={{ minHeight: 0, overflow: "hidden" }}
            />

            {isMobile && !allowMobileBoot && (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ background: "#000", zIndex: 15 }}>
                    <div className="text-4xl mb-3">⚠️</div>
                    <div className="text-sm font-mono uppercase tracking-widest mb-2" style={{ color: "#f59e0b" }}>
                        Mobile Controls Limited
                    </div>
                    <div className="text-xs font-mono max-w-sm mb-4" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                        DOOM is optimized for keyboard input. On mobile, movement and aiming can be difficult.
                        You can continue anyway.
                    </div>
                    <button
                        type="button"
                        onClick={() => setAllowMobileBoot(true)}
                        className="px-4 py-2 rounded text-xs font-mono uppercase tracking-wider"
                        style={{
                            background: "rgba(239,68,68,0.18)",
                            border: "1px solid rgba(239,68,68,0.45)",
                            color: "#ef4444",
                            cursor: "pointer",
                        }}
                    >
                        Continue Anyway
                    </button>
                </div>
            )}

            {/* Loading overlay */}
            {status === "loading" && (
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "#000", zIndex: 10 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="text-4xl mb-4">🔫</div>
                    <div className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#ef4444" }}>
                        Booting DOOM…
                    </div>
                    <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: "#ef4444" }}
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />
                    </div>
                    <div className="mt-4 text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Downloading WAD…
                    </div>
                </motion.div>
            )}

            {status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "#000" }}>
                    <div className="text-3xl mb-3">💀</div>
                    <div className="text-sm font-mono" style={{ color: "#ef4444" }}>You are dead.</div>
                    <div className="text-xs font-mono mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>Failed to load DOOM bundle — check your network connection.</div>
                </div>
            )}
        </div>
    );
}
