import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../store/useOSStore";

// Draggable + Resizable Window
export default function OSWindow({ win }) {
    const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, activeWindowId, updateWindowPosition, updateWindowSize } = useOSStore();
    const isActive = activeWindowId === win.id;
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 });
    const isResizing = useRef(false);
    const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });
    const [pos, setPos] = useState({ x: win.x, y: win.y });
    const [size, setSize] = useState({ w: win.width, h: win.height });
    const windowRef = useRef(null);

    const style = win.maximized
        ? {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "calc(100vh - 52px)",
            borderRadius: 0,
            zIndex: win.zIndex,
        }
        : {
            position: "fixed",
            top: pos.y,
            left: pos.x,
            width: size.w,
            height: size.h,
            borderRadius: 12,
            zIndex: win.zIndex,
        };

    // Drag
    const onTitleMouseDown = (e) => {
        if (win.maximized) return;
        if (e.target.closest(".win-btn")) return;
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY, winX: pos.x, winY: pos.y };
        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragUp);
    };

    const onDragMove = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const newX = Math.max(0, dragStart.current.winX + dx);
        const newY = Math.max(0, dragStart.current.winY + dy);
        setPos({ x: newX, y: newY });
    };

    const onDragUp = () => {
        isDragging.current = false;
        updateWindowPosition(win.id, pos.x, pos.y);
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragUp);
    };

    // Resize
    const onResizeMouseDown = (e) => {
        e.stopPropagation();
        isResizing.current = true;
        resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };
        document.addEventListener("mousemove", onResizeMove);
        document.addEventListener("mouseup", onResizeUp);
    };

    const onResizeMove = (e) => {
        if (!isResizing.current) return;
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;
        const newW = Math.max(400, resizeStart.current.w + dx);
        const newH = Math.max(300, resizeStart.current.h + dy);
        setSize({ w: newW, h: newH });
    };

    const onResizeUp = () => {
        isResizing.current = false;
        updateWindowSize(win.id, size.w, size.h);
        document.removeEventListener("mousemove", onResizeMove);
        document.removeEventListener("mouseup", onResizeUp);
    };

    if (win.minimized) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={windowRef}
                className="os-window select-none"
                style={style}
                initial={{ opacity: 0, scale: 0.92, y: win.y + 30 }}
                animate={{ opacity: 1, scale: 1, y: win.maximized ? 0 : pos.y }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                onMouseDown={() => focusWindow(win.id)}
            >
                {/* === TITLEBAR === */}
                <div
                    className="os-titlebar flex items-center gap-3 px-4 py-3 cursor-default"
                    onMouseDown={onTitleMouseDown}
                    onDoubleClick={() => maximizeWindow(win.id)}
                    style={{ userSelect: "none" }}
                >
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5 win-btn">
                        <button
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group transition-all"
                            style={{ background: "var(--mac-red)" }}
                            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                            title="Close"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-900 leading-none">✕</span>
                        </button>
                        <button
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group transition-all"
                            style={{ background: "var(--mac-yellow)" }}
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                            title="Minimize"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-yellow-900 leading-none">−</span>
                        </button>
                        <button
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group transition-all"
                            style={{ background: "var(--mac-green)" }}
                            onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
                            title="Maximize"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-900 leading-none">⤢</span>
                        </button>
                    </div>

                    {/* Window title */}
                    <div className="flex-1 flex items-center justify-center gap-2">
                        <span className="text-sm" style={{ opacity: 0.8 }}>{win.icon}</span>
                        <span
                            className="text-sm font-medium tracking-wide"
                            style={{ color: "var(--os-text-dim)" }}
                        >
                            {win.title}
                        </span>
                    </div>

                    {/* Windows-style control icons */}
                    <div className="flex items-center gap-1 win-btn">
                        <button
                            className="px-2 py-1 rounded text-xs hover:bg-white hover:bg-opacity-10 transition-all"
                            style={{ color: "var(--os-text-muted)" }}
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                        >
                            ⊟
                        </button>
                        <button
                            className="px-2 py-1 rounded text-xs hover:bg-white hover:bg-opacity-10 transition-all"
                            style={{ color: "var(--os-text-muted)" }}
                            onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
                        >
                            {win.maximized ? "⊡" : "⊞"}
                        </button>
                        <button
                            className="px-2 py-1 rounded text-xs hover:bg-red-500 hover:bg-opacity-80 transition-all"
                            style={{ color: "var(--os-text-muted)" }}
                            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* === CONTENT === */}
                <div
                    className="overflow-auto"
                    style={{
                        height: "calc(100% - 52px)",
                        color: "var(--os-text)",
                    }}
                >
                    {win.component}
                </div>

                {/* === RESIZE HANDLE === */}
                {!win.maximized && (
                    <div
                        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
                        onMouseDown={onResizeMouseDown}
                        style={{
                            background: "radial-gradient(circle at bottom right, rgba(94,129,244,0.3), transparent)",
                            borderRadius: "0 0 12px 0",
                        }}
                    />
                )}

                {/* Active border glow */}
                {isActive && (
                    <div
                        className="absolute inset-0 pointer-events-none rounded-xl"
                        style={{
                            boxShadow: "inset 0 0 0 1px rgba(94,129,244,0.35)",
                        }}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
