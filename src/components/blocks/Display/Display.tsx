import React, { FC, useEffect, useRef } from 'react';

// store
import useAppSelector from '@hooks/store/useAppSelector';
import selectCalculatingValue from '@store/calculator/selectors';

// styles
import styles from '@components/blocks/Display/Display.module.scss';
import clsx from 'clsx';

interface DisplayProps {
  showDefaultValue?: boolean;
  defaultValue?: string;
}

const Display: FC<DisplayProps> = ({ showDefaultValue, defaultValue }) => {
  const displayValue = useRef<HTMLDivElement>(null);
  const value = useAppSelector(selectCalculatingValue);

  const getValue = () => {
    if (showDefaultValue) {
      return defaultValue;
    }

    const isResultNaN = Number.isNaN(value);
    const isFloat = !Number.isInteger(+value);

    const isExpression = /[+-/x()]/.test(value.toString().replace('.', '')) || /\d+.\d+/.test(value.toString());

    if (isResultNaN) {
      return 'Не определено';
    }

    return isFloat && !isExpression ? parseFloat(value.toString()).toFixed(6) : value;
  };

  useEffect(() => {
    if (displayValue.current) {
      displayValue.current.scrollLeft = displayValue.current.scrollWidth;
    }
  }, [value, displayValue]);

  return (
    <div className={clsx(styles.Display)}>
      <div className={styles.Display__button} ref={displayValue}>
        <div style={{ textAlign: 'end', width: 'max-content', minWidth: '100%' }}>{getValue()}</div>
      </div>
    </div>
  );
};

export default Display;
