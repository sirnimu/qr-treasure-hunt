import { Button, Stack, TextField, Typography } from "@mui/material";
import { useGetTasks } from "./hooks/useGetTasks";
import BasePage from "./ui/BasePage";
import { FormEvent, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const { tasks } = useGetTasks();
  const navigate = useNavigate();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  // Get team current question index

  const currentTask = tasks[currentTaskIndex];

  const [answer, setAnswer] = useState("");

  const submitAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnswer("");

    if (answer.toUpperCase() === currentTask.answer.toUpperCase()) {
      if (tasks.length === currentTaskIndex + 1) {
        navigate("/final");
      }

      enqueueSnackbar("Atspėjai!");
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      enqueueSnackbar("Bandykite dar kartą...");
    }
  };

  return (
    <BasePage>
      <Stack>
        <Typography variant="h2">
          Užduotis nr.{currentTask.index + 1}
        </Typography>
      </Stack>
      <Stack flexDirection="column" my={2}>
        <Typography>{currentTask.description}</Typography>
        {currentTask.question && (
          <Typography fontWeight={700}>{currentTask.question}</Typography>
        )}
        {currentTask.imgUrl && <img src={currentTask.imgUrl} />}
      </Stack>

      <form onSubmit={submitAnswer}>
        <Stack alignItems="stretch" gap={1}>
          <TextField
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            label="Jūsų atsakymas"
            autoComplete="off"
          />

          <Button type="submit" size="large">
            Spėti
          </Button>
        </Stack>
      </form>
    </BasePage>
  );
};

export default Game;
