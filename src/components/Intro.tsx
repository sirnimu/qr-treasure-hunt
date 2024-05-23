import { Button, Stack, Typography } from "@mui/material";
import OldPaper from "./ui/BasePage";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const teamName = localStorage.getItem("team");

  return (
    <OldPaper>
      <Stack py={2}>
        <Typography variant="h3">{teamName}</Typography>
      </Stack>
      <Typography variant="body1">
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </Typography>
      <Stack py={2}>
        <Button onClick={() => navigate("/play")}>Žaidžiam!</Button>
      </Stack>
    </OldPaper>
  );
};

export default Intro;
