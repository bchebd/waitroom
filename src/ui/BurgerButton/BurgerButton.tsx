import classNames from "classnames/bind";
import type { FC, RefObject } from "react";

import styles from "@/ui/BurgerButton/BurgerButton.module.scss";

interface BurgerButtonProps {
    toggleMenu: () => void,
    isOpen: boolean,
    btnRef?: RefObject<HTMLButtonElement | null>
};

const cn = classNames.bind(styles);

export const BurgerButton: FC<BurgerButtonProps> = ({ toggleMenu, isOpen, btnRef}) => {

    return(
        <button 
            type="button" 
            onClick={toggleMenu} 
            className={cn("close", isOpen && "open")} 
            ref={btnRef}
        >
            <span className={cn("line")}></span>
            <span className={cn("line")}></span>
            <span className={cn("line")}></span>
        </button>
    );
};