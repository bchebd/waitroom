import { useState, type ChangeEvent, type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/ui/InputPassword/InputPassword.module.scss';

import { IconClosedEye, IconEye } from "@/assets/svg";

interface InputPasswordProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    id: string;
    customClass?: {
        container?: string,
        label?: string,
        input?: string,
        error?: string,
    };
    autoComplete?: 'on' | 'off';
};

const cn = classNames.bind(styles);

export const InputPassword: FC<InputPasswordProps> = ({
    label,
    placeholder,
    value, 
    onChange, 
    error, 
    id, 
    customClass, 
    autoComplete = 'off'
}): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className={cn('input', customClass?.container)}>
            {label && <p className={cn('input__label', customClass?.label)}>{label}</p>}

            <label htmlFor={id}>
                <input 
                    type={visible ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value} 
                    onChange={handleChange}  
                    className={cn('input__element', customClass?.input, error && "input__element__error")}
                    id={id}
                    autoComplete={autoComplete}
                />
                <button 
                    type="button"
                    className={cn('input__button')}
                    onClick={toggleVisible}
                >
                    {visible ? IconClosedEye : IconEye}
                </button>
            </label>

            {error && <p className={cn('input__error', customClass?.error)}>{error}</p>}
        </div>
    );
};