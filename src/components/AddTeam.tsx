import { Button, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const AddTeam = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useLocalStorageState("team", {
    defaultValue: "",
  });

  const addTeam = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem("team", team);
    navigate("/intro");
  };

  return (
    <BasePage>
      <Stack direction="column" gap={2}>
        <Typography>Pateikite komandos pavadinimą:</Typography>
        <TextField
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          label="Komandos pavadinimas"
          variant="filled"
          fullWidth
        />
        <Button onClick={addTeam}>Pateikti</Button>
      </Stack>
    </BasePage>
  );
};

export default AddTeam;
