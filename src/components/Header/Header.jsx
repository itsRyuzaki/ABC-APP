import { Link, NavLink } from "react-router-dom";
import { BUTTON_VARIATIONS } from "../../config/variation";
import { ROUTER_CONSTANTS } from "./../../config/router-constants";
import Button from "../../shared/Button/Button";
import logoImg from "./../../assets/logo.jpg";
import "./Header.css";

export default function Header() {
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
              Computers & Laptops
            </NavLink>
          </Button>
        </nav>
      </header>
    </>
  );
}
