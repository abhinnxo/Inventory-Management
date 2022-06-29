import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router";

export default function ResetPasswordOTP() {
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");

  const { state } = useLocation();
  const { email, otp } = state;

  const navigate = useNavigate();

  async function changePassword() {
    if (code === otp) {
      const response = await fetch("http://localhost:1000/api/reset-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: code,
          newPass,
        }),
      });

      alert("Password changed successfully");
      navigate("/");
    } else {
      alert("Invalid OTP or Entered the same password as before");
    }
  }

  return (
    <>
      <div className="text-center mt-5">
        <h1>Reset Your Password</h1>
        <p>A secret code has been sent to your email</p>
      </div>
      <br />
      <Container>
        <Form className="mb-3" controlId="formBasicEmail">
          <Form.Label>Secret Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your secret code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <br />
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              changePassword();
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
