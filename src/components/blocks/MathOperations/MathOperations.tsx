import React, { ButtonHTMLAttributes, FC } from 'react';

// store
import useDispatchActions from '@hooks/store/useDispatchActions';
import { CalculatorSliceActions } from '@store/calculator/calculatorSlice';

// components
import BaseButton from '@components/elements/BaseButton/BaseButton';

// styles
import styles from '@components/blocks/MathOperations/MathOperations.module.scss';

// utils
import MATH_OPERATIONS from '@utils/datasets';

interface MathOperationsProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MathOperations: FC<MathOperationsProps> = ({ disabled }) => {
  const { pressKey } = useDispatchActions(CalculatorSliceActions);

  const onPressKey = (value: string) => () => {
    pressKey(value);
  };

  return (
    <div className={styles.mathOperations}>
      {MATH_OPERATIONS.map((item) => (
        <BaseButton
          key={`math-operand-${item.value}-btn`}
          className={styles.mathOperations__button}
          theme="outlined"
          title={item.value}
          onClick={onPressKey(String(item.value))}
          clickDisabled={disabled}
        />
      ))}
    </div>
  );
};

export default MathOperations;
