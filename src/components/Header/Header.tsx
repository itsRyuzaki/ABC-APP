import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAppSelector } from "../../store/store-hooks";
import Logo from "../../shared/Logo/Logo";
import { MenuCategories } from "./MenuCategories";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import InputBase from "@mui/material/InputBase";
import SignInCTA from "./SignInCTA";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
  "&:hover": {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  "&:focus-within": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  paddingLeft: "40px",
}));

const Header = () => {
  const { userData, isLoggedIn, areCredsValidated } = useAppSelector(
    (state) => state.authorization,
  );

  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cartDetails.items);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        borderBottom: (theme) =>
          `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>

          <Logo />
        </Box>

        {/* CENTER */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            gap: 3,
          }}
        >
          {/* Categories */}

          {MenuCategories.map((category) => (
            <Button
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  textShadow: (theme) =>
                    `0 0 8px ${alpha(theme.palette.primary.main, 0.6)}`,
                },
              }}
              key={category.route}
              onClick={() => navigate(category.route)}
            >
              {category.label}
            </Button>
          ))}

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search accessories…" />
          </Search>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" sx={{ display: { md: "none" } }}>
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={cartItems.length} color="warning" max={9}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {areCredsValidated ? (
            isLoggedIn ? (
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <SignInCTA />
            )
          ) : (
            <CircularProgress aria-label="Loading…" />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
