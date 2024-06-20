import { Box, Button, Stack, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const teamName = localStorage.getItem("team");

  return (
    <BasePage>
      <Stack
        sx={{
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box sx={{ width: "50vw", maxWidth: "500px" }}>
          <img src="gniauziu_logo-591x442.png" width="100%" height="100%"></img>
        </Box>
        <Stack
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography variant="h1" sx={{ m: 0 }}>
            Lobis
          </Typography>
          <Typography variant="h2">2024</Typography>
        </Stack>
        {teamName ? (
          <Button onClick={() => navigate("/play")}>Tęsti žaidimą</Button>
        ) : (
          <Button onClick={() => navigate("/add-team")}>Sukurti komandą</Button>
        )}
        <Button onClick={() => navigate("/leaderboard")}>Rezultatai</Button>
      </Stack>
    </BasePage>
  );
};

export default Home;
