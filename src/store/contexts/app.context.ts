import { Dispatch, createContext } from 'react';
import { ActionType } from '@/hooks/useCreateReducer';
import { AppInitialState } from '../state/app.state';

export interface AppContextProps {
  state: AppInitialState;
  dispatch: Dispatch<ActionType<AppInitialState>>;
}

const AppContext = createContext<AppContextProps>(undefined!);

export default AppContext;