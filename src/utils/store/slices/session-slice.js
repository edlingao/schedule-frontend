import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios'

export const slice = createSlice({
  name: 'session',
  initialState: {
    value: localStorage.getItem('auth') || false,
  },
  reducers: {
    login: (state, { payload }) => {
      axios.defaults.headers.common['auth-token'] = payload
      localStorage.setItem('auth', payload)
      state.value = payload
    },
    logout: state => {
      state.value = false;
      axios.defaults.headers.common['auth-token'] = null
      localStorage.removeItem('auth')
      state.value = false

    },
  },
});

export const { login, logout } = slice.actions;

export const selectSession = state => state.session.value;

export default slice.reducer;
