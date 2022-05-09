import { RootState } from '@store/index';

const selectCalculatingValue = (state: RootState) => state.calculatorSlice.result;

export default selectCalculatingValue;
