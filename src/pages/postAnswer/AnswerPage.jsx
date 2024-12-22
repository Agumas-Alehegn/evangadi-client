import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import Answer from "../../components/answer/Answer";
import useCharacterLimit from "../../hooks/useCharacterLimit";
import useMessage from "../../hooks/useMessage";
import { Button, Form } from "react-bootstrap";
import "./answer.css";
import useLoader from "../../hooks/useLoader";
import { FadeLoader } from "react-spinners";

function AnswerPage({ maxLength = 200 }) {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState({});
  const { text, limitReached, characterCount, handleChange, reset } =
    useCharacterLimit(maxLength);
  const { successMsg, errorMsg, showSuccessMsg, showErrorMsg } = useMessage();
  const { loading, offLoading, toggleLoading } = useLoader();

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
  const getAnswers = async (page) => {
    const access_token = localStorage.getItem("access_token");
    toggleLoading();
    try {
      const response = await axios.get(`/answers/answer/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: { page },
      });
      setAnswers(response.data);
      offLoading();
    } catch (error) {
      console.log("Error fetching Answers", error);
      offLoading();
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      showErrorMsg("Answer cannot be empty.");
      return;
    }
    toggleLoading();
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.post(
        `/answers/answer/${id}`,
        { answer_description: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSuccessMsg(data.msg);
      getAnswers();
      offLoading();
      reset();
    } catch (error) {
      showErrorMsg(error.response.data.msg);
      offLoading();
      reset();
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
            <Answer data={answers} getAnswerFunc={getAnswers} />
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
                className="answer-form-input"
                as="textarea"
                rows={6}
                placeholder={`Type upto ${maxLength} characters`}
                value={text}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-end ">
              {characterCount === 0 ? (
                ""
              ) : (
                <small
                  className="me-2 text-muted
              "
                >
                  {text.length} / {maxLength}
                </small>
              )}

              {limitReached && (
                <small className="text-danger">
                  You hit the maximum limit!!!
                </small>
              )}
            </div>
            {successMsg && <div className="text-success">{successMsg}</div>}
            {errorMsg && <div className="text-danger">{errorMsg}</div>}
            {loading ? (
              <Button type="submit">
                <FadeLoader size={35} color={"#fff"} />
              </Button>
            ) : (
              <Button
                className="btn-postAnswer d-block my-4 fs-5 "
                type="submit"
              >
                Post Your Answer
              </Button>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
}
export default AnswerPage;
