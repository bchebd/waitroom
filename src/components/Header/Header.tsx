import classNames from "classnames/bind";
import { type FC } from "react";
import Avatar from "react-avatar";

import { useHeader } from "@/components/Header/Header.hooks";
import { Button } from "@/ui/Button/Button";
import { IconReload } from "@/assets/svg";
import { Switcher } from "@/ui/Switcher/Switcher";
import { DropDown } from "@/components/Header/DropDown/DropDown";
import { AccentSelect } from "@/ui/AccentSelect/AccentSelect";
import type { Accent } from "@/types/theme.types";
import { colors } from "@/constants/colors";
import { BurgerButton } from "@/ui/BurgerButton/BurgerButton";

import styles from "@/components/Header/Header.module.scss";

const cn = classNames.bind(styles);

export const Header: FC = () => {
    const { 
        name, 
        admin, 
        handleLogout, 
        handleRefresh,
        toggleMenu,
        btnRef,
        isOpen,
        setIsOpen,
        accent,
        setNewTheme 
    } = useHeader();

    return (
        <header className={cn("header")}>
            <div className={cn("container")}>
                <div className={cn("left")}>
                    <Avatar name={name} round size="44" title={name} textSizeRatio={2} />
                    <div className={cn("userText")}>
                        <span className={cn("welcome")}>Willkommen zurück,</span>
                        <span className={cn("name")} title={"role: " + (admin ? "admin" : "student")}>{name} ({admin ? "admin" : "student"})</span>
                    </div>
                    <button type="button" onClick={handleRefresh} className={cn("reload")} title="fetch profile data">
                        {IconReload}
                    </button>
                </div>

                <div className={cn("right")}>
                    <Button
                        sType="secondary"
                        className={cn("btn")}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <BurgerButton 
                        toggleMenu={toggleMenu}
                        btnRef={btnRef}
                        isOpen={isOpen}
                    />
                </div>
                <div className={cn("ghost__wrapper")}></div>
                <DropDown isOpen={isOpen} closeMenu={setIsOpen} btnRef={btnRef}>
                    <Switcher />
                    <AccentSelect 
                        value={accent as string}
                        options={colors}
                        onSelect={(color) => setNewTheme({ newAccent: color as Accent})}
                    />
                </DropDown>
            </div>
        </header>
    );
};
