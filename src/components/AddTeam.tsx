import { Button, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const AddTeam = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useLocalStorageState("team", {
    defaultValue: "",
  });

  const addTeam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!team) {
      return;
    }

    localStorage.setItem("team", team);
    navigate("/intro");
  };

  return (
    <BasePage>
      <form onSubmit={addTeam}>
        <Stack direction="column" gap={2}>
          <Typography variant="h2" mt={2} mb={1}>
            Sukurkite komandą
          </Typography>
          <Stack alignItems="stretch" gap={1}>
            <TextField
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              label="Komandos pavadinimas"
              variant="filled"
              fullWidth
            />
            <Button type="submit">Pirmyn</Button>
          </Stack>
        </Stack>
      </form>
    </BasePage>
  );
};

export default AddTeam;
