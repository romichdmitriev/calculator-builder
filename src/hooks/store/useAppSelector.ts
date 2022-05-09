import { TypedUseSelectorHook, useSelector } from 'react-redux';

// store
import type { RootState } from '@store/index';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
