import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../store/useOSStore";

export default function NotificationToast() {
    const { notifications } = useOSStore();

    const icons = {
        info: "💬",
        success: "✅",
        warning: "⚠️",
        error: "❌",
    };

    return (
        <div className="fixed top-4 right-4 z-[9000] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: 320 }}>
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl pointer-events-auto"
                        style={{
                            background: "rgba(15,15,35,0.97)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                            backdropFilter: "blur(20px)",
                        }}
                        initial={{ opacity: 0, x: 60, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 60, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <span className="text-lg flex-shrink-0">{icons[n.type] || "💬"}</span>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium" style={{ color: "var(--os-text)" }}>
                                Zealous OS Notification
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: "var(--os-text-dim)" }}>
                                {n.msg}
                            </div>
                        </div>
                        <div className="text-[10px] font-mono flex-shrink-0" style={{ color: "var(--os-text-muted)" }}>
                            {n.timestamp?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
