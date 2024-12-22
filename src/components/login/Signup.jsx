import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import useMessage from "../../hooks/useMessage";
import useAuth from "../../hooks/useAuth";
import { FcOk } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import useLoader from "../../hooks/useLoader";
import { FadeLoader } from "react-spinners";

function SignUp() {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const { toggleSignIn } = useAuth();
  const { passwordType, togglePasswordType } = usePasswordToggle();
  const { successMsg, errorMsg, showSuccessMsg, showErrorMsg } = useMessage();
  const { loading, toggleLoading, offLoading } = useLoader();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
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
    const userNameValue = userNameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const userEmailValue = emailDom.current.value;
    const userPassValue = passwordDom.current.value;
    if (
      !userNameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !userEmailValue ||
      !userPassValue
    ) {
      showErrorMsg("All fields are required");
      return;
    }
    if (!check.agreed) {
      showErrorMsg("You must agree to the terms and conditions");
      return;
    }
    toggleLoading();
    try {
      const response = await axios.post("/users/register", {
        user_name: userNameValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        user_email: userEmailValue,
        user_pass: userPassValue,
      });
      showSuccessMsg(response?.data?.msg);
      offLoading();
      setTimeout(() => {
        navigate("/");
        toggleSignIn();
      }, 1000);
    } catch (error) {
      showErrorMsg(error?.response?.data?.msg);
      offLoading();
    }
  }
  return (
    <div className="signup-container bg-white m-3 p-4  rounded ">
      <div className="text-center ">
        <h3 className="">Join the network </h3>
        <p>
          Already have an account?
          <small onClick={toggleSignIn}> Sign in</small>
        </p>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group
          className="input-container mb-3 "
          controlId="validationCustomUsername"
        >
          <Form.Control
            ref={userNameDom}
            className="animated-input p-2"
            type="text"
            name="user_name"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
          />
        </Form.Group>
        <div className="d-sm-flex mb-3 col">
          <Form.Group
            className="input-container col pb-3 pb-sm-0 pe-sm-3"
            controlId="validationCustom01"
          >
            <Form.Control
              ref={firstNameDom}
              className="animated-input p-2 "
              type="text"
              name="first_name"
              placeholder="First name"
              required
            />
          </Form.Group>
          <Form.Group
            className="input-container col "
            controlId="validationCustom02"
          >
            <Form.Control
              ref={lastNameDom}
              className="animated-input p-2"
              type="text"
              name="last_name"
              required
              placeholder="Last name"
            />
          </Form.Group>
        </div>
        <Form.Group
          className="input-container mb-3 "
          controlId="formGroupEmail"
        >
          <Form.Control
            ref={emailDom}
            className="animated-input p-2"
            type="email"
            name="user_email"
            placeholder="Enter email"
            aria-describedby="email"
            required
          />
        </Form.Group>
        <Form.Group
          className="input-container input-password  mb-3"
          controlId="formGroupPassword"
        >
          <Form.Control
            ref={passwordDom}
            className="animated-input p-2 "
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
        <Form.Group className="mb-3 d-flex ">
          <div className="d-flex flex-column">
            {errorMsg && (
              <small className="text-danger text-center">
                {errorMsg}. <IoIosClose size={"30"} color="red" />
              </small>
            )}
            <div className="d-flex">
              <Form.Check
                required
                feedbackType="invalid"
                label={
                  <small className="ms-2">
                    I agree to the{" "}
                    <Link to="/legal/policy">privacy policy</Link> and
                    <Link to="/legal/terms"> terms</Link> of service.
                  </small>
                }
                checked={check.agreed}
                onChange={(e) =>
                  setCheck({ ...check, agreed: e.target.checked })
                }
              />
            </div>
          </div>
        </Form.Group>
        {loading ? (
          <Button className=" d-flex justify-content-center btn-register d-block col-12 fs-5">
            <FadeLoader size={35} color={"#fff"} />
          </Button>
        ) : (
          <>
            <Button
              className="btn-register d-block col-12 fs-5"
              type="submit"
              value={"register"}
            >
              Agree and Join
            </Button>
            <p className="text-center mt-3" onClick={toggleSignIn}>
              Already have an account?
            </p>
          </>
        )}
      </Form>
    </div>
  );
}
export default SignUp;
