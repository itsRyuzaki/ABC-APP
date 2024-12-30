import { FC, useState } from "react";
import logoImg from "./../../assets/logo.jpg";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./AuthForm.css";

interface IAuthFormComponent {
  closeModal: () => void;
}

const AuthForm: FC<IAuthFormComponent> = ({ closeModal }) => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <div className="form-background flex min-h-full flex-col justify-center px-8 py-12 md:px-12 max-w-96 md:max-w-3xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <img
            src={logoImg}
            alt="Accessories But Cheaper Logo"
            className="rounded-full size-20"
          />
        </div>

        {showLogin ? (
          <LoginForm
            signInClick={() => setShowLogin(false)}
            closeModal={closeModal}
          />
        ) : (
          <SignUpForm
            loginClick={() => setShowLogin(true)}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default AuthForm;
