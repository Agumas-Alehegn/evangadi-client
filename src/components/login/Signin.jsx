import React, { useContext, useState, useRef } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { userContext } from "../../context/UserProvider";

import "./login.css";
import { FcOk } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";

function SignIn() {
  const [validated, setValidated] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const { toggleForm } = useContext(AuthContext);
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updateUser } = useContext(userContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const userEmailValue = emailDom.current.value;
    const userPassValue = passwordDom.current.value;
    if (!userEmailValue) {
      setErrorMessage("Please enter your email address.");
    } else if (!userPassValue) {
      setErrorMessage("Password is required to log in");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        user_email: userEmailValue,
        user_pass: userPassValue,
      });
      localStorage.setItem("access_token", data.access_token);
      setSuccessMessage(data?.msg);
      console.log(data);
      updateUser(data);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setErrorMessage(error?.response?.data.msg);
    }
  }

  const togglePasswordType = () => {
    setPasswordType((prevPass) =>
      prevPass === "password" ? "text" : "password"
    );
  };
  return (
    <div className="signin-container p-4 bg-white m-3 p-4  rounded ">
      <div className="text-center mb-4 ">
        <h3 className="">Login to your account </h3>
        <p>
          Don't have an account?
          <small onClick={toggleForm}> Create a new account</small>
        </p>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="input-container mb-3" controlId="userEmail">
          <Form.Control
            ref={emailDom}
            className="animated-input p-3"
            type="email"
            name="user_email"
            placeholder="Enter email"
            aria-describedby="email"
            required
          />
        </Form.Group>
        <Form.Group
          className="input-container input-password  mb-3 "
          controlId="userPassword"
        >
          <Form.Control
            ref={passwordDom}
            className="animated-input p-3 "
            type={passwordType}
            name="user_pass"
            placeholder="Password"
            aria-describedby="pass"
            required
          />
          <span>
            <FaEyeSlash
              size={"20"}
              className="eyeBtn"
              onClick={togglePasswordType}
            />
          </span>
        </Form.Group>

        {successMessage ? (
          <Button className=" btn-register  d-block my-4 mx-auto col-12 fs-4">
            {successMessage}. <FcOk size={"30"} />
          </Button>
        ) : errorMessage ? (
          <>
            <p className="text-danger text-center">
              {errorMessage}. <IoIosClose size={"30"} color="red" />
            </p>

            <Button
              className="btn-register d-block my-4 mx-auto col-12 fs-4"
              type="submit"
              value={"Sign in"}
            >
              Submit
            </Button>
            <p className="text-center my-3" onClick={toggleForm}>
              Create an account?
            </p>
          </>
        ) : (
          <>
            <Button
              className="btn-register d-block my-4 mx-auto col-12 fs-4"
              type="submit"
              value={"Sign in"}
            >
              Submit
            </Button>
            <p className="text-center my-3" onClick={toggleForm}>
              Create an account?
            </p>
          </>
        )}
      </Form>
    </div>
  );
}

export default SignIn;
