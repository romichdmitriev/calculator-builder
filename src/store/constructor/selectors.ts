import { RootState } from '@store/index';

export const selectIsConstructorMode = (state: RootState) => state.constructorSlice.isConstructorMode;
export const selectCalculatorElements = (state: RootState) => state.constructorSlice.calculatorElements;
export const selectConstructorElements = (state: RootState) => state.constructorSlice.constructorElements;
