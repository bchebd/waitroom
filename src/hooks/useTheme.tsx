import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { type Theme, type Accent } from "@/types/theme.types";

interface SetThemeAccentProps {
    newTheme?: Theme;
    newAccent?: Accent;
};

type ThemeContextValue = {
    theme: Theme | null;
    accent: Accent | null;
    setNewTheme: (payload: SetThemeAccentProps) => void;
};

const DEFAULT_THEME: Theme = "light";    
const DEFAULT_ACCENT: Accent = "blue";   

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("waitroom-theme") as Theme | null;
        const value = saved ?? DEFAULT_THEME;
        document.documentElement.setAttribute("data-theme", value);
        return value;
    });

    const [accent, setAccent] = useState<Accent>(() => {
        const saved = localStorage.getItem("waitroom-accent") as Accent | null;
        const value = saved ?? DEFAULT_ACCENT;
        document.documentElement.setAttribute("data-accent", value);
        return value;
    });

    const setNewTheme = ({ newTheme, newAccent }: SetThemeAccentProps) => {
        const html = document.documentElement;

        if (newTheme) {
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("waitroom-theme", newTheme);
            setTheme(newTheme);
        }

        if (newAccent) {
            html.setAttribute("data-accent", newAccent);
            localStorage.setItem("waitroom-accent", newAccent);
            setAccent(newAccent);
        }
    };

     const value = useMemo(() => ({
        theme,
        accent,
        setNewTheme
    }), [theme, accent]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
};