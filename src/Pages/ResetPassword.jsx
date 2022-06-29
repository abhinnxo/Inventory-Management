import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [redirectToOTP, setRedirectToOTP] = useState(false);

  const navigate = useNavigate();

  async function sendemail() {
    const response = await fetch("http://localhost:1000/api/generate-otp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    console.log("Hi im heere!!", data);

    setOTP(data.otp);

    if (data.user) setRedirectToOTP(true);
    else {
      setRedirectToOTP(false);
      alert("User with that email not found");
    }
  }

  return (
    <>
      <div className="my-5 text-center">
        <h1>Reset Password</h1>
      </div>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              sendemail();
            }}
          >
            Send OTP
          </Button>
        </Form>
      </Container>
      {redirectToOTP ? (
        navigate("/reset-password/otp", {
          state: {
            email: email,
            otp: otp,
          },
        })
      ) : (
        // <Navigate to="/reset-password/otp" />
        <></>
      )}
    </>
  );
}
