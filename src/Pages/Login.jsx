import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../styles/login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user === true) window.location.href = "/dashboard";
    else alert("Email or Password is wrong!");
  }

  return (
    <>
      <Form onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
        </Form.Group>
        <Link to="/reset-password">Forgot Password</Link>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
        <br />
        <br />
        Don't have an Account?&nbsp;
        <Link to="/register">register</Link>.
      </Form>
    </>
  );
}

export default function Login() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
