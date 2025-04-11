import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Reminder, remove, updateState } from "./store/slices/reminders-slices";
import { useCallback, useEffect, useState } from "react";

import { Button, Grid, Paper, TableContainer, Typography } from "@mui/material";

import { StyledBg, StyledContainer } from "./App.styles";
import { RemindersTable } from "./components/reminders-table";
import { CreationModal } from "./components/creation-modal";

function App() {
  const remindersList = useSelector((state: RootState) => state.reminders.list);
  const dispatch = useDispatch();

  const [creationModal, setCreationModal] = useState<{
    isOpen: boolean;
    payload?: Reminder;
  }>({ isOpen: false });

  useEffect(() => {
    const remindersJson = localStorage.getItem("reminderlist");
    if (remindersJson) {
      const reminders: Reminder[] = JSON.parse(remindersJson);
      dispatch(updateState(reminders));
    }
  }, [dispatch]);

  const handleCloseCreationModal = useCallback(
    () => setCreationModal({ isOpen: false }),
    []
  );

  const handleOpenCreationModal = useCallback(
    (reminder?: Reminder) =>
      setCreationModal({ isOpen: true, payload: reminder }),
    []
  );

  const deleteReminder = useCallback(
    (reminderId: string) => dispatch(remove(reminderId)),
    [dispatch]
  );

  return (
    <StyledBg>
      <StyledContainer>
        <Typography variant='h4' padding={3}>
          Напоминания:
        </Typography>
        <TableContainer component={Paper}>
          <RemindersTable
            reminders={remindersList}
            remove={deleteReminder}
            edit={handleOpenCreationModal}
          />
          <Grid padding={3}>
            <Button
              size='medium'
              variant='contained'
              onClick={() => handleOpenCreationModal()}
              type='button'>
              Добавить
            </Button>
          </Grid>
        </TableContainer>
      </StyledContainer>

      <CreationModal
        isOpen={creationModal.isOpen}
        reminder={creationModal.payload}
        close={handleCloseCreationModal}
      />
    </StyledBg>
  );
}

export default App;
