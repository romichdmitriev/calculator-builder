import React, { ButtonHTMLAttributes, FC } from 'react';

// store
import { CalculatorSliceActions } from '@store/calculator/calculatorSlice';
import useDispatchActions from '@hooks/store/useDispatchActions';

// components
import BaseButton from '@components/elements/BaseButton/BaseButton';

// styles
import styles from '@components/blocks/Equal/Equal.module.scss';

interface EqualProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Equal: FC<EqualProps> = ({ disabled }) => {
  const { equal } = useDispatchActions(CalculatorSliceActions);

  return (
    <div className={styles.Equal} id="Equal">
      <BaseButton theme="cover" title="=" fullWidth onClick={equal} clickDisabled={disabled} />
    </div>
  );
};

export default Equal;
