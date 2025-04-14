import { render, screen, fireEvent } from '@testing-library/react';
import { RemindersTable } from '../reminders-table';
import { RootState } from '../../../store/store';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { remove } from '../../../store/slices/reminders-slices';

const mockStore = configureStore<RootState>();

describe('RemindersTable', () => {
  let store: ReturnType<typeof mockStore>;

  const mockEdit = jest.fn();

  beforeEach(() => {
    store = mockStore({
      reminders: {
        list: [
          { id: '1', caption: 'Reminder 1', deadline: '12-02-2025' },
          { id: '2', caption: 'Reminder 2', deadline: '13-02-2025' },
        ],
      },
    });
  });

  it('the table rows should be rendered', () => {
    render(
      <Provider store={store}>
        <RemindersTable edit={mockEdit} />
      </Provider>,
    );

    expect(screen.getByText('Reminder 1')).toBeInTheDocument();
    expect(screen.getByText('Reminder 2')).toBeInTheDocument();
  });

  it('the delete function should be called', () => {
    render(
      <Provider store={store}>
        <RemindersTable edit={mockEdit} />
      </Provider>,
    );

    const deleteButton = screen.getAllByTestId('removeBtn')[0];
    fireEvent.click(deleteButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(remove('1'));
  });

  it('the edit function should be called', () => {
    render(
      <Provider store={store}>
        <RemindersTable edit={mockEdit} />
      </Provider>,
    );

    const editButton = screen.getAllByTestId('editBtn')[0];
    fireEvent.click(editButton);

    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith({
      id: '1',
      caption: 'Reminder 1',
      deadline: '12-02-2025',
    });
  });
});
