import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasePage from "./ui/BasePage";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeams } from "./hooks/useGetTeams";

const AddTeam = () => {
  const { teams, isLoading } = useGetTeams();
  const [team, setTeam] = useState("");
  const navigate = useNavigate();
  const teamNameConflictError = teams.some((t) => t.name === team);

  const addTeam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!team) {
      return;
    }

    localStorage.setItem("team", team);
    navigate("/intro");
  };

  if (isLoading) {
    <BasePage>
      <LinearProgress color="secondary" />
    </BasePage>;
  }

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
              error={teamNameConflictError}
              helperText={
                teamNameConflictError ? "Tokia komanda jau egzistuoja!" : ""
              }
            />
            <Button type="submit" disabled={teamNameConflictError}>
              Pirmyn
            </Button>
          </Stack>
        </Stack>
      </form>
    </BasePage>
  );
};

export default AddTeam;
