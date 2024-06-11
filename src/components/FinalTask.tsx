import { Button, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { useGetTasks } from "./hooks/useGetTasks";
import { useState } from "react";

const FinalTask = () => {
  const { tasks } = useGetTasks();

  const allAnswers = tasks.map((t) => t.answer).join("");
  const coordinates =
    Number(allAnswers.slice(0, 8)) / 1000000 +
    ", " +
    Number(allAnswers.slice(8, 16)) / 1000000;

  const [showFinal, setShowFinal] = useState(false);

  if (showFinal) {
    return (
      <BasePage>
        <Typography>Lobis slepiasi čia:</Typography>
        <Typography>{coordinates}</Typography>
        <Typography>Suvesk lobio vietoje rastą kodą:</Typography>
        <Stack alignItems="stretch" gap={1}>
          <TextField />
          <Button onClick={() => alert("BOOM")}>OK</Button>
        </Stack>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <Stack flexDirection="column" gap={2}>
        <Typography variant="h2">Tai buvo paskutinė užduotis!</Typography>
        <Typography variant="h2">Visi atsakymai:</Typography>
        <Typography fontSize={48} fontWeight={700}>
          {allAnswers}
        </Typography>
        <Button onClick={() => setShowFinal(true)}>Toliau!</Button>
      </Stack>
    </BasePage>
  );
};

export default FinalTask;
