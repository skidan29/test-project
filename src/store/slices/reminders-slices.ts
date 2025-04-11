import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export interface Reminder {
  id: string;
  caption: string;
  deadline: string;
}

export type ReminderCreation = Omit<Reminder, "id">;

export interface RemindersState {
  list: Reminder[];
}

const initialState: RemindersState = {
  list: [
    { id: "223232", caption: "Поглулть с собакой", deadline: "12-01-2025" },
    { id: "3434343", caption: "Забрать заказ", deadline: "12-01-2025" },
    { id: "weeqrwerwe", caption: "Купить родарок", deadline: "08-03-2025" },
  ],
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ReminderCreation>) => {
      const newReminder = { ...action.payload, id: uuid() };

      state.list.push(newReminder);
    },
    update: (state, action: PayloadAction<Reminder>) => {
      const idx = state.list.findIndex(
        (reminder) => reminder.id === action.payload.id
      );

      state.list.splice(idx, 1, action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (reminder) => reminder.id !== action.payload
      );
    },
  },
});

export const { add, update, remove } = remindersSlice.actions;

export default remindersSlice.reducer;
