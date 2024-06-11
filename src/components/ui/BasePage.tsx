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
      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
};

export default BasePage;
