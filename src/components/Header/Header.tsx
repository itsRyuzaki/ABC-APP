import { Link, NavLink } from "react-router-dom";
import { BUTTON_VARIATIONS } from "../../config/variation";
import { ROUTER_CONSTANTS } from "../../config/router-constants";
import Button from "../../shared/Button/Button";
import logoImg from "./../../assets/logo.jpg";
import "./Header.css";
import { useAppSelector } from "../../store/store-hooks";
import { MutableRefObject, useRef, } from "react";
import Modal from "../Modal/Modal";

export default function Header() {
  const { userData, isLoggedIn, areCredsValidated } = useAppSelector(
    (state) => state.authorization
  );

  const authModalRef =
    useRef<HTMLDialogElement>() as MutableRefObject<HTMLDialogElement>;

  const onloginClick = () => {
    authModalRef.current.showModal();
  };

  return (
    <>
      <header id="main-header">
        <Link to="/">
          <div id="title">
            <img src={logoImg} alt="Accessories But Cheaper Logo" />
            <h1>Accessories But Cheaper</h1>
          </div>
        </Link>
        <nav>
          <Button variation={BUTTON_VARIATIONS.textOnly}>
            <NavLink to={ROUTER_CONSTANTS.mobiles}>Mobiles</NavLink>
          </Button>
          <Button variation={BUTTON_VARIATIONS.textOnly}>
            <NavLink to={ROUTER_CONSTANTS.computersAndLaptops}>
              PCs & Laptops
            </NavLink>
          </Button>

          {!isLoggedIn ? (
            <Button variation={BUTTON_VARIATIONS.textOnly}>
              <NavLink to={ROUTER_CONSTANTS.profile}>
                {userData?.data?.firstName}
              </NavLink>
            </Button>
          ) : (
            <Button
              variation={BUTTON_VARIATIONS.textOnly}
              disabled={!areCredsValidated}
              type="submit"
              onClick={onloginClick}
            >
              Login/Sign Up
            </Button>
          )}
        </nav>
      </header>
      <Modal ref={authModalRef}>Working</Modal>
    </>
  );
}
