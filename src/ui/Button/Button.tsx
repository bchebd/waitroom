import { type ButtonHTMLAttributes, type FC } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Button/Button.module.scss';

const cn = classNames.bind(styles);

interface Button extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode,
  sType?: "primary" | "secondary" | "",
  type?: 'button' | 'submit' | 'reset',
  isDisabled?: boolean,
  className?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

const Button: FC<Button> = ({ children, sType = "primary", type = 'button', onClick, isDisabled = false, className }) => {
  return (
    <button
      className={`${className ?? ""} ${cn(sType)}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export { Button };