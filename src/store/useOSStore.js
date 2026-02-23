import { create } from "zustand";

export const useOSStore = create((set, get) => ({
    // === THEME ===
    theme: "dark",
    setTheme: (theme) => {
        document.documentElement.setAttribute("data-theme", theme === "dark" ? "" : theme);
        set({ theme });
    },

    // === BOOT ===
    bootComplete: false,
    setBootComplete: () => set({ bootComplete: true }),

    // === WINDOWS ===
    windows: [],
    activeWindowId: null,
    zCounter: 100,

    openWindow: (id, title, component, icon, width = 780, height = 520) => {
        const { windows, zCounter } = get();
        const existing = windows.find((w) => w.id === id);
        if (existing) {
            // bring to front
            set({
                windows: windows.map((w) =>
                    w.id === id ? { ...w, minimized: false, zIndex: zCounter + 1 } : w
                ),
                activeWindowId: id,
                zCounter: zCounter + 1,
            });
            return;
        }
        const offset = windows.length * 28;
        set({
            windows: [
                ...windows,
                {
                    id,
                    title,
                    component,
                    icon,
                    width,
                    height,
                    x: 100 + offset,
                    y: 60 + offset,
                    minimized: false,
                    maximized: false,
                    zIndex: zCounter + 1,
                },
            ],
            activeWindowId: id,
            zCounter: zCounter + 1,
        });
    },

    closeWindow: (id) => {
        const { windows } = get();
        const remaining = windows.filter((w) => w.id !== id);
        set({
            windows: remaining,
            activeWindowId: remaining.length > 0 ? remaining[remaining.length - 1].id : null,
        });
    },

    minimizeWindow: (id) => {
        set((state) => ({
            windows: state.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
            activeWindowId: null,
        }));
    },

    maximizeWindow: (id) => {
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, maximized: !w.maximized } : w
            ),
        }));
    },

    focusWindow: (id) => {
        const { zCounter } = get();
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, zIndex: zCounter + 1 } : w
            ),
            activeWindowId: id,
            zCounter: zCounter + 1,
        }));
    },

    updateWindowPosition: (id, x, y) => {
        set((state) => ({
            windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
        }));
    },

    updateWindowSize: (id, width, height) => {
        set((state) => ({
            windows: state.windows.map((w) => (w.id === id ? { ...w, width, height } : w)),
        }));
    },

    // === TASKBAR ===
    taskbarItems: [],

    // === NOTIFICATIONS ===
    notifications: [],
    addNotification: (msg, type = "info") => {
        const id = Date.now();
        set((state) => ({
            notifications: [...state.notifications, { id, msg, type, timestamp: new Date() }],
        }));
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
            }));
        }, 4000);
    },
}));
