import React from "react";
import { motion } from "framer-motion";
import { personalInfo, skills, experience, projects } from "../data/resumeData";

export default function AboutWindow() {
    const totalProjects = projects.length;
    const totalSkills = skills.reduce((a, s) => a + s.packages.length, 0);
    const currentRole = experience[0];

    const sysInfo = [
        { label: "User", value: personalInfo.name, icon: "👤" },
        { label: "Role", value: currentRole.role, icon: "💼" },
        { label: "Organization", value: currentRole.company, icon: "🏢" },
        { label: "Location", value: personalInfo.location, icon: "📍" },
        { label: "OS", value: "Zealous OS v2.0.26", icon: "🖥️" },
        { label: "Kernel", value: "React 18 + Node 20", icon: "⚙️" },
        { label: "Shell", value: "zsh + oh-my-zsh", icon: "🐚" },
        { label: "Editor", value: "VS Code (vim keybinds)", icon: "📝" },
        { label: "Theme", value: "Catppuccin Mocha", icon: "🎨" },
        { label: "Packages", value: `${totalSkills} installed`, icon: "📦" },
        { label: "Projects", value: `${totalProjects} active`, icon: "🚀" },
        { label: "Status", value: "Available for hire", icon: "✅" },
    ];

    return (
        <div className="h-full overflow-auto p-6" style={{ color: "var(--os-text)" }}>
            {/* neofetch-style header */}
            <motion.div
                className="flex gap-6 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* ASCII Art */}
                <div
                    className="hidden sm:block text-xs font-mono leading-tight flex-shrink-0"
                    style={{ color: "var(--os-accent)", lineHeight: "1.25" }}
                >
                    <pre>{`
  +----------------------------------+
  |  ZEALOUS OS  v2.0.26             |
  |  maheshwar@zealous-os            |
  |  Backend Developer               |
  |  Chennai, India                  |
  +----------------------------------+

  ##   ##  ##   ##
  ### ###  ### ###
  #######  #######
  ## # ##  ## # ##
  ##   ##  ##   ##
  Maheshwar Muthukumar
          `.trim()}</pre>
                </div>

                {/* Sysinfo */}
                <div className="flex-1 space-y-1.5">
                    {sysInfo.map((item, i) => (
                        <motion.div
                            key={item.label}
                            className="flex items-center gap-2 text-sm"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <span className="w-32 font-mono text-xs" style={{ color: "var(--os-accent)" }}>
                                {item.icon} {item.label}:
                            </span>
                            <span style={{ color: "var(--os-text)" }}>{item.value}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Color palette */}
            <motion.div
                className="flex gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {["#5e81f4", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#f97316", "#ec4899"].map((c) => (
                    <div
                        key={c}
                        className="w-8 h-8 rounded-lg"
                        style={{ background: c, boxShadow: `0 0 10px ${c}60` }}
                        title={c}
                    />
                ))}
            </motion.div>

            {/* Bio */}
            <motion.div
                className="rounded-xl p-4 mb-6"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--os-text-muted)" }}>
                    /etc/profile — Bio
                </div>
                <p className="text-sm" style={{ color: "var(--os-text-dim)", lineHeight: 1.8 }}>
                    {personalInfo.bio}
                </p>
                <p className="text-sm mt-3" style={{ color: "var(--os-text-dim)", lineHeight: 1.8 }}>
                    Focused on backend systems, clean API design, and making databases perform efficiently. Currently exploring system architecture and building scalable REST services.
                </p>
            </motion.div>

            {/* Fun stats */}
            <motion.div
                className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {[
                    { label: "Lines of Code", value: "500K+", icon: "📜", color: "#5e81f4" },
                    { label: "Bugs Fixed", value: "∞", icon: "🐛", color: "#10b981" },
                    { label: "Coffee Cups", value: "∞", icon: "☕", color: "#f59e0b" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        className="glass-card rounded-xl p-4 text-center"
                        whileHover={{ y: -3 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    >
                        <div className="text-3xl mb-2">{s.icon}</div>
                        <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-xs mt-1" style={{ color: "var(--os-text-muted)" }}>{s.label}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
