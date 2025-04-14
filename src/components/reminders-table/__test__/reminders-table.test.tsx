import { render, screen, fireEvent } from '@testing-library/react';
import { RemindersTable } from '../reminders-table';

describe('RemindersTable', () => {
  const mockRemove = jest.fn();
  const mockEdit = jest.fn();

  const mockReminders = [
    { id: '1', caption: 'Reminder 1', deadline: '12-02-2025' },
    { id: '2', caption: 'Reminder 2', deadline: '13-02-2025' },
  ];

  it('the table rows should be rendered', () => {
    render(<RemindersTable reminders={mockReminders} remove={mockRemove} edit={mockEdit} />);

    expect(screen.getByText('Reminder 1')).toBeInTheDocument();
    expect(screen.getByText('Reminder 2')).toBeInTheDocument();
  });

  it('the delete function should be called', () => {
    render(<RemindersTable reminders={mockReminders} remove={mockRemove} edit={mockEdit} />);

    const deleteButton = screen.getAllByTestId('removeBtn')[0];
    fireEvent.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith('1');
  });

  it('the edit function should be called', () => {
    render(<RemindersTable reminders={mockReminders} remove={mockRemove} edit={mockEdit} />);

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
