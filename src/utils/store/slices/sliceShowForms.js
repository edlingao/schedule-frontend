import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'forms',
  initialState: {
    value: {
      addVisible: false,
      editVisible: false,
    },
  },
  reducers: {
    showAddForm(state) {
      state.value.addVisible = true
    },
    showEditForm(state) {
      state.value.editVisible = true
    },
    hideEditForm(state) {
      state.value.editVisible = false
    },
    hideAddForm(state) {
      state.value.addVisible = false
    }
  },
});

export const { showAddForm, showEditForm, hideEditForm, hideAddForm } = slice.actions;

export const addVisibility = state => state.forms.value.addVisible;
export const editVisibility = state => state.forms.value.editVisible;

export default slice.reducer;
