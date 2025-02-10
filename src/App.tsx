import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { validateUserCredentials } from "./store/AuthSlice";
import { useEffect, useState } from "react";
import Spinner from "./shared/Spinner/Spinner";
import logoImg from "./assets/logo.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "./store/store-hooks";
import { createTheme, ThemeProvider } from "@mui/material";

let loaded = false;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [showAvatarTransition, setShowAvatarTransition] = useState(true);

  const dispatch = useAppDispatch();

  const { userData, isLoggedIn, areCredsValidated } = useAppSelector(
    (state) => state.authorization
  );

  useEffect(() => {
    if (areCredsValidated) {
      setTimeout(() => {
        setShowAvatarTransition(false);
      }, 2000);
    }
  }, [areCredsValidated]);

  if (!loaded) {
    dispatch(validateUserCredentials());
    loaded = true;
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <AnimatePresence>
          {areCredsValidated ? (
            showAvatarTransition ? (
              <motion.div
                className="validation-container"
                style={{ width: "200px", height: "200px", margin: "auto" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  className="validation-img"
                  src={userData?.avatarUrl ?? logoImg}
                />
                {isLoggedIn ? (
                  <p>Welcome back, {userData?.firstName ?? ""}! </p>
                ) : (
                  <p>
                    No Credentials found! Browse anonymously or click login
                    above.
                  </p>
                )}
              </motion.div>
            ) : (
              <Outlet />
            )
          ) : (
            <motion.div
              className="validation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="validation-spinner">
                <Spinner divStyle={{ width: "200px", height: "200px" }}>
                  <img className="validation-img" src={logoImg} />
                </Spinner>
              </div>

              <p>Just a moment! Validating your saved credentials</p>
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
