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
  list: [],
};

const save = (reminders: Reminder[]) => {
  localStorage.setItem("reminderlist", JSON.stringify(reminders));
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Reminder[]>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<ReminderCreation>) => {
      const newReminder = { ...action.payload, id: uuid() };

      state.list.push(newReminder);
      save(state.list);
    },
    update: (state, action: PayloadAction<Reminder>) => {
      const idx = state.list.findIndex(
        (reminder) => reminder.id === action.payload.id
      );

      state.list.splice(idx, 1, action.payload);
      save(state.list);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (reminder) => reminder.id !== action.payload
      );
      save(state.list);
    },
  },
});

export const { add, update, remove, updateState } = remindersSlice.actions;

export default remindersSlice.reducer;
