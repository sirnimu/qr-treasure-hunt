import { Button, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { useGetTasks } from "./hooks/useGetTasks";
import { FormEvent, useState } from "react";
import Confetti from "react-confetti";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const FinalTask = () => {
  const { tasks } = useGetTasks();
  const navigate = useNavigate();

  const [showConfetti, setShowConfetti] = useState(false);
  const [answer, setAnswer] = useState("");

  const penalty = localStorage.getItem("penalty") ?? 0;

  const allAnswers = tasks.map((t) => t.answer).join("");
  const coordinates =
    Number(allAnswers.slice(0, 9)) / 10000000 +
    ", " +
    Number(allAnswers.slice(9, 18)) / 10000000;

  const submitAnswer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnswer("");

    if (!answer) {
      return;
    }

    if (answer.toUpperCase() === tasks?.at(-1)?.answer.toUpperCase()) {
      const teamName = localStorage.getItem("team") ?? "";
      const teamRef = doc(db, "teams", teamName);
      await updateDoc(teamRef, {
        finished_at: serverTimestamp(),
        total_penalty: Number(penalty) * 5 * 60,
      });
      localStorage.removeItem("currentTaskIndex");
      localStorage.removeItem("penalty");
      setShowConfetti(true);
      setTimeout(() => {
        navigate("/leaderboard");
      }, 2500);
    } else {
      enqueueSnackbar("Bandykite dar kartą...");
    }
  };
  return (
    <BasePage>
      {showConfetti && <Confetti />}
      <Stack flexDirection="column" gap={2}>
        <Typography
          paragraph
          my={2}
          sx={{ whiteSpace: "pre-line", fontStyle: "italic" }}
        >
          {`Jūs komanda oi puiki!
  Atsakymus suradot
  Ne iš kelmo jie spirti
  Skaičių seką matot?
  
  Raskit lobį pagaliau
  Skuoskite kaip vėjas
  Lobio vietoj guli jau
  Skaičiai išprotėję
  
  Juos suveskit
  Pasidžiaukit
  Ir visi smagiai
  Pašaukit`}
        </Typography>
      </Stack>
      <Stack flexDirection="column">
        <Typography>Lobis slepiasi čia:</Typography>
        <Typography sx={{ fontWeight: 500, fontSize: 18, my: 2 }}>
          {coordinates}
        </Typography>
      </Stack>
      <Stack mb={1}>
        <Typography>Suvesk lobio vietoje rastą kodą:</Typography>
      </Stack>

      <Stack alignItems="stretch" gap={1}>
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
              OK
            </Button>
          </Stack>
        </form>
      </Stack>
    </BasePage>
  );
};

export default FinalTask;
