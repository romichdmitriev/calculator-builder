import { configureStore } from '@reduxjs/toolkit';

// store
import calculator from '@store/calculator/calculatorSlice';
import constructor from '@store/constructor/constructorSlice';
import draggingInfo from '@store/dragging/draggingSlice';

export const store = configureStore({
  reducer: {
    calculatorSlice: calculator,
    constructorSlice: constructor,
    draggingInfoSlice: draggingInfo,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
