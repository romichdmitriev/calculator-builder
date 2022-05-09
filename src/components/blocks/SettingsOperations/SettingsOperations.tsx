import React, { ButtonHTMLAttributes, FC } from 'react';

// store
import useDispatchActions from '@hooks/store/useDispatchActions';
import { CalculatorSliceActions } from '@store/calculator/calculatorSlice';

// components
import BaseButton from '@components/elements/BaseButton/BaseButton';
import { FiDelete } from 'react-icons/fi';

// styles
import styles from '@components/blocks/MathOperations/MathOperations.module.scss';

interface SettingsOperationsProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SettingsOperations: FC<SettingsOperationsProps> = ({ disabled }) => {
  const { pressKey, reset, deleteLastChar } = useDispatchActions(CalculatorSliceActions);

  const onPressKey = (value: string) => () => {
    pressKey(value);
  };

  return (
    <div className={styles.mathOperations}>
      <BaseButton
        className={styles.mathOperations__button}
        theme="outlined"
        title="C"
        onClick={reset}
        clickDisabled={disabled}
      />
      <BaseButton
        className={styles.mathOperations__button}
        theme="outlined"
        title="("
        onClick={onPressKey('(')}
        clickDisabled={disabled}
      />
      <BaseButton
        className={styles.mathOperations__button}
        theme="outlined"
        title=")"
        onClick={onPressKey(')')}
        clickDisabled={disabled}
      />
      <BaseButton
        className={styles.mathOperations__button}
        theme="outlined"
        onClick={deleteLastChar}
        clickDisabled={disabled}
      >
        <FiDelete />
      </BaseButton>
    </div>
  );
};

export default SettingsOperations;
