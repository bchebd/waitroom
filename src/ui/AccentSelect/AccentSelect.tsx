import classNames from "classnames/bind";
import { useState, type FC, type ReactElement } from "react";

import styles from "@/ui/AccentSelect/AccentSelect.module.scss";

interface AccentSelectProps {
  value: string;
  options: [string, string][];
  onSelect: (color: string) => void;
}

const cn = classNames.bind(styles);

export const AccentSelect: FC<AccentSelectProps> = ({ value, options, onSelect }): ReactElement => {
    const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsDropdownActive(!isDropdownActive);
    };

    const handleSelect = (color: string) => {
        onSelect(color);
        setIsDropdownActive(false);
    };

    const renderOptions = () => {
        return options.map((option: [string, string]) => {
            return (
                <li className={cn("option")} key={option[1]} onClick={() => handleSelect(option[0])}>
                    <div style={{ background: option[1] }}></div>
                    <span>{option[0]}</span>
                </li>
            )
        })
    }

    return (
        <div className={cn('select')}>
            <div className={cn("select__picked")} onClick={toggleMenu}>
                <div></div>
                <span>{value}</span>
            </div>
            <ul className={cn('select__dropdown', { 'is-active': isDropdownActive })}>
                {renderOptions()}
            </ul>
        </div>
    );
};