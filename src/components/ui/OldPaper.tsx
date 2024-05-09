import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

const OldPaper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      py={4}
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom, #f9dcd8 0%, #e0c68c 100%)",
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
};

export default OldPaper;
