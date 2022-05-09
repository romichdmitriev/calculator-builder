import React, { FC } from 'react';

// store
import useAppSelector from '@hooks/store/useAppSelector';
import { constructorSliceActions } from '@store/constructor/constructorSlice';
import useDispatchActions from '@hooks/store/useDispatchActions';
import { selectIsConstructorMode } from '@store/constructor/selectors';

// component
import ConstructorSwitcher from '@components/elements/ConstructorSwitcher/ConstructorSwitcher';

// styles
import styles from '@components/partials/Header/Header.module.scss';

const Header: FC = () => {
  const isConstructorMode = useAppSelector(selectIsConstructorMode);
  const { toggleConstructorMode } = useDispatchActions(constructorSliceActions);

  const toggleSwitch = () => {
    toggleConstructorMode();
  };

  return (
    <header className={styles.header}>
      <ConstructorSwitcher onChange={toggleSwitch} defaultChecked={isConstructorMode} />
    </header>
  );
};

export default Header;
