import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getTaskByDayName, getTaskById, getTaskByTetramino } from 'routes';
import axios from 'utils/axios';


export const slice = createSlice({
  name: 'activities',
  initialState: {
    value: []
  },
  reducers: {
    setTodayActivities(state, {payload}) {
      state.value = payload
    },
    changeActivityTitle(state, {payload}) {
      state.value = state.value.map( (item) => {
        if(item._id === payload.id) {
          item.title = payload.title
        }
        return item
      } )
    },
    changeActivityState(state, {payload}) {
      state.value = payload
    }
  },
});

export const refreshActivities = (dispatch, day = moment().format("dddd").toLocaleLowerCase()) => {
  axios.get(getTaskByDayName(day)).then(({data}) => {
    dispatch(setTodayActivities(data))
  })
}

export const {setTodayActivities, changeActivityTitle, changeActivityState} = slice.actions;

export const todayActivities = state => state.activities.value;

export default slice.reducer;
