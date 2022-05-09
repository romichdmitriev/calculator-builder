import { useMemo } from 'react';
import useAppDispatch from '@hooks/store/useAppDispatch';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

type HookResult<T extends ActionCreatorsMapObject> = { [K in keyof T]: T[K] };

function useDispatchActions<A extends ActionCreatorsMapObject>(actions: A): HookResult<A> {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
}

export default useDispatchActions;
