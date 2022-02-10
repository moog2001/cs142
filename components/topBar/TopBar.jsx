import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import "./TopBar.css";
import { MyContext } from "../../context";
const axios = require("axios");

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
  }
  state = {
    user: "",
  };

  logOut = () => {
    axios
      .post("/admin/logout")
      .then((res) => {
        this.context.setUser(null);
      })
      .catch((err) => {
        console.error(err);
      });
    window.location.reload();
  };

  render() {
    if (this.context.user === null) {
      return (
        <AppBar className="cs142-topbar-appBar" position="absolute">
          <Toolbar className="toolbar">
            <Typography variant="h5" color="inherit">
              Please Login
            </Typography>
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar className="cs142-topbar-appBar" position="absolute">
          <Toolbar className="toolbar">
            <Typography variant="h5" color="inherit">
              Hello {this.context.user.login_name}
            </Typography>
            <Button variant="contained" onClick={this.logOut}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
      );
    }
  }
}

export default TopBar;
