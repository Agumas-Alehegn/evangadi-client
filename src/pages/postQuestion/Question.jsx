import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./question.css";
import { Button } from "react-bootstrap";
import axios from "../../axiosConfig";

function Question() {
  const questionDom = useRef();
  const navigate = useNavigate();
  const questionDescriptionDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const questionTitleValue = questionDom.current.value;
    const questionDescriptionValue = questionDescriptionDom.current.value;
    if (!questionTitleValue || !questionDescriptionValue) {
      alert("All fields are required.");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "/questions/question",
        {
          question: questionTitleValue,
          question_description: questionDescriptionValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("post successful");
      navigate("/home");
    } catch (error) {
      alert(error?.response?.data.msg);
      console.log(error.response?.data);
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
              <Form.Control ref={questionDom} type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="questionDescription">
              <Form.Control
                ref={questionDescriptionDom}
                as="textarea"
                rows={6}
                placeholder="Question description"
              />
            </Form.Group>
            <Button
              className="btn-postQuestion d-block my-4 fs-5 "
              type="submit"
            >
              Post Your Question
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Question;
