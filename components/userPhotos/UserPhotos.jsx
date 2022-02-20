import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import "./userPhotos.css";
const axios = require("axios");

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    var _isMounted = false;
    super(props);
    this.state = {
      data: null,
      userId: null,
    };
  }

  fetch() {
    axios
      .get(`/photosOfUser/${this.props.match.params.userId}`)
      .then((response) => {
        if (
          this._isMounted &&
          JSON.stringify(this.state.data) !== JSON.stringify(response.data)
        ) {
          this.setState({
            data: response.data,
            userId: this.props.match.params.userId,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate() {
    this.fetch();
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetch();
  }

  giveImages = (element) => {
    if (element.comments !== undefined) {
      const commentArr = Object.values(element.comments);
      return (
        <div>
          {commentArr.map((element, i) => {
            return (
              <div key={i}>
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/users/${element.user._id}`}
                >
                  <Typography variant="h4">{`${element.user.first_name} ${element.user.last_name}`}</Typography>
                </Link>
                <p>{element.date_time}</p>
                <p>{element.comment}</p>
              </div>
            );
          })}
        </div>
      );
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.data === null) return <div></div>;

    if (this.state.userId !== this.props.match.params.userId) {
      this.componentDidMount();
    }

    var photosObj = this.state.data;

    const photos = Object.values(photosObj);

    return (
      <Grid container columns={{ sm: 2, md: 3 }}>
        {photos.map((element, index) => (
          <Grid
            style={{ maxHeight: 400, maxWidth: 300, overflow: "auto" }}
            item
            sm={12}
            md={4}
            key={index}
          >
            <img src={`images/${element.file_name}`} height="128"></img>
            <p>{element.date_time}</p>
            {this.giveImages(element)}
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={(values, actions) => {
                axios
                  .post(`/commentsOfPhoto/${element._id}`, {
                    comment: values.comment,
                  })
                  .then((res) => {
                    actions.setSubmitting(false);
                    this.fetch();
                  });
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.comment}
                    name="comment"
                    id="comment"
                  />

                  <Button type="submit">Enter</Button>
                </form>
              )}
            </Formik>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default UserPhotos;
