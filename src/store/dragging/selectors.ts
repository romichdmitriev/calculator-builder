import { RootState } from '@store/index';

const selectDraggingInfo = (state: RootState) => state.draggingInfoSlice.draggingInfo;

export default selectDraggingInfo;
