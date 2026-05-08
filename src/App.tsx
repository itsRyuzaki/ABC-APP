import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { validateUserCredentials } from "./store/AuthSlice";
import { useAppDispatch } from "./store/store-hooks";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";

let loaded = false;

function App() {
  const dispatch = useAppDispatch();

  if (!loaded) {
    dispatch(validateUserCredentials());
    loaded = true;
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
