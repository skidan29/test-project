import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Reminder } from "../store/slices/reminders-slices";

interface Props {
  reminders: Reminder[];
  remove: (id: string) => void;
  edit: (reminder: Reminder) => void;
}

export function RemindersTable({ reminders, remove, edit }: Props) {
  return (
    <Table aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant='h6'>Описание</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Дата</Typography>
          </TableCell>
          <TableCell align='right'>
            <Typography variant='h6'>Действия</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reminders.map((reminder) => (
          <TableRow key={reminder.id}>
            <TableCell>{reminder.caption}</TableCell>
            <TableCell>{reminder.deadline}</TableCell>
            <TableCell align='right'>
              <Grid display='flex' justifyContent={"end"} gap={3}>
                <Button
                  color='error'
                  size='small'
                  onClick={() => remove(reminder.id)}
                  variant='contained'
                  type='button'>
                  Удалить
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => edit(reminder)}
                  type='button'>
                  Изменить
                </Button>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
