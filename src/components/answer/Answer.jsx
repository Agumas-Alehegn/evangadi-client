import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import axios from "../../axiosConfig";
import { FcNext, FcPrevious } from "react-icons/fc";

function Answer() {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    getAnswers(currentPage);
  }, [currentPage]);

  async function getAnswers(page) {
    const access_token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`/answers/answer/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: { page },
      });
      setAnswers(data.answers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error fetching Answers", error);
    }
  }

  const handlePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (answers?.length > 0) {
    return (
      <div className="answer mb-3">
        {answers?.map((answer, i) => (
          <div
            key={i}
            className="d-sm-flex align-items-center gap-2 border border-success-subtle rounded p-2 mb-2"
          >
            <div className="text-center col-sm-2">
              <span>
                <RxAvatar size={"75"} color="grey" />
              </span>
              <br />
              <small>{answer.answer_user_name}</small> <br />
              <small>
                {formatDistanceToNow(new Date(answer.answered_at), {
                  addSuffix: true,
                })}
              </small>
            </div>
            <div className="col-sm-10 ">
              <small className="text-start">{answer.answer_description}</small>
            </div>
          </div>
        ))}
        <div className="pagination-wrap">
          <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline-secondary px-1 py-0 me-3"
          >
            <FcPrevious style={{ color: "red" }} />
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-outline-secondary px-1 py-0 ms-3 "
          >
            <FcNext />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <p className="display-2 text-center mt-5 text-secondary">
        No answers provided so far
      </p>
    );
  }
}

export default Answer;
