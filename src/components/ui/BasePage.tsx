import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

const BasePage = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "primary.main",
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
};

export default BasePage;
