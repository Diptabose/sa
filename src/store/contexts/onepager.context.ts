import { Dispatch, createContext } from 'react';
import { OnepagerInitialState } from '@/store/state/onepager.state';
import { ActionType } from '@/hooks/useCreateReducer';

export interface OnepagerContextProps {
  state: OnepagerInitialState;
  dispatch: Dispatch<ActionType<OnepagerInitialState>>;
}

const OnepagerContext = createContext<OnepagerContextProps>(undefined!);

export default OnepagerContext;
