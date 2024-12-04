import { useState } from "react";
import Button from "../../shared/Button/Button";
import logoImg from "./../../assets/logo.jpg";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-8 py-12 lg:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <img
            src={logoImg}
            alt="Accessories But Cheaper Logo"
            className="rounded-full size-20"
          />
          <nav className="flex gap-4 mt-4">
            <Button
              classOverrides={"font-semibold text-indigo-600 hover:text-indigo-500".split(
                " "
              )}
              onClick={() => setShowLogin(true)}
            >
              Log In
            </Button>
            <Button onClick={() => setShowLogin(false)}>Sign Up</Button>
          </nav>
        </div>

        {showLogin ? (
          <LoginForm signInClick={() => setShowLogin(false)} />
        ) : (
          <SignUpForm />
        )}
      </div>
    </>
  );
};

export default AuthForm;
