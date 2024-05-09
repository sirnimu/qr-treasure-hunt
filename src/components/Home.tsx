import { Box, Button, Stack, Typography } from "@mui/material";
import OldPaper from "./ui/OldPaper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <OldPaper>
      <Stack
        sx={{
          flexDirection: "column",
          gap: 4,
          minHeight: "100vh",
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
          <Typography sx={{ fontSize: "3em" }}>2024</Typography>
        </Stack>
        <Button onClick={() => navigate("/intro")}>Noriu pradėti!</Button>
      </Stack>
    </OldPaper>
  );
};

export default Home;
