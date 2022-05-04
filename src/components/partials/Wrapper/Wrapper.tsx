import React from 'react';

// schema
import { FCWithChildren } from '@schema/helpers';

// styles
import styles from '@components/partials/Wrapper/Wrapper.module.scss';

interface OwnProps {}

const Wrapper: FCWithChildren<OwnProps> = ({ children }) => (
  <div className={styles.centeredContentContainer}>{children}</div>
);

export default Wrapper;
