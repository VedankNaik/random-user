import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReg, setIsReg] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: event.target.email.value,
        password: event.target.password.value,
      }),
    };

    fetch("http://localhost:8082/api/auth/register", requestOptions)
      .then((result) => result.json())
      .then((response) => setIsReg(response));
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <hr />
        <Button className="Btn" block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
      <div className="Registration">
        {isReg ? "Resgistration successful" : ""}
      </div>
    </div>
  );
}
