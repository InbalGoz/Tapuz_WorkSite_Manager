import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

/*List and navigation path for all relevent tabs*/
const pages = [
  { label: "אתרים", path: "/sites" },
  { label: "רשימת עובדים", path: "/employees" },
  { label: "דיווח שעות עבודה", path: "/workhours" },
];

const TopBar: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation, allows navigation inside the components
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar
        sx={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 64,
          px: { xs: 1, sm: 3 },
        }}
      >
        {/*כפתור יציאה*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 80,
            justifyContent: "flex-start",
          }}
        >
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: 500,
              minWidth: 60,
              ml: 0,
            }}
          >
            יציאה
          </Button>
        </Box>
        {/* ניווט (במרכז! ראה הסבר למטה) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleOpenMenu}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                dir="rtl"
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => handleNavigate(page.path)}
                  >
                    {page.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  color="inherit"
                  onClick={() => handleNavigate(page.path)}
                  sx={{ fontWeight: 500 }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        {/* לוגו/שם האתר צמוד לימין */}
        <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            תפוז פרוייקטים
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
