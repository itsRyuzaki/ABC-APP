import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { validateUserCredentials } from "./store/AuthSlice";
import { useEffect, useState } from "react";

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
        showAvatarTransition ? (
          <p>transition in progress</p>
        ) : (
          <Outlet />
        )
      ) : (
        <p>Validating Credentials...</p>
      )}
    </>
  );
}

export default App;
