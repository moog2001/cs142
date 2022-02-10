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

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`/photosOfUser/${this.props.match.params.userId}`)
      .then((response) => {
        if (this._isMounted) {
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
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {photos.map((element, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <img src={`images/${element.file_name}`} height="128"></img>
            <p>{element.date_time}</p>
            {this.giveImages(element)}
            <Formik initialValues={{ comment: "" }}>
              {(props) => (
                <form
                  action={`/commentsOfPhoto/${element._id}`}
                  method="post"
                  encType="multipart/form-data"
                >
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
