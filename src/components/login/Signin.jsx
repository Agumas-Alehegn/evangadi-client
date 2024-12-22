import React, { useContext, useState, useRef } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FaEyeSlash } from "react-icons/fa";
import UserProvider, { userContext } from "../../context/UserProvider";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import useMessage from "../../hooks/useMessage";
import "./login.css";
import { FcOk } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import { FadeLoader } from "react-spinners";
import useLoader from "../../hooks/useLoader";

function SignIn() {
  const [validated, setValidated] = useState(false);
  const { passwordType, togglePasswordType } = usePasswordToggle();
  const { updateUser } = useContext(userContext);
  const { toggleSignUp } = useAuth();
  const { successMsg, errorMsg, showSuccessMsg, showErrorMsg } = useMessage();
  const { loading, toggleLoading, offLoading } = useLoader();

  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

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
      showErrorMsg("Please enter your email address.");
    } else if (!userPassValue) {
      showErrorMsg("Password is required to log in");
      return;
    }
    toggleLoading();
    try {
      const { data } = await axios.post("/users/login", {
        user_email: userEmailValue,
        user_pass: userPassValue,
      });
      localStorage.setItem("access_token", data.access_token);
      showSuccessMsg(data?.msg);
      offLoading();
      updateUser(data);
      navigate("/home");
    } catch (error) {
      showErrorMsg(error?.response?.data.msg);
      offLoading();
    }
  }

  return (
    <div className="signin-container p-4 bg-white m-3 p-4  rounded ">
      <div className="text-center mb-4 ">
        <h3 className="">Login to your account</h3>
        <p>
          Don't have an account?
          <small onClick={toggleSignUp}> Create a new account</small>
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
          controlId="user_pass"
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
        {loading ? (
          <Button className=" btn-register d-flex justify-content-center  d-block my-4 mx-auto col-12 fs-4">
            <FadeLoader size={35} color={"#fff"} />
          </Button>
        ) : successMsg ? (
          <Button className=" btn-register  d-block my-4 mx-auto col-12 fs-4">
            {successMsg}. <FcOk size={"30"} />
          </Button>
        ) : errorMsg ? (
          <>
            <p className="text-danger text-center">
              {errorMsg}. <IoIosClose size={"30"} color="red" />
            </p>
            <Button
              className="btn-register d-block my-4 mx-auto col-12 fs-4"
              type="submit"
              value={"Sign in"}
            >
              Submit
            </Button>
            )
            <p className="text-center my-3" onClick={toggleSignUp}>
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

            <p className="text-center my-3" onClick={toggleSignUp}>
              Create an account?
            </p>
          </>
        )}
      </Form>
    </div>
  );
}

export default SignIn;
