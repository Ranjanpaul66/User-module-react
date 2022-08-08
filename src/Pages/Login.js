// import * as React from "react";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../components/Shared/Common";
const axios = require("axios");

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="rgb(44, 252, 8}" href="https://www.sslwireless.com/">
        SSL Wireless
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [mobileText, setMobileText] = useState();
  const [passText, setPassText] = useState();
  const [errorHeader, setErrorHeader] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      mobile: data.get("mobile"),
      password: data.get("password"),
    };
    if (mobileText == "" || mobileText == undefined) {
      setMobileText("");
    } else if (passText == "" || passText == undefined) {
      setPassText("");
    } else {
      axios
        // .post("http://127.0.0.1:8000/api/v1/user/get-token", payload)
        .post(BASE_URL.concat("/api/v1/user/get-token"), payload)

        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            localStorage.setItem(
              "access",
              JSON.stringify(response.data.data.access)
            );
            localStorage.setItem(
              "sidebar",
              JSON.stringify(response.data.data.dashboard)
            );
            localStorage.setItem(
              "expires_in",
              JSON.stringify(response.data.data.expires_in)
            );
            localStorage.setItem(
              "full_name",
              JSON.stringify(response.data.data.full_name)
            );
            localStorage.setItem(
              "refresh",
              JSON.stringify(response.data.data.refresh)
            );
            navigate("/home");
          }

          console.log(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", error.response.data);
            setErrorHeader(error.response.data.detail);
            console.log("status", error.response.status);
            console.log("headers", error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("error.request", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          // console.log("error.config", error.config);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              onChange={(event) => setMobileText(event.target.value)}
              error={mobileText === ""}
              helperText={mobileText === "" ? "Please Input Mobile no!" : " "}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              onChange={(event) => setPassText(event.target.value)}
              error={passText === ""}
              helperText={passText === "" ? "Please Input password" : " "}
            />
            <Typography color={"red"}>{errorHeader}</Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
