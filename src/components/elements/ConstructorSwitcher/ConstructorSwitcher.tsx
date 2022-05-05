import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';

// components
// styles
import styles from '@components/elements/ConstructorSwitcher/ConstructorSwitcher.module.scss';

// assets
import { ReactComponent as Eye } from '@icons/eye.svg';
import { ReactComponent as Arrows } from '@icons/arrows.svg';

interface BaseButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (checked: boolean) => void;
}

const ConstructorSwitcher: FC<BaseButtonProps> = ({ onChange, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked ?? false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    if (onChange) {
      onChange(value);
    }

    setChecked(value);
  };

  return (
    <label className={styles.switcher} htmlFor="constructor-switch">
      <div className={styles.switcher__container}>
        <div className={styles.switcher__buttonWrapper}>
          <Eye
            className={clsx(styles.switcher__icon, {
              [styles.switcher__icon_active]: !checked,
            })}
          />
          Runtime
        </div>

        <div className={styles.switcher__buttonWrapper}>
          <Arrows
            className={clsx(styles.switcher__icon, {
              [styles.switcher__icon_active]: checked,
            })}
          />
          Constructor
        </div>
      </div>

      <div
        className={clsx(styles.switcher__slideBox, {
          [styles.switcher__slideBox_active]: checked,
        })}
      />

      <input
        className={styles.switcher__input}
        checked={checked}
        type="checkbox"
        id="constructor-switch"
        onChange={handleOnChange}
      />
    </label>
  );
};

export default ConstructorSwitcher;
