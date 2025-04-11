import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import {
  add,
  Reminder,
  ReminderCreation,
  remove,
  update,
  updateState,
} from "./store/slices/reminders-slices";
import { useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { StyledBg, StyledContainer } from "./App.styles";

function App() {
  const remindersList = useSelector((state: RootState) => state.reminders.list);
  const dispatch = useDispatch();

  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    const remindersJson = localStorage.getItem("reminderlist");
    if (remindersJson) {
      const reminders: Reminder[] = JSON.parse(remindersJson);
      dispatch(updateState(reminders));
    }
  }, [dispatch]);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <StyledBg>
      <StyledContainer>
        <Typography variant='h4' padding={3}>
          Напоминания:
        </Typography>
        <TableContainer component={Paper}>
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
              {remindersList.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell>{reminder.caption}</TableCell>
                  <TableCell>{reminder.deadline}</TableCell>
                  <TableCell align='right'>
                    <Grid display='flex' justifyContent={"end"} gap={3}>
                      <Button
                        color='error'
                        size='small'
                        onClick={() => deleteReminder(reminder.id)}
                        variant='contained'
                        type='button'>
                        Удалить
                      </Button>
                      <Button
                        size='small'
                        variant='contained'
                        onClick={() =>
                          updateReminder({
                            id: reminder.id,
                            caption: "edit",
                            deadline: "11-03-2025",
                          })
                        }
                        type='button'>
                        Изменить
                      </Button>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid padding={3}>
            <Button
              size='medium'
              variant='contained'
              onClick={() =>
                addReminder({
                  caption: "edit",
                  deadline: "11-03-2025",
                })
              }
              type='button'>
              Добавить
            </Button>
          </Grid>
        </TableContainer>
        <Button type='button' onClick={() => setOpenModal(true)}>
          Open modal
        </Button>
      </StyledContainer>

      <Modal
        open={isOpenModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <Box sx={{ ...style, width: 400 }}>
          <h2 id='parent-modal-title'>Text in a modal</h2>
          <p id='parent-modal-description'>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </Modal>
    </StyledBg>
  );
}

export default App;
