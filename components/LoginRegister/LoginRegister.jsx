import React from "react";
import { TextField, CssBaseline, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { MyContext } from "../../context";
import { Redirect } from "react-router";
import { useContext } from "react";
import "./LoginRegister.css";
const LoginRegister = () => {
  const Context = useContext(MyContext);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const redirect = () => {
    if (Context.user) {
      return <Redirect to={`/users/${Context.user._id}`} />;
    }
  };

  return (
    <CssBaseline>
      {redirect()}
      <div className="mainContainer">
        <form action="/admin/login" method="POST" encType="multipart/form-data">
          <TextField
            margin="normal"
            required
            fullWidth
            id="login_name"
            label="Username"
            name="login_name"
            autoComplete="name"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </CssBaseline>
  );
};

export default LoginRegister;
