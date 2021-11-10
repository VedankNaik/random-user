import React, { Component } from "react";
import "./App.css";
import Users from "./components/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import Protected from "./components/Protected";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Link className="Links" to="/">Login</Link>
          <Link className="Links" to="register">Register</Link>
          {/* <Link to="users">Users</Link> */}

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/users" element={<Protected cmp={Users}/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
