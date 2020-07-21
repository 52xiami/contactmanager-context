import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  deleteContact = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer " }}
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    })
                  }
                />
                <i
                  className="fas fa-times"
                  style={{
                    cursor: "pointer",
                    float: "right",
                    color: "red",
                  }}
                  onClick={this.deleteContact.bind(this, id, dispatch)}
                  //onClick={dispatch({ type: "DELETE_CONTACT", payload: id })}
                />
                {"   "}
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem",
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
