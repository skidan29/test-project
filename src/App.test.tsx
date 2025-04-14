import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from './store/store';

const mockStore = configureStore<RootState>();

describe('App', () => {
  let store: ReturnType<typeof mockStore>;

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

  it('modal should open when you click the add button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const addButton = screen.getByTestId('addBtn');
    fireEvent.click(addButton);

    expect(screen.getByTestId('creationModal')).toBeInTheDocument();
  });

  it('the table should be rendered', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByTestId('remindersTable')).toBeInTheDocument();
  });
});
