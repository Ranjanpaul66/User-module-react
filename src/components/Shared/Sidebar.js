import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Home,
  ManageAccounts,
  Settings,
  ExpandLess,
  ExpandMore,
  AccountCircle,
  People,
  Logout,
} from "@mui/icons-material";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Sidebar = () => {
  const custom_css = {
    // pl: 4,
    "&.Mui-selected": {
      backgroundColor: "#C0C0C0",
    },
  };
  const location = useLocation();

  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickLogout = () => {
    // const navigate = useNavigate();
    console.log("first");
    // navigate("/");
    localStorage.clear();

    window.location.href = "/";
  };
  return (
    <Box
      flex={2}
      bgcolor="rgb(233, 236, 240)"
      // color="white"
      height="100vh"
      position="sticky"
      sx={{ display: { xs: "none", sm: "block" }, mb: "0px" }}
    >
      <List aria-labelledby="nested-list-subheader">
        <Link to={"/home"} style={{ color: "inherit", textDecoration: "none" }}>
          <ListItemButton
            selected={"/home" === location.pathname}
            disablePadding
            sx={custom_css}
          >
            <ListItemIcon bgcolor="white">
              <Home />
            </ListItemIcon>

            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="User Module" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to={"/users"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItemButton
                selected={"/users" === location.pathname}
                // sx={{ pl: 4 }}
                sx={{
                  pl: 4,
                  "&.Mui-selected": {
                    backgroundColor: "#C0C0C0",
                  },
                }}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>

                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>

            <Link
              to={"/user-role"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItemButton
                selected={"/user-role" === location.pathname}
                // sx={{ pl: 4 }}
                sx={{
                  pl: 4,
                  "&.Mui-selected": {
                    backgroundColor: "#C0C0C0",
                  },
                }}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>

                <ListItemText primary="Users Role" />
              </ListItemButton>
            </Link>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Role Wise Screen" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton disablePadding onClick={handleClickLogout}>
          <ListItemIcon bgcolor="white">
            <Logout />
          </ListItemIcon>

          <ListItemText
            style={{ color: "red", textDecoration: "none" }}
            primary="Logout"
          ></ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
