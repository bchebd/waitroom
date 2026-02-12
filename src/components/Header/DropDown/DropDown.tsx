import { useRef, type FC, type ReactNode, type RefObject } from "react";
import classNames from "classnames/bind";

import styles from "@/components/Header/DropDown/DropDown.module.scss"
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface DropDownProps {
    children: ReactNode,
    isOpen: boolean,
    closeMenu: (open: boolean) => void;
    btnRef: RefObject<HTMLButtonElement | null>
};

const cn = classNames.bind(styles);

export const DropDown: FC<DropDownProps> = ({ children, isOpen, closeMenu, btnRef }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside({ ref: menuRef, handler: () => closeMenu(false), closeBtn: btnRef });

    return (
        <div className={cn("dropdown", isOpen && "open")} ref={menuRef}>
            {children}
        </div>
    );
};