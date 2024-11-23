import { Link, NavLink } from "react-router-dom";
import { BUTTON_VARIATIONS } from "../../config/variation";
import { ROUTER_CONSTANTS } from "../../config/router-constants";
import Button from "../../shared/Button/Button";
import logoImg from "./../../assets/logo.jpg";
import "./Header.css";
import { useSelector } from "react-redux";

export default function Header() {
  const { authData } = useSelector((state) => state.authorization);
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

          {authData?.isLoggedIn ? (
            <Button variation={BUTTON_VARIATIONS.textOnly}>
              <NavLink to={ROUTER_CONSTANTS.profile}>
                {authData?.firstName}
              </NavLink>
            </Button>
          ) : (
            <Button
              variation={BUTTON_VARIATIONS.textOnly}
              disabled={authData?.areCredsValidated}
            >
              Login/Sign Up
            </Button>
          )}
        </nav>
      </header>
    </>
  );
}
