import { useDispatch } from 'react-redux';

// store
import { AppDispatch } from '@store/index';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
