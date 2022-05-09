import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

// styles
import styles from '@components/elements/BaseButton/BaseButton.module.scss';

// schema
import { FCWithChildren } from '@schema/helpers';

type ButtonTheme = 'cover' | 'outlined' | 'transparent';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  fullWidth?: boolean;
  clickDisabled?: boolean;
}

const getButtonTheme = (theme: ButtonTheme) => ({
  [styles.button_cover]: theme === 'cover',
  [styles.button_outlined]: theme === 'outlined',
});

const BaseButton: FCWithChildren<BaseButtonProps> = ({
  title = '',
  className,
  onClick,
  theme = 'outlined',
  fullWidth = false,
  children,
  disabled = false,
  clickDisabled = false,
}) => (
  <button
    draggable={false}
    className={clsx(className, styles.button, {
      ...getButtonTheme(theme),
      [styles.button_fullWidth]: fullWidth,
      [styles.button_disabled]: disabled,
      [styles.button_disableClick]: clickDisabled,
    })}
    disabled={disabled}
    type="button"
    onClick={onClick}
  >
    {title}
    {children}
  </button>
);

export default BaseButton;
