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
import useLocalStorageState from "use-local-storage-state";
import db from "../firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import Timer from "./Timer";
import { NumericFormat } from "react-number-format";

const NO_OF_TASKS = 18;

const Game = () => {
  const navigate = useNavigate();
  const { tasks, isLoading } = useGetTasks();
  const [currentTaskIndex, setCurrentTaskIndex] = useLocalStorageState(
    "currentTaskIndex",
    {
      defaultValue: 0,
    }
  );
  const [_, setPenalty] = useLocalStorageState("penalty", {
    defaultValue: 0,
  });

  const [answer, setAnswer] = useState("");

  const teamName = localStorage.getItem("team") ?? "";
  const teamRef = doc(db, "teams", teamName);

  const currentTask = tasks[currentTaskIndex];

  const submitAnswer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnswer("");

    if (!answer) {
      return;
    }

    if (answer.toUpperCase() === currentTask.answer.toUpperCase()) {
      if (currentTaskIndex + 1 === NO_OF_TASKS) {
        navigate("/final");
      }

      setCurrentTaskIndex((prev) => prev + 1);
      await updateDoc(teamRef, {
        [`task_${currentTaskIndex}_at`]: serverTimestamp(),
      });
    } else {
      setPenalty((prev) => prev + 1);
      enqueueSnackbar("Gavote 5 minučių baudą");
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
      <Stack flexDirection="column">
        <Timer />
        <Typography variant="h2">
          Užduotis nr. {currentTask.index + 1}
        </Typography>
      </Stack>

      <Stack flexDirection="column" my={2} gap={1}>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {currentTask.description}
        </Typography>

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
          <NumericFormat
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            customInput={TextField}
            label="Jūsų atsakymas"
            autoComplete="off"
            inputProps={{
              maxLength: 1,
            }}
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
