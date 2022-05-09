import React from 'react';

import BaseButton from '@components/elements/BaseButton/BaseButton';

export default {
  component: BaseButton,
  title: 'Base Button',
};

export const Default = () => <BaseButton title="1" />;

export const OutlinedButton = () => <BaseButton title="=" theme="cover" />;

export const FullWidth = () => (
  <div style={{ width: 200 }}>
    <BaseButton title="=" theme="cover" fullWidth />
  </div>
);

export const Disabled = () => <BaseButton title="=" disabled />;

export const OutlinedWithChildren = () => (
  <BaseButton>
    <div style={{ display: 'flex', gap: 10 }}>
      <span>10</span>
      <span>20</span>
    </div>
  </BaseButton>
);
