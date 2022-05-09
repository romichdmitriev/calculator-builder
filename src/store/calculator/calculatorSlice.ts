/* eslint-disable no-param-reassign */
/* redux-toolkit using Immer.js */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// utils
import MATH_OPERATIONS from '@utils/datasets';
import { parseBrackets } from '@utils/helpers';

interface CalculatorState {
  result: number | string;
}

const initialState: CalculatorState = {
  result: 0,
};

const isMathOperationsIncludeChar = (target: string) => MATH_OPERATIONS.find((item) => item.value === target);

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    // math operations
    equal: (state) => {
      state.result = +parseBrackets(String(state.result));
    },

    // calculator state operations
    deleteLastChar: (state) => {
      if (String(state.result).length === 1) {
        state.result = 0;
        return;
      }

      state.result = String(state.result).slice(0, -1);
    },

    pressKey: (state, action: PayloadAction<string>) => {
      const resultLength = String(state.result).length;
      const lastChar = String(state.result)[resultLength - 1];

      // on first press key
      if (state.result === 0 && !isMathOperationsIncludeChar(action.payload)) {
        state.result = action.payload;
        return;
      }

      // don't do nothing, if math operand pressed twice
      if (
        isMathOperationsIncludeChar(lastChar) &&
        isMathOperationsIncludeChar(action.payload) &&
        lastChar === action.payload
      ) {
        return;
      }

      // replace last math operand, if math operand pressed twice and type of operand changed
      if (
        isMathOperationsIncludeChar(lastChar) &&
        isMathOperationsIncludeChar(action.payload) &&
        lastChar !== action.payload
      ) {
        state.result = `${String(state.result).slice(0, -1)}${action.payload}`;
        return;
      }

      // add space between operators and numbers
      if (isMathOperationsIncludeChar(action.payload)) {
        state.result += ` ${action.payload}`;
        return;
      }

      // add space, if last char is math operand and next char is number
      if (isMathOperationsIncludeChar(lastChar) && !isMathOperationsIncludeChar(action.payload)) {
        state.result += ` ${action.payload}`;
        return;
      }

      state.result += `${action.payload}`;
    },

    reset: (state) => {
      state.result = 0;
    },
  },
});

export const CalculatorSliceActions = calculatorSlice.actions;

export default calculatorSlice.reducer;
