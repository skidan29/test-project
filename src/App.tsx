import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store/store";

function App() {
  const reminders = useSelector((state: RootState) => state.reminders.list);
  const dispatch = useDispatch();

  return (
    <div className='App'>
      <h1>Напоминания:</h1>
      {reminders.map((reminder) => (
        <div>
          {reminder.caption}:{reminder.caption}
        </div>
      ))}

      <button>Добавить</button>
      {/* 1 заголовок 2 таблица 3 кнопка добавления 4 модалка */}
    </div>
  );
}

export default App;
