import { FC, PropsWithChildren } from 'react';

// Functional Component with children prop
export type FCWithChildren<T> = FC<PropsWithChildren<T>>;
