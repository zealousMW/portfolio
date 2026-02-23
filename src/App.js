import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import { personalInfo } from "./data/resumeData";
import "./index.css";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  const detectMobileMode = useCallback(() => {
    const smallViewport = window.innerWidth <= 768;
    const coarsePointer = window.matchMedia
      ? window.matchMedia("(pointer: coarse)").matches
      : false;
    const mobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
    setMobileMode(smallViewport && (coarsePointer || mobileUa));
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  // Allow skipping boot with any key
  useEffect(() => {
    if (booted) return;
    const handler = (e) => {
      if (e.key) setBooted(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [booted]);

  useEffect(() => {
    detectMobileMode();
    window.addEventListener("resize", detectMobileMode);
    window.addEventListener("orientationchange", detectMobileMode);
    return () => {
      window.removeEventListener("resize", detectMobileMode);
      window.removeEventListener("orientationchange", detectMobileMode);
    };
  }, [detectMobileMode]);

  const mobileActions = [
    { label: "Email", href: `mailto:${personalInfo.email}` },
    { label: "GitHub", href: personalInfo.github },
    { label: "LinkedIn", href: personalInfo.linkedin },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {!booted ? (
          <motion.div
            key="boot"
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          >
            <BootScreen onComplete={handleBootComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            style={{ position: "fixed", inset: 0 }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {mobileMode ? (
              <div
                className="h-full w-full flex items-center justify-center p-5"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(94,129,244,0.18), transparent 45%), radial-gradient(circle at 80% 10%, rgba(139,92,246,0.16), transparent 35%), linear-gradient(160deg, #080d1f 0%, #0d1530 40%, #111b3d 100%)",
                  color: "var(--os-text)",
                }}
              >
                <div
                  className="w-full max-w-md rounded-2xl p-5"
                  style={{
                    background: "rgba(14, 20, 45, 0.75)",
                    border: "1px solid rgba(94,129,244,0.28)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <div className="text-xs uppercase tracking-[0.22em] mb-2" style={{ color: "var(--os-accent)" }}>
                    Zealous OS
                  </div>
                  <h1 className="text-xl font-bold mb-2">Best viewed on desktop</h1>
                  <p className="text-sm mb-4" style={{ color: "var(--os-text-dim)", lineHeight: 1.6 }}>
                    This interactive OS experience uses draggable windows and keyboard-first controls.
                    On mobile, use the links below and open on desktop for the full experience.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {mobileActions.map((action) => (
                      <a
                        key={action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg text-center text-sm font-medium transition-colors"
                        style={{
                          background: "rgba(94,129,244,0.14)",
                          border: "1px solid rgba(94,129,244,0.32)",
                          color: "var(--os-text)",
                          textDecoration: "none",
                        }}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Desktop />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
