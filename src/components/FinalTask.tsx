import { Button, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { useGetTasks } from "./hooks/useGetTasks";
import { useState } from "react";
import Confetti from "react-confetti";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { useNavigate } from "react-router-dom";

const FinalTask = () => {
  const { tasks } = useGetTasks();
  const navigate = useNavigate();

  const [showConfetti, setShowConfetti] = useState(false);

  const allAnswers = tasks.map((t) => t.answer).join("");
  const coordinates =
    Number(allAnswers.slice(0, 9)) / 10000000 +
    ", " +
    Number(allAnswers.slice(9, 18)) / 10000000;

  const [showFinal, setShowFinal] = useState(false);

  if (showFinal) {
    return (
      <BasePage>
        {showConfetti && <Confetti />}
        <Typography>Lobis slepiasi čia:</Typography>
        <Typography>{coordinates}</Typography>
        <Typography>Suvesk lobio vietoje rastą kodą:</Typography>
        <Stack alignItems="stretch" gap={1}>
          <TextField />
          <Button
            onClick={async () => {
              const teamName = localStorage.getItem("team") ?? "";
              const teamRef = doc(db, "teams", teamName);
              await updateDoc(teamRef, {
                finished_at: serverTimestamp(),
              });
              localStorage.removeItem("currentTaskIndex");
              setShowConfetti(true);
              setTimeout(() => {
                navigate("/leaderboard");
              }, 2500);
            }}
          >
            OK
          </Button>
        </Stack>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <Stack flexDirection="column" gap={2}>
        <Typography paragraph my={2} sx={{ whiteSpace: "pre-line" }}>
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
        <Button onClick={() => setShowFinal(true)}>Toliau!</Button>
      </Stack>
    </BasePage>
  );
};

export default FinalTask;
