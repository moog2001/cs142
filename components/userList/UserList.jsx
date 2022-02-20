import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { MyContext } from "../../context";
import "./userList.css";
const axios = require("axios");

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      user: "",
      fetched: false,
    };
  }

  fetch = () => {
    axios
      .get("/user/list")
      .then((response) => {
        if (!this.state.fetched) {
          this.setState({
            data: response.data,
            fetched: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.fetch();
  }
  componentDidUpdate() {
    this.fetch();
  }

  giveList() {
    if (this.state.data === null) {
      return;
    }

    return (
      <List component="nav">
        {this.state.data.map((element, index) => {
          var id = `/users/${element._id}`;
          var fullName = `${element.first_name} ${element.last_name}`;
          return (
            <Link to={id} key={index}>
              <ListItem>
                <ListItemText primary={fullName} />
              </ListItem>
              <Divider />
            </Link>
          );
        })}
      </List>
    );
  }

  render() {
    return (
      <div>
        <Typography variant="body1">User:</Typography>
        {this.giveList()}
      </div>
    );
  }
}

export default UserList;
