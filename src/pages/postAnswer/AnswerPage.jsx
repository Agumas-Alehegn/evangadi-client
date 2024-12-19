import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./answer.css";
import { Button, Form } from "react-bootstrap";
import axios from "../../axiosConfig";
import Answer from "../../components/answer/Answer";
// import { response } from "express";

function AnswerPage() {
  const { id } = useParams();
  const answerDom = useRef();
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function getSingleQuestion() {
      const access_token = localStorage.getItem("access_token");
      try {
        const { data } = await axios.get(`/questions/question/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setQuestion(data.question);
      } catch (error) {
        console.log(error.response);
      }
    }
    getSingleQuestion();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerContent = answerDom.current.value;
    if (!answerContent) {
      alert("Answer cannot be empty.");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `/answers/answer/${id}`,
        { answer_description: answerContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Answer posted successfully.");

      answerDom.current.value = "";
    } catch (error) {
      console.log(error.response);
      alert("Failed to post answer.");
    }
  }

  return (
    <section className="container">
      <div className="answer-wrap">
        <h3 className="">Question</h3>
        <div>
          <p className="fw-bold mb-1">{question.question} </p>
          <small>{question.question_description} </small>
        </div>
        <hr />
        <h3>Answers from the community</h3>
        <div className="answer-input-wrap px-4 pt-3 pb-1 ">
          <div className="text-center">
            <Answer />
            <h3 className="">Answer The Top Question</h3>
            <Link className="text-decoration-none text-secondary " to="/home">
              Go to question page
            </Link>
          </div>
          <Form onSubmit={handleSubmit} className="answer-form mt-3">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                ref={answerDom}
                className="answer-form-input"
                as="textarea"
                rows={6}
                placeholder="Your answer..."
              />
            </Form.Group>
            <Button className="btn-postAnswer d-block my-4 fs-5 " type="submit">
              Post Your Answer
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default AnswerPage;
