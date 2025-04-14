import { render, screen, fireEvent } from '@testing-library/react';
import { CreationModal } from '../creation-modal';
import { RootState } from '../../../store/store';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { add, update } from '../../../store/slices/reminders-slices';
import dayjs from 'dayjs';

const mockStore = configureStore<RootState>();

describe('CreationModal', () => {
  let store: ReturnType<typeof mockStore>;

  const mockClose = jest.fn();

  beforeEach(() => {
    store = mockStore({
      reminders: {
        list: [
          {
            id: '1',
            caption: 'Reminder 1',
            deadline: '12-02-2025',
          },
        ],
      },
    });
  });

  it('modal should have "add" title', () => {
    render(
      <Provider store={store}>
        <CreationModal close={mockClose} isOpen={true} />
      </Provider>,
    );

    expect(screen.getByText('Добавление напоминания')).toBeInTheDocument();
  });

  it('modal should have "edit" title', () => {
    render(
      <Provider store={store}>
        <CreationModal
          close={mockClose}
          isOpen={true}
          reminder={store.getState().reminders.list[0]}
        />
      </Provider>,
    );

    expect(screen.getByText('Редактирование напоминания')).toBeInTheDocument();
  });

  it('reducer update must be called', () => {
    render(
      <Provider store={store}>
        <CreationModal
          close={mockClose}
          isOpen={true}
          reminder={store.getState().reminders.list[0]}
        />
      </Provider>,
    );

    const button = screen.getByTestId('btn');

    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toContainEqual(update(store.getState().reminders.list[0]));
  });

  it('close', () => {
    render(
      <Provider store={store}>
        <CreationModal close={mockClose} isOpen={true} />
      </Provider>,
    );

    const button = screen.getByTestId('close');

    fireEvent.click(button);

    expect(mockClose).toHaveBeenCalled();
  });

  it('reducer add must be called', () => {
    render(
      <Provider store={store}>
        <CreationModal close={mockClose} isOpen={true} />
      </Provider>,
    );

    const deadline = screen.getByPlaceholderText('MM/DD/YYYY hh:mm aa');

    const date = dayjs(Date.now());

    fireEvent.change(deadline, {
      target: { value: dayjs(date).format('MM/DD/YYYY hh:mm A') },
    });

    const caption = screen.getByPlaceholderText('Введите текст');
    fireEvent.change(caption, { target: { value: 'test' } });

    const button = screen.getByTestId('btn');
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      add({
        caption: 'test',
        deadline: dayjs(date).format(),
      }),
    );
  });
});
