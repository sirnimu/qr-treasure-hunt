import Home from "./components/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intro from "./components/Intro";
import "react-medium-image-zoom/dist/styles.css";
import AddTeam from "./components/AddTeam";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";
import AdminPanel from "./components/admin/AdminPanel";
import { SnackbarProvider } from "notistack";
import FinalTask from "./components/FinalTask";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#ddcaa8",
    },
    secondary: {
      main: "#64573f",
    },
  },
  typography: {
    h1: {
      fontSize: 60,
      fontWeight: 700,
    },
    h2: {
      fontSize: 36,
      fontWeight: 500,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    MuiButton: {
      defaultProps: { variant: "contained", color: "secondary" },
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/intro",
    element: <Intro />,
  },
  {
    path: "/add-team",
    element: <AddTeam />,
  },
  {
    path: "/play",
    element: <Game />,
  },
  {
    path: "/final",
    element: <FinalTask />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/gnzadmin",
    element: <AdminPanel />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <CssBaseline />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
