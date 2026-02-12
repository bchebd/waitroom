import type { ChangeEvent, FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/ui/Input/Input.module.scss';

interface InputProps {
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

export const Input: FC<InputProps> = ({
    label,
    placeholder,
    value, 
    onChange, 
    error, 
    id, 
    customClass, 
    autoComplete = 'off'
}): ReactElement => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={cn('input', customClass?.container)}>
            {label && <p className={cn('input__label', customClass?.label)}>{label}</p>}

            <label htmlFor={id}>
                <input 
                    type='text'
                    placeholder={placeholder}
                    value={value} 
                    onChange={handleChange}  
                    className={cn('input__element', customClass?.input, error && "input__element__error")}
                    id={id}
                    autoComplete={autoComplete}
                />
            </label>

            {error && <p className={cn('input__error', customClass?.error)}>{error}</p>}
        </div>
    );
};