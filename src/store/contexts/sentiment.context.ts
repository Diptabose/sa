import { Dispatch, createContext } from 'react';
import { ActionType } from '@/hooks/useCreateReducer';
import { SentimentInitialState } from '../state/sentiment.state';

export interface SentimentContextProps {
  state: SentimentInitialState;
  dispatch: Dispatch<ActionType<SentimentInitialState>>;
}

const SentimentContext = createContext<SentimentContextProps>(undefined!);

export default SentimentContext;