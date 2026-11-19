import React from 'react';

/**
 * Standard reusable button component with variant styling:
 * primary (Amazon Yellow/Orange), secondary (Amazon Light Blue), outline, danger
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'buy-now' | 'outline' | 'danger'
  size = 'medium', // 'small' | 'medium' | 'large'
  disabled = false,
  className = '',
  fullWidth = false,
  ...rest
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-block' : '',
    disabled ? 'btn-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
