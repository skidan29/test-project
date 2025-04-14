import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import { add, Reminder, ReminderCreationForm, update } from '../../store/slices/reminders-slices';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';

const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  position: 'relative',
  p: 4,
};

interface Props {
  reminder?: Reminder;
  close: () => void;
  isOpen: boolean;
}

export function CreationModal({ reminder, close, isOpen }: Props) {
  const dispatch = useDispatch();

  const [form, setForm] = useState<ReminderCreationForm>({
    caption: '',
    deadline: dayjs(Date.now()).format(),
  });

  useEffect(() => {
    if (reminder) {
      setForm({ caption: reminder.caption, deadline: reminder.deadline });
    }
  }, [reminder]);

  const onSave = useCallback(() => {
    if (reminder) {
      dispatch(update({ ...form, id: reminder.id }));
    } else {
      dispatch(add(form));
    }
  }, [dispatch, form, reminder]);

  const handleCaptionСhange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, caption: e.target.value }));
  }, []);

  const handleDeadlineСhange = useCallback((value: Dayjs | null) => {
    setForm((prev) => ({
      ...prev,
      deadline: dayjs(value).format(),
    }));
  }, []);

  return (
    <Modal
      data-testid="creationModal"
      open={isOpen}
      onClose={close}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <Grid display="flex" justifyContent="space-between" paddingBottom={3}>
          <Typography variant="h6">{reminder ? 'Редактирование напоминания' : 'Добавление напоминания'}</Typography>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={close}></CloseIcon>
        </Grid>

        <FormControl fullWidth>
          <Grid container rowGap={2} direction="column">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Выберите время"
                value={dayjs(form?.deadline)}
                onChange={handleDeadlineСhange}
              />
            </LocalizationProvider>

            <TextField
              value={form?.caption}
              label={'Описание'}
              variant="outlined"
              onChange={handleCaptionСhange}
              multiline
              placeholder={'Введите текст'}
              required
            />
            <Button
              data-testid="btn"
              onClick={onSave}
              variant="contained"
              type="button"
              size="large"
            >
              {reminder ? 'Изменить' : 'Добавить'}
            </Button>
          </Grid>
        </FormControl>
      </Box>
    </Modal>
  );
}
