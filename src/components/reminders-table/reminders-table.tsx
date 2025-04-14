import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Reminder, remove, updateState } from '../../store/slices/reminders-slices';
import dayjs from 'dayjs';
import { NoContent } from './reminders-table.styles';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const DATE_FORMAT = 'DD.MM.YYYY hh:mm';

interface Props {
  edit: (reminder: Reminder) => void;
}

export function RemindersTable({ edit }: Props) {
  const dispatch = useDispatch();
  const reminders = useSelector((state: RootState) => state.reminders.list);

  useEffect(() => {
    const remindersJson = localStorage.getItem('reminderlist');
    if (remindersJson) {
      const reminders: Reminder[] = JSON.parse(remindersJson);
      dispatch(updateState(reminders));
    }
  }, [dispatch]);

  const removeReminder = useCallback(
    (reminderId: string) => {
      dispatch(remove(reminderId));
    },
    [dispatch],
  );
  return (
    <Table data-testid="remindersTable" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Описание</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Дата</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="h6">Действия</Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {reminders.length ? (
          reminders.map((reminder) => (
            <TableRow key={reminder.id}>
              <TableCell>{reminder.caption}</TableCell>
              <TableCell>{dayjs(reminder.deadline).format(DATE_FORMAT)}</TableCell>
              <TableCell align="right">
                <Grid display="flex" justifyContent={'end'} gap={3}>
                  <Button
                    data-testid="removeBtn"
                    color="error"
                    size="small"
                    onClick={() => removeReminder(reminder.id)}
                    variant="contained"
                    type="button"
                  >
                    Удалить
                  </Button>
                  <Button
                    data-testid="editBtn"
                    size="small"
                    variant="contained"
                    onClick={() => edit(reminder)}
                    type="button"
                  >
                    Изменить
                  </Button>
                </Grid>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <NoContent>Список напоминаний пока пуст</NoContent>
        )}
      </TableBody>
    </Table>
  );
}
