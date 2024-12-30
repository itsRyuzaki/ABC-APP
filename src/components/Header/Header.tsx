import { Link, NavLink } from "react-router-dom";
import { BUTTON_VARIATIONS } from "../../config/variation";
import { ROUTER_CONSTANTS } from "../../config/router-constants";
import Button from "../../shared/Button/Button";
import logoImg from "./../../assets/logo.jpg";
import anonymousImg from "./../../assets/anoymous-avatar.jpg";

import "./Header.css";
import { useAppSelector } from "../../store/store-hooks";
import { MutableRefObject, useRef } from "react";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";
import { motion } from "framer-motion";

export default function Header() {
  const { userData, isLoggedIn, areCredsValidated } = useAppSelector(
    (state) => state.authorization
  );

  const authModalRef =
    useRef<HTMLDialogElement>() as MutableRefObject<HTMLDialogElement>;

  const onloginClick = () => {
    authModalRef.current.showModal();
  };

  const closeModal = () => {
    authModalRef.current.close();
  };

  return (
    <>
      <header id="main-header">
        <Link to="/">
          <div id="title">
            <img src={logoImg} alt="Accessories But Cheaper Logo" />
            <motion.h1
              className="gradient-text"
              animate={{ backgroundSize: "200%" }}
              transition={{
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
                duration: 1.5,
              }}
            >
              Accessories But Cheaper
            </motion.h1>
          </div>
        </Link>
        <nav className="flex gap-4">
          <Button variation={BUTTON_VARIATIONS.textOnly}>
            <NavLink to={ROUTER_CONSTANTS.mobiles}>Mobiles</NavLink>
          </Button>
          <Button variation={BUTTON_VARIATIONS.textOnly}>
            <NavLink to={ROUTER_CONSTANTS.computersAndLaptops}>
              Computers
            </NavLink>
          </Button>

          {areCredsValidated ? (
            isLoggedIn ? (
              <Button variation={BUTTON_VARIATIONS.textOnly}>
                <NavLink to={ROUTER_CONSTANTS.profile}>
                  <img
                    className="w-16 h-16 rounded-full"
                    src={userData?.avatarUrl ?? anonymousImg}
                    alt="User Avatar Image"
                  />
                </NavLink>
              </Button>
            ) : (
              <Button onClick={onloginClick}>Login/Sign Up</Button>
            )
          ) : (
            <></>
          )}
        </nav>
      </header>
      <Modal ref={authModalRef}>
        <AuthForm closeModal={closeModal} />
      </Modal>
    </>
  );
}
