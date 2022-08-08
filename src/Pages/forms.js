import React from "react";
import "./styles.css";
import PhoneNumber from "./PhoneNumber";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { validator } from "./Validator";
import useForm from "./useForm";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  papper: {
    padding: "20px",
    width: "40vh",
    height: "50vh",
  },
}));

export default function App() {
  const initState = {
    email: "",
    password: "",
    phone: "",
  };

  const submit = () => {
    console.log(" Submited");
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    errors,
    countryCode,
  } = useForm({
    initState,
    callback: submit,
    validator,
  });

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  const { margin, papper } = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper className={papper} elevation={4} square={false}>
        <form onSubmit={handleSubmit}>
          <div>
            {/* EMAIL */}
            <TextField
              required
              label="Email"
              name="email"
              className={margin}
              defaultValue={state.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              onBlur={handleBlur}
            />
            <br />
            {/* PASSWORD */}
            <TextField
              required
              label="Password"
              name="password"
              type="password"
              className={margin}
              defaultValue={state.password}
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
              onBlur={handleBlur}
            />
          </div>
          {/* PHONENUMBER */}
          <div className={margin}>
            <PhoneNumber
              errors={errors}
              state={state}
              handleChange={handleChange}
              handleBlur={handleBlur}
              countryCode={countryCode}
            />
          </div>
          <div>
            <Button
              disabled={!isValidForm}
              type="submit"
              variant="contained"
              color="primary"
              className={margin}
            >
              Next
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}
