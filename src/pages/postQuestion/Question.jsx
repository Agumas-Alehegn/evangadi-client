import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./question.css";
import { Button } from "react-bootstrap";
import axios from "../../axiosConfig";
import useCharacterLimit from "../../hooks/useCharacterLimit";
import useMessage from "../../hooks/useMessage";
import useLoader from "../../hooks/useLoader";
import { ClipLoader, FadeLoader } from "react-spinners";

export function Question() {
  const navigate = useNavigate();
  const questionDom = useRef();
  const questionDescriptionDom = useRef();
  const { successMsg, errorMsg, showSuccessMsg, showErrorMsg } = useMessage();
  const titleLimit = useCharacterLimit(50);
  const descriptionLimit = useCharacterLimit(200);
  const { loading, toggleLoading, offLoading } = useLoader();

  async function handleSubmit(e) {
    e.preventDefault();
    const questionTitleValue = questionDom.current.value;
    const questionDescriptionValue = questionDescriptionDom.current.value;
    if (!questionTitleValue || !questionDescriptionValue) {
      showErrorMsg("All fields are required.");
      return;
    }
    toggleLoading();
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.post(
        "/questions/question",
        {
          question: questionTitleValue,
          question_description: questionDescriptionValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showSuccessMsg(data.msg);
      offLoading();
      titleLimit.reset();
      descriptionLimit.reset();
      navigate("/home");
    } catch (error) {
      showErrorMsg(error?.response?.data.msg);
      offLoading();
    }
  }

  return (
    <section className="container">
      <div className="question-wrap col col-md-9 mx-auto">
        <div className=" mb-5">
          <h3 className="text-center">Steps to write a good questions</h3>
          <ul className="ms-5">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen. </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className="question-input-wrap px-4 pt-3 pb-1 ">
          <div className="text-center">
            <h3 className="">Ask a public question</h3>
            <Link className="text-decoration-none text-secondary " to="/home">
              Go to question page
            </Link>
          </div>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3" controlId="questionTitle">
              <Form.Control
                ref={questionDom}
                type="text"
                placeholder={`Type upto ${titleLimit.maxLength} characters`}
                onChange={titleLimit.handleChange}
                value={titleLimit.text}
              />
            </Form.Group>
            <div className="text-end ">
              {titleLimit.characterCount === 0 ? (
                ""
              ) : (
                <small
                  className="me-2 text-muted
              "
                >
                  {titleLimit.text.length} / {titleLimit.maxLength}
                </small>
              )}

              {titleLimit.limitReached && (
                <small className="text-danger">
                  You hit the maximum limit!!!
                </small>
              )}
            </div>
            <Form.Group className="mb-3" controlId="questionDescription">
              <Form.Control
                ref={questionDescriptionDom}
                as="textarea"
                rows={6}
                placeholder={`Type upto ${descriptionLimit.maxLength} characters`}
                onChange={descriptionLimit.handleChange}
                value={descriptionLimit.text}
              />
            </Form.Group>
            <div className="text-end ">
              {descriptionLimit.characterCount === 0 ? (
                ""
              ) : (
                <small
                  className="me-2 text-muted
              "
                >
                  {descriptionLimit.text.length} / {descriptionLimit.maxLength}
                </small>
              )}

              {descriptionLimit.limitReached && (
                <small className="text-danger">
                  You hit the maximum limit!!!
                </small>
              )}
            </div>
            {successMsg && <div className="text-success">{successMsg}</div>}
            {errorMsg && <div className="text-danger">{errorMsg}</div>}
            {loading ? (
              <Button className=" btn-register d-flex justify-content-center  d-block my-4   col-6 fs-5">
                Posting question <ClipLoader size={35} color={"#fff"} />
              </Button>
            ) : (
              <Button
                className="btn-postQuestion d-block my-4 fs-5 "
                type="submit"
              >
                Post Your Question
              </Button>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Question;
