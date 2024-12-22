import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { formatDistanceToNow } from "date-fns";
import { FcPrevious, FcNext } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";
import useLoader from "../../hooks/useLoader";
import { FadeLoader } from "react-spinners";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, toggleLoading, offLoading } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    getQuestion(currentPage);
  }, [currentPage]);

  async function getQuestion(page) {
    const access_token = localStorage.getItem("access_token");
    toggleLoading;
    try {
      const response = await axios.get("/questions/question", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: { page },
      });

      setQuestions(response.data.questions);
      setTotalPages(response.data.totalPages);
      offLoading();
    } catch (error) {
      console.error(
        "Error fetching questions",
        error.response?.data || error.msg
      );
      offLoading();
    }
  }
  const handlePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const answerQuestion = (question_id) => {
    setTimeout(() => {
      navigate(`/home/${question_id}`);
    }, 1000);
  };
  if (loading) {
    return (
      <div className="">
        <FadeLoader />
      </div>
    );
  }
  if (questions?.length > 0) {
    return (
      <>
        {questions?.map((question, i) => {
          return (
            <div key={i} className="question-wrap ">
              <div className="questions d-flex-column d-sm-flex align-items-center">
                <div className="col-sm-3 col-md-2 ">
                  <span
                    onClick={() => answerQuestion(question.question_id)}
                    className="question-icon"
                    title="Answer this question"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <RxAvatar className="avatar" size={"60"} color="grey" />
                  </span>{" "}
                  <br />
                  <small className="">
                    {question.user_name}
                    <br />{" "}
                    <small className="">
                      {formatDistanceToNow(new Date(question.questioned_at), {
                        addSuffix: true,
                      })}
                    </small>
                  </small>
                </div>
                <p
                  onClick={() => answerQuestion(question.question_id)}
                  className="question-icon title pb-0 col-sm-8 col-md-9 text-start"
                  title="Answer this question"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  {question.question}
                </p>
                <span
                  onClick={() => answerQuestion(question.question_id)}
                  className="question-icon d-none d-sm-block  col-sm-1  ms-auto text-end"
                  title="Answer this question"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <FaChevronRight className="chevron" size={"30"} />
                </span>
              </div>

              <hr className="border border-secondary border-1 opacity-25 mt-2"></hr>
            </div>
          );
        })}
        <div className="pagination-wrap">
          <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline-secondary px-1 py-0 me-3"
          >
            <FcPrevious style={{ color: "red" }} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => {
            return (
              <Link
                to="#"
                key={page}
                onClick={() => handlePage(page)}
                className="me-3"
                disabled={currentPage === page}
              >
                {page}
              </Link>
            );
          })}
          <button
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-outline-secondary px-1 py-0 "
          >
            <FcNext />
          </button>
        </div>
      </>
    );
  } else {
    return (
      <p className="fs-2 display-1 text-center mt-5 text-secondary">
        No questions found. Please check back later.
      </p>
    );
  }
}
export default Question;
