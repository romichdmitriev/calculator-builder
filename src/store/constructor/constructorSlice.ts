/* eslint-disable no-param-reassign */
/* redux-toolkit using Immer.js */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// utils
import ConstructorElement from '@schema/Constructor';
import { CONSTRUCTOR_ELEMENTS } from '@utils/datasets';

interface ConstructorState {
  isConstructorMode: boolean;
  calculatorElements: ConstructorElement[];
  constructorElements: ConstructorElement[];
}

const initialState: ConstructorState = {
  isConstructorMode: true,
  calculatorElements: [],
  constructorElements: CONSTRUCTOR_ELEMENTS as ConstructorElement[],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    toggleConstructorMode: (state) => ({
      ...state,
      isConstructorMode: !state.isConstructorMode,
    }),

    addElement: (state, action: PayloadAction<{ element: ConstructorElement; targetIndex: number }>) => {
      const constructorEl = state.constructorElements.find((item) => item.id === action.payload.element.parentId);

      if (constructorEl) {
        constructorEl.active = false;
      }

      if (action.payload.element.component === 'Display') {
        state.calculatorElements.unshift(action.payload.element);
        return;
      }

      state.calculatorElements.splice(action.payload.targetIndex, 0, action.payload.element);
    },

    sortElements: (
      state,
      { payload: { draggedIndex, targetIndex } }: PayloadAction<{ draggedIndex: number; targetIndex: number }>,
    ) => {
      const draggedEl = state.calculatorElements[draggedIndex];

      const filteredElements = state.calculatorElements.filter((item, index) => index !== draggedIndex);

      const isCalcElementsHasDisplay = state.calculatorElements.find((item) => item.component === 'Display');

      filteredElements.splice(isCalcElementsHasDisplay && !targetIndex ? targetIndex + 1 : targetIndex, 0, draggedEl);

      state.calculatorElements = filteredElements;
    },

    removeElement: (
      state,
      { payload: { targetId, parentId } }: PayloadAction<{ targetId: string; parentId: string }>,
    ) => {
      state.calculatorElements = state.calculatorElements.filter((item) => item.id !== targetId);

      const constructorEl = state.constructorElements.find((item) => item.id === parentId);

      if (constructorEl) {
        constructorEl.active = true;
      }
    },
  },
});

export const constructorSliceActions = constructorSlice.actions;

export default constructorSlice.reducer;
