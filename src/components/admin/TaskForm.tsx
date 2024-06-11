import { Button, Stack, TextField, Typography } from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import db from "../../firebase";
import { Task } from "../types";
import { enqueueSnackbar } from "notistack";

type Props = {
  task: Task;
};

const TaskForm: FC<Props> = ({ task }) => {
  const [formFields, setFormFields] = useState<Omit<Task, "id">>({
    index: task.index,
    description: task.description,
    question: task.question,
    imgUrl: task.imgUrl,
    answer: task.answer,
  });

  useEffect(() => {
    setFormFields(task);
  }, [task]);

  const fetchFormValues = useCallback(async () => {
    const docRef = doc(collection(db, "assignments"), task.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormFields(docSnap.data() as Omit<Task, "id">);
    } else {
      console.log("No such document!");
    }
  }, [task.id]);

  useEffect(() => {
    fetchFormValues();
  }, [fetchFormValues]);

  const [isLoading, setIsLoading] = useState(false);

  const saveForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const docRef = doc(collection(db, "assignments"), task.id);

      await setDoc(docRef, formFields);
      enqueueSnackbar(`${task.index + 1} užduotis apnaujinta!`);
    } catch (e) {
      console.error("Error saving assignments: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={(e) => saveForm(e)}>
      <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
        gap={2}
        p={2}
        my={2}
        sx={{
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        }}
      >
        <Typography variant="h2" sx={{ mx: 2 }}>
          {task.index + 1}.
        </Typography>
        <TextField
          name="description"
          value={formFields?.description}
          onChange={handleFormChange}
          label="Aprašymas"
          multiline
          fullWidth
        ></TextField>
        <TextField
          name="question"
          value={formFields?.question}
          onChange={handleFormChange}
          label="Klausimas"
          fullWidth
        ></TextField>
        <TextField
          name="imgUrl"
          value={formFields?.imgUrl}
          onChange={handleFormChange}
          label="Nuotraukos URL"
          fullWidth
        ></TextField>
        <TextField
          name="answer"
          value={formFields?.answer}
          onChange={handleFormChange}
          label="Atsakymas"
          fullWidth
        ></TextField>
        <Stack justifyContent="flex-end" sx={{ width: "100%" }}>
          <Button type="submit" disabled={isLoading}>
            Išsaugoti
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
