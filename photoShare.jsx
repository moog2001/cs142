import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/UserDetail";
import UserList from "./components/userList/UserList";
import UserPhotos from "./components/userPhotos/UserPhotos";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import { MyContext } from "./context";
import axios from "axios";

class PhotoShare extends React.Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
  }

  setUser = (userObj) => {
    this.setState({ user: userObj });
  };

  state = {
    user: null,
    setUser: this.setUser,
  };

  redirect = () => {
    if (this.state.user === null) {
      return <Redirect to="/login" />;
    }
  };

  componentDidMount() {
    axios
      .get("/currentUser")
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  redirectToCurrentUser = () => {};

  render() {
    return (
      <HashRouter>
        <MyContext.Provider value={this.state}>
          {this.redirect()}
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Route
                path="/:variant/:userId"
                children={(props) => <TopBar {...props} />}
              ></Route>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <Route
                  path="/users/:userId"
                  children={(props) => <UserList {...props} />}
                />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} />}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} />}
                  />
                  <Route
                    path="/login"
                    render={(props) => <LoginRegister {...props} />}
                  />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </MyContext.Provider>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
