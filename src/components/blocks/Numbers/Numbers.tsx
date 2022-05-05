import React, { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

// store
import { CalculatorSliceActions } from '@store/calculator/calculatorSlice';
import useDispatchActions from '@hooks/store/useDispatchActions';

// components
import BaseButton from '@components/elements/BaseButton/BaseButton';

// styles
import styles from '@components/blocks/Numbers/Numbers.module.scss';

interface NumbersProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BUTTONS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];

const Numbers: FC<NumbersProps> = ({ disabled }) => {
  const { pressKey } = useDispatchActions(CalculatorSliceActions);

  const onPressKey = (value: string) => () => {
    pressKey(value);
  };

  return (
    <div className={styles.Numbers} id="Numbers">
      {BUTTONS.map((item) => (
        <BaseButton
          key={`calc-button-${item}`}
          theme="outlined"
          className={clsx({
            [styles.Numbers__button]: item === 0,
          })}
          clickDisabled={disabled}
          onClick={onPressKey(String(item))}
          title={String(item === '.' ? ',' : item)}
        />
      ))}
    </div>
  );
};

export default Numbers;
