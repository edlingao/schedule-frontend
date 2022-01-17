import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/session-slice'
import formsReducer from './slices/sliceShowForms'
import tetraminosReducer from './slices/tetraminosSlice'

export default configureStore({
  reducer: {
    session: sessionReducer,
    forms: formsReducer,
    tetraminos: tetraminosReducer
  },
});
