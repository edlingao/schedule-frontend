import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getSchedulesDay } from 'routes';
import axios from 'utils/axios';


export const slice = createSlice({
  name: 'tetraminos',
  initialState: {
    value: {
      today: [],
      tomorrow: [],
    },
  },
  reducers: {
    setTetraminos(state, {payload}) {
      state.value.today = payload.today
      state.value.tomorrow = payload.tomorrow
    },
  },
});

export const refreshTetraminos = dispatch => {
  const day = moment().format("dddd").toLocaleLowerCase()

  axios.get(getSchedulesDay(day)).then(({data}) => {
    dispatch(setTetraminos({today: data[0].activities, tomorrow: data[1].activities}))
  })
}
export const { setTetraminos } = slice.actions;

export const todayTetraminos = state => state.tetraminos.value.today;
export const tomorrowTetraminos = state => state.tetraminos.value.tomorrow;

export default slice.reducer;
