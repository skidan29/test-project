import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store/store";
import {
  add,
  Reminder,
  ReminderCreation,
  remove,
  update,
} from "./store/slices/reminders-slices";
import { useCallback } from "react";

function App() {
  const reminders = useSelector((state: RootState) => state.reminders.list);
  const dispatch = useDispatch();

  const addReminder = useCallback(
    (reminder: ReminderCreation) => dispatch(add(reminder)),
    [dispatch]
  );

  const deleteReminder = useCallback(
    (reminderId: string) => dispatch(remove(reminderId)),
    [dispatch]
  );

  const updateReminder = useCallback(
    (reminder: Reminder) => dispatch(update(reminder)),
    [dispatch]
  );

  return (
    <div className='App'>
      <h1>Напоминания:</h1>
      {reminders.map((reminder) => (
        <div key={reminder.id}>
          {reminder.caption}:{reminder.caption}
          <button
            onClick={() => {
              deleteReminder(reminder.id);
            }}>
            Delete
          </button>
          <button
            onClick={() =>
              updateReminder({
                id: reminder.id,
                caption: "edit",
                deadline: "11-03-2025",
              })
            }>
            Изменить
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          addReminder({ caption: "new", deadline: "11-03-2025" });
        }}>
        Add
      </button>
    </div>
  );
}

export default App;
