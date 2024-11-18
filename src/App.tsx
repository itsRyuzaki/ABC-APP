import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { validateUserCredentials } from "./store/AuthSlice";
import { useEffect, useState } from "react";
import { Spinner } from "./shared/Spinner/Spinner";
import logoImg from "./assets/logo.jpg";
import { AnimatePresence, motion } from "framer-motion";

let loaded = false;

function App() {
  const [showAvatarTransition, setshowAvatarTransition] = useState(true);

  const dispatch = useDispatch();

  const areCredsValidated = useSelector(
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
      {areCredsValidated ? (
        <AnimatePresence>
          {showAvatarTransition ? (
            <motion.div
              className="validation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="validation-spinner">
                <Spinner divStyle={{ width: "200px", height: "200px" }} />
                <img className="validation-avatar" src={logoImg} />
              </div>

              <p className="validation-msg">
                Just a moment! Validating your saved credentials
              </p>
            </motion.div>
          ) : (
            <Outlet />
          )}
        </AnimatePresence>
      ) : (
        <p>Validating Credentials...</p>
      )}
    </>
  );
}

export default App;
