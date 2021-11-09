import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10")
      .then((results) => results.json())
      .then((json) => {
        this.setState({ users: json.results });
      });
  }

  render() {
    var userList = this.state.users;
    console.log(userList);
    console.log(userList.results);

    return (
      <div className="App">
        <div className="Header">
          <p>User List</p>
        </div>
        <div className="TopMargin" />

        {userList.length > 0 &&
          userList.map((user) => (
            <div className="Box">
              <div className="Picture">
                <div className="PhotoBox">
                  <img className="ImgAlign" src={user.picture.large}></img>
                </div>
              </div>
              <div className="Vertical"></div>
              <div className="Details">
                <div className="User">
                  <p>
                    {user.name.title} {user.name.first} {user.name.last}
                  </p>
                  <p>{user.email}</p>
                  <p>
                    {user.location.street.number} {user.location.street.name}{" "}
                    {user.location.city} {user.location.state}{" "}
                    {user.location.country} {user.location.postcode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div className="Footer">
          <p>Frontend Developer</p>
        </div>
      </div>
    );
  }
}

export default App;
