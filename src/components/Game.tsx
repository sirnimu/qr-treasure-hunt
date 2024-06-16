import {
  Button,
  CardMedia,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Zoom from "react-medium-image-zoom";
import { useGetTasks } from "./hooks/useGetTasks";
import BasePage from "./ui/BasePage";
import { FormEvent, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const NO_OF_TASKS = 16;

const Game = () => {
  const navigate = useNavigate();
  const { tasks, isLoading } = useGetTasks();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const currentTask = tasks[currentTaskIndex];

  const submitAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnswer("");

    if (answer.toUpperCase() === currentTask.answer.toUpperCase()) {
      if (currentTaskIndex + 1 === NO_OF_TASKS) {
        navigate("/final");
      }

      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      enqueueSnackbar("Bandykite dar kartą...");
    }
  };

  if (isLoading || !currentTask) {
    return (
      <BasePage>
        <Stack my={5}>
          <CircularProgress size={48} color="secondary" />
        </Stack>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <Stack>
        <Typography variant="h2">
          Užduotis nr.{currentTask.index + 1}
        </Typography>
      </Stack>
      <Stack flexDirection="column" my={2} gap={1}>
        <Typography>{currentTask.description}</Typography>
        {currentTask.question && (
          <Typography fontWeight={700}>{currentTask.question}</Typography>
        )}
        {currentTask.imgUrl && (
          <Zoom>
            <CardMedia
              component="img"
              height="auto"
              sx={{ maxHeight: "80vh", maxWidth: "80vw" }}
              image={currentTask.imgUrl}
            />
          </Zoom>
        )}
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
