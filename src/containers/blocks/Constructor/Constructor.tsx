import React, { FC } from 'react';

// styles
import styles from './Constructor.module.scss';

// assets
import { ReactComponent as AddIcon } from '@icons/drag-component.svg';

interface ConstructorProps {}

const Constructor: FC<ConstructorProps> = () => (
  <div className={styles.Constructor}>
    <AddIcon />

    <p className={styles.Constructor__text}>
      <span className={styles.Constructor__text_pink}>Перетащите сюда</span>
      <span>любой элемент из левой панели</span>
    </p>
  </div>
);

export default Constructor;
