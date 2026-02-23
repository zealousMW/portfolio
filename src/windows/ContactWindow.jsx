import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { terminalCommands, personalInfo } from "../data/resumeData";
import { useOSStore } from "../store/useOSStore";
import DoomWindow from "./DoomWindow";

const WELCOME = `
╔═══════════════════════════════════════════════╗
║      ZEALOUS OS ™  Interactive Terminal       ║
║         Type 'help' for available commands    ║
╚═══════════════════════════════════════════════╝

  Welcome, visitor! You're connected to maheshwar@zealous-os
  Session started: ${new Date().toLocaleString()}
`.trim();

export default function ContactWindow() {
    const [history, setHistory] = useState([{ type: "system", text: WELCOME }]);
    const [input, setInput] = useState("");
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (rawCmd) => {
        const cmd = rawCmd.trim().toLowerCase();
        setCmdHistory((prev) => [rawCmd, ...prev]);
        setHistoryIdx(-1);

        const newHistory = [
            ...history,
            { type: "input", text: `$ ${rawCmd}` },
        ];

        if (cmd === "") {
            setHistory(newHistory);
            setInput("");
            return;
        }

        // ── Easter egg ────────────────────────────────────────────
        if (cmd === "doom") {
            setHistory([
                ...newHistory,
                { type: "output", text: "🔫 Launching DOOM (1993)...\n   id Software  •  RIP AND TEAR!\n   Mobile users will see a warning before start." },
            ]);
            setTimeout(() => {
                useOSStore.getState().openWindow(
                    "doom",
                    "DOOM (1993)",
                    <DoomWindow />,
                    "🔫",
                    800,
                    560
                );
            }, 400);
            setInput("");
            return;
        }
        // ─────────────────────────────────────────────────────────────

        const handler = terminalCommands[cmd];

        if (!handler) {
            setHistory([
                ...newHistory,
                {
                    type: "error",
                    text: `bash: ${cmd}: command not found\nType 'help' to see available commands.`,
                },
            ]);
        } else if (handler.clear) {
            setHistory([{ type: "system", text: WELCOME }]);
        } else {
            if (handler.output) {
                setHistory([...newHistory, { type: "output", text: handler.output }]);
            }
            if (handler.action) {
                setTimeout(() => handler.action(), 200);
            }
        }

        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCommand(input);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
            setHistoryIdx(newIdx);
            if (cmdHistory[newIdx]) setInput(cmdHistory[newIdx]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIdx = Math.max(historyIdx - 1, -1);
            setHistoryIdx(newIdx);
            setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
        } else if (e.key === "Tab") {
            e.preventDefault();
            const cmds = Object.keys(terminalCommands);
            const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    const quickCmds = ["help", "resume", "email", "github", "linkedin", "skills", "whoami", "doom"];

    return (
        <div
            className="h-full flex flex-col font-mono"
            style={{
                background: "rgba(5,5,15,0.95)",
                color: "rgba(180,210,255,0.9)",
            }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Quick commands */}
            <div
                className="flex flex-wrap gap-1.5 px-4 py-2 border-b"
                style={{ borderColor: "rgba(94,129,244,0.15)", background: "rgba(0,0,0,0.3)" }}
            >
                <span className="text-[10px] uppercase tracking-widest self-center" style={{ color: "rgba(94,129,244,0.5)" }}>
                    Quick:
                </span>
                {quickCmds.map((cmd) => (
                    <motion.button
                        key={cmd}
                        className="px-2 py-0.5 rounded text-[11px] font-mono"
                        style={{
                            background: "rgba(94,129,244,0.1)",
                            border: "1px solid rgba(94,129,244,0.2)",
                            color: "rgba(94,129,244,0.8)",
                            cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.05, background: "rgba(94,129,244,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); handleCommand(cmd); }}
                    >
                        {cmd}
                    </motion.button>
                ))}
            </div>

            {/* Terminal output */}
            <div className="flex-1 overflow-auto p-4 text-sm" style={{ lineHeight: 1.7 }}>
                {history.map((entry, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="mb-2"
                    >
                        {entry.type === "system" && (
                            <pre
                                className="text-xs whitespace-pre-wrap"
                                style={{ color: "rgba(94,129,244,0.75)", fontFamily: "inherit" }}
                            >
                                {entry.text}
                            </pre>
                        )}
                        {entry.type === "input" && (
                            <span style={{ color: "#10b981" }}>{entry.text}</span>
                        )}
                        {entry.type === "output" && (
                            <pre
                                className="whitespace-pre-wrap text-xs"
                                style={{ color: "rgba(180,210,255,0.85)", fontFamily: "inherit", paddingLeft: "1rem" }}
                            >
                                {entry.text}
                            </pre>
                        )}
                        {entry.type === "error" && (
                            <pre
                                className="whitespace-pre-wrap text-xs"
                                style={{ color: "#ef4444", fontFamily: "inherit", paddingLeft: "1rem" }}
                            >
                                {entry.text}
                            </pre>
                        )}
                    </motion.div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input line */}
            <div
                className="flex items-center px-4 py-3 border-t"
                style={{ borderColor: "rgba(94,129,244,0.15)", background: "rgba(0,0,0,0.4)" }}
            >
                <span style={{ color: "#10b981", marginRight: 8 }}>
                    maheshwar@zealous-os:~$
                </span>
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none text-sm font-mono"
                        style={{
                            color: "rgba(180,210,255,0.9)",
                            caretColor: "#5e81f4",
                        }}
                        placeholder="type a command..."
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>
                <span className="cursor-blink inline-block w-2 h-4 ml-1" style={{ background: "#5e81f4" }} />
            </div>
        </div>
    );
}
