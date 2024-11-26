import './button.scss';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...rest }: Readonly<ButtonProps>) {
  return (
    <button className='ec-button' {...rest}>
      {children}
    </button>
  );
}

interface IconProps {
  children: ReactNode;
}

export function Icon({ children }: Readonly<IconProps>) {
  return <em className='ec-button__icon'>{children}</em>;
}

Button.Icon = Icon;
export default Button;
