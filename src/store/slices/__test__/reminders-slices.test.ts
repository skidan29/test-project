import { remindersSlice, add, update, remove, updateState } from '../reminders-slices';
import { Reminder, ReminderCreationForm } from '../reminders-slices';

describe('remindersSlice', () => {
  let initialState: { list: Reminder[] };

  beforeEach(() => {
    initialState = {
      list: [],
    };
  });

  it('should handle updateState', () => {
    const reminders: Reminder[] = [
      { id: '1', caption: 'Test Reminder 1', deadline: '2023-10-10' },
      { id: '2', caption: 'Test Reminder 2', deadline: '2023-11-15' },
    ];

    const nextState = remindersSlice.reducer(initialState, updateState(reminders));

    expect(nextState.list).toEqual(reminders);
  });

  it('should handle add', () => {
    const newReminder: ReminderCreationForm = {
      caption: 'New reminder',
      deadline: '2025-04-04',
    };

    const nextState = remindersSlice.reducer(initialState, add(newReminder));

    expect(nextState.list).toHaveLength(1);
  });

  it('should handle update', () => {
    const existingReminder: Reminder = {
      id: '1',
      caption: 'reminder',
      deadline: '2025-04-04',
    };

    const updatedReminder: Reminder = {
      id: '1',
      caption: 'New Reminder',
      deadline: '2025-04-05',
    };

    const stateWithReminder = {
      list: [existingReminder],
    };

    const nextState = remindersSlice.reducer(stateWithReminder, update(updatedReminder));

    expect(nextState.list).toHaveLength(1);
    expect(nextState.list[0]).toEqual(updatedReminder);
  });

  it('should handle remove', () => {
    const existingReminder: Reminder = {
      id: '1',
      caption: 'reminder',
      deadline: '2025-04-05',
    };

    const stateWithReminder = {
      list: [existingReminder],
    };

    const nextState = remindersSlice.reducer(stateWithReminder, remove('1'));

    expect(nextState.list).toHaveLength(0);
  });
});
