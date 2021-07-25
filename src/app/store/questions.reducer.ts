import { createReducer, on } from '@ngrx/store';
// import { increment, decrement, reset } from './questions.actions';
import {numberOfQuestions} from './questions.actions';
 
export const initialState = 0;

const _qustionsReducer = createReducer(
  initialState,
  on(numberOfQuestions, (state) => state + 1)
);
 
export function qustionsReducer(state, action) {
  return _qustionsReducer(state, action);
}
