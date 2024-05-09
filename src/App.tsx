import Home from "./components/Home";
import "./app.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import "react-medium-image-zoom/dist/styles.css";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#c9ae7f",
      },
    },
    components: {
      MuiStack: {
        defaultProps: {
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      MuiButton: {
        defaultProps: { variant: "contained" },
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
      path: "/questions",
      element: <Questions />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
