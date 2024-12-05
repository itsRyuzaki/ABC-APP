import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { validateUserCredentials } from "./store/AuthSlice";
import { useEffect, useState } from "react";
import Spinner from "./shared/Spinner/Spinner";
import logoImg from "./assets/logo.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "./store/store-hooks";

let loaded = false;

function App() {
  const [showAvatarTransition, setshowAvatarTransition] = useState(true);

  const dispatch = useAppDispatch();

  const areCredsValidated = useAppSelector(
    (state) => state.authorization.areCredsValidated
  );

  useEffect(() => {
    if (areCredsValidated) {
      setTimeout(() => {
        setshowAvatarTransition(false);
      }, 5000);
    }
  }, [areCredsValidated]);

  if (!loaded) {
    dispatch(validateUserCredentials());
    loaded = true;
  }
  return (
    <>
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
              <img className="validation-img" src={logoImg} />

              <p>Welcome back!</p>
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
    </>
  );
}

export default App;
