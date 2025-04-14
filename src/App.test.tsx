import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

describe('App', () => {
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

  it('the table should render', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByTestId('remindersTable')).toBeInTheDocument();
  });
});
