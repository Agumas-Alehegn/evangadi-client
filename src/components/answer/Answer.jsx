import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { formatDistanceToNow } from "date-fns";
import { FcNext, FcPrevious } from "react-icons/fc";
import { FadeLoader } from "react-spinners";
import useLoader from "../../hooks/useLoader";

function Answer({ data, getAnswerFunc }) {
  const { answers, totalPages } = data;
  const [currentPage, setCurrentPage] = useState(1);
  const { loading } = useLoader();

  useEffect(() => {
    getAnswerFunc(currentPage);
  }, [currentPage]);

  const handlePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (loading) {
    <div>
      <FadeLoader />
    </div>;
  }
  if (answers?.length > 0) {
    return (
      <div className="answer mb-3">
        {answers?.map((answer, i) => (
          <div
            key={i}
            className="d-sm-flex align-items-center gap-3 border border-success-subtle rounded p-2 mb-2"
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
            <div className=" ">
              <small className="text-start">{answer.answer_description}</small>
            </div>
          </div>
        ))}
        <div className="pagination-wrap ">
          <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline-secondary px-1 py-0 me-3"
          >
            <FcPrevious className="Icon" />
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
