import { Box, Container, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          height: "100vh",
        }}
      >
        <QRCode value="Hehehe" />
        <Typography variant="h1">Gniaužių lobių paieška</Typography>;
      </Box>
      <img src="requirements.jpg" width="100%" height="100%"></img>
    </Container>
  );
};

export default Home;
