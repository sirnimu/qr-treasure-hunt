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

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#c9ae7f",
    },
    secondary: {
      main: "#64573f",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Papyrus", "fantasy"].join(","),
      fontSize: 72,
    },
    h2: {
      fontFamily: ["Papyrus", "fantasy"].join(","),
      fontSize: 48,
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
    path: "/admin",
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
