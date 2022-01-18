import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/session-slice'
import formsReducer from './slices/sliceShowForms'
import tetraminosReducer from './slices/tetraminosSlice'
import activitiesReducer from './slices/activities-slice'

export default configureStore({
  reducer: {
    session: sessionReducer,
    forms: formsReducer,
    tetraminos: tetraminosReducer,
    activities: activitiesReducer,
  },
});
