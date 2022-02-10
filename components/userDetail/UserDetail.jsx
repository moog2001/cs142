import React from "react";
import { Link } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";
import "./userDetail.css";
const axios = require("axios");

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    var _isMounted = false;

    this.state = {
      data: null,
    };
  }

  fetch = () => {
    if (
      (this.props.match.params.userId && !this.state.data) ||
      this.props.match.params.userId !== this.state.data._id
    ) {
      axios
        .get(`/user/${this.props.match.params.userId}`)
        .then((response) => {
          if (this._isMounted === true) {
            this.setState({ data: response.data });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetch();
  }

  componentDidUpdate() {
    this.fetch();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.data === null) return <div></div>;

    var user = this.state.data;
    return (
      <div>
        <Typography variant="h3">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Grid
          container
          direction="column"
          justifycontent="center"
          spacing={2}
          columns={16}
        >
          <Grid item={true} xs={2} sm={4} md={4} key="1">
            <p>{user.location}</p>
          </Grid>
          <Grid item={true} xs={2} sm={4} md={4} key="2">
            <p>{user.description}</p>
          </Grid>
          <Grid item={true} xs={2} sm={4} md={4} key="3">
            <p>{user.occupation}</p>
          </Grid>
          <Grid item={true} xs={2} sm={4} md={4} key="4">
            <Button>
              <Link
                to={`/photos/${user._id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                See Photos
              </Link>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserDetail;
