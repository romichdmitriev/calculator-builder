/* eslint-disable no-param-reassign */
/* redux-toolkit using Immer.js */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DroppableAreas } from 'srcApp';

interface DraggingInfo {
  draggingId: string | null;
  draggingIndex: number | null;
  destinationDropIndex: number | null;
  draggingSourceId: keyof typeof DroppableAreas | null;
}

interface ConstructorState {
  draggingInfo: DraggingInfo;
}

const initialState: ConstructorState = {
  draggingInfo: {
    draggingId: null,
    destinationDropIndex: null,
    draggingSourceId: null,
    draggingIndex: null,
  },
};

export const draggingSlice = createSlice({
  name: 'dragging',
  initialState,
  reducers: {
    setDroppableDestinationIndex: (state, action: PayloadAction<DraggingInfo>) => {
      state.draggingInfo = action.payload;
    },
  },
});

export const draggingSliceActions = draggingSlice.actions;

export default draggingSlice.reducer;
