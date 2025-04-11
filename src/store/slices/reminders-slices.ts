import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Reminder {
  caption: string;
  deadline: string;
}

export interface RemindersState {
  list: Reminder[];
}

const initialState: RemindersState = {
  list: [
    { caption: "Поглулть с собакой", deadline: "12-01-2025" },
    { caption: "Забрать заказ", deadline: "12-01-2025" },
    { caption: "Купить родарок", deadline: "08-03-2025" },
  ],
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    add: (state) => {
      //   state.value += 1;
    },
    update: (state) => {
      //   state.value -= 1;
    },
    remove: (state, action: PayloadAction<number>) => {
      //   state.value += action.payload;
    },
  },
});

export const { add, update, remove } = remindersSlice.actions;

export default remindersSlice.reducer;
