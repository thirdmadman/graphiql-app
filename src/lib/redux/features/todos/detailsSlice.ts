import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFormState {
  isExecDisable: boolean;
  value: number;
}

export const initialState: IFormState = {
  isExecDisable: false,
  value: 0,
};

export const detailsSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    disableExec: (state) => {
      state.isExecDisable = true;
    },
    enableExec: (state) => {
      state.isExecDisable = false;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.value += 1;
    },
  },
});

export const { disableExec, enableExec, setValue } = detailsSlice.actions;

export default detailsSlice.reducer;
