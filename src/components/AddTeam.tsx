import { Button, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { MouseEvent, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

const AddTeam = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useState("");

  useEffect(() => {
    setTeam(localStorage.getItem("team") ?? "");
  }, []);

  const ref = collection(firebase, "teams");

  const addTeam = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      addDoc(ref, { name: team });
      localStorage.setItem("team", team);
      navigate("/intro");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BasePage>
      <Stack direction="column" gap={2} sx={{ height: "100vh" }}>
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
