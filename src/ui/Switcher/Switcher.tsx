import type { FC } from "react";

import styles from "@/ui/Switcher/Switcher.module.scss";
import classNames from "classnames/bind";
import { useTheme } from "@/hooks/useTheme";

const cn = classNames.bind(styles);

export const Switcher: FC = () => {
    const {theme, setNewTheme} = useTheme();

    return (
        <button 
            type="button"
            onClick={() => setNewTheme({ newTheme: theme === "dark" ? "light" : "dark" })}
            className={cn("switch")}
            aria-label="Toggle theme"
        >
            <span className={cn("track", { dark: theme === "dark"})}>
                <span className={cn("thumb", { dark: theme === "dark" })} />
            </span>

            <span className={cn("label")}>
                {theme === "dark" ? "Dark" : "Light"}
            </span>
        </button>
    );
};