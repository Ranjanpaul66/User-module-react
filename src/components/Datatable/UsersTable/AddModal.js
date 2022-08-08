import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../../Shared/Common";
import CloseIcon from "@mui/icons-material/Close";

import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const axios = require("axios");

export default function Addmodal(props) {
  const { open, setOpen, seterror, setSuccess, table_load } = props;
  // const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const [role, setRole] = React.useState("");

  const url = "http://127.0.0.1:8000/api/v1/user/user-role-list";
  const [roles, setRoles] = React.useState([]);
  const call_api = () => {
    fetch(url, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Api is not working!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data.data);
        setRoles(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    call_api();
  }, []);

  const [passText, setPassText] = React.useState();
  const [fullNameText, setFullName] = React.useState();
  const [mobileText, setMobileText] = React.useState();
  const [emailText, setEmailText] = React.useState();
  const [errorHeader, setErrorHeader] = React.useState("");
  const [userRoleText, setUserRoleText] = React.useState();

  const handleChangeMenu = (event) => {
    setRole(event.target.value);
    setUserRoleText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      full_name: data.get("full_name"),
      mobile: data.get("mobile"),
      user_role: data.get("user_role"),
      password: data.get("password"),
      email: data.get("email"),
    };
    if (fullNameText == "" || fullNameText == undefined) {
      setFullName("");
    } else if (passText == "" || passText == undefined) {
      setPassText("");
    } else if (mobileText == "" || mobileText == undefined) {
      setMobileText("");
    } else if (emailText == "" || emailText == undefined) {
      setEmailText("");
    } else {
      axios
        // .post("http://127.0.0.1:8000/api/v1/user/get-token", payload)
        .post(BASE_URL.concat("/api/v1/user/user-save"), payload)

        .then((response) => {
          console.log(response);
          if (response.status == 200 && response.data.status_code == 200) {
            console.log("success save");
            setSuccess("User Sccuessfully Added!");
            setOpen(false);
            table_load();
          } else {
            console.log("Error", response.message);
          }

          console.log(response.data);
        })
        .catch(function(error, response) {
          if (error.response) {
            setErrorHeader(error.response.data.detail);
          } else if (error.request) {
            console.log("error.request", error.request);
          } else {
            console.log("Error", response.message);
          }
        });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography component="h1" variant="h5">
              Add User
            </Typography>

            <IconButton onClick={handleClose} sx={{ alignItems: "end" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // required
              margin="normal"
              fullWidth
              id="full_name"
              label="Name"
              name="full_name"
              autoComplete="full_name"
              autoFocus
              onChange={(event) => setFullName(event.target.value)}
              error={fullNameText === ""}
              helperText={fullNameText === "" ? "Please Input Full Name" : " "}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                User Role
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={role}
                label="User Role"
                name="user_role"
                onChange={handleChangeMenu}
                sx={{ mb: 2, minWidth: 580 }}
                error={userRoleText === ""}
                helperText={
                  userRoleText === "" ? "Please Input User Role" : " "
                }
              >
                {roles.map((role) => (
                  <MenuItem value={role.id}>
                    <em>{role.role_name}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              // required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              autoFocus
              onChange={(event) => setPassText(event.target.value)}
              error={passText === ""}
              helperText={passText === "" ? "Please Input password" : " "}
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              autoComplete="mobile"
              type="tel"
              autoFocus
              onChange={(event) => setMobileText(event.target.value)}
              error={mobileText === ""}
              helperText={mobileText === "" ? "Please Input Mobile no!" : " "}
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmailText(event.target.value)}
              error={emailText === ""}
              helperText={emailText === "" ? "Please Input Email" : " "}
            />

            <Typography color={"red"}>{errorHeader}</Typography>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
