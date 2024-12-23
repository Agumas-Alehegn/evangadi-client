import React, { useContext } from "react";
import { userContext } from "../../context/UserProvider";
import Question from "../../components/question/Question";
import "./home.css";
import { useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";

function Home() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const { loading, toggleLoading, offLoading } = useLoader();

  const askNewQuestion = () => {
    setTimeout(() => {
      navigate("/postQuestion");
    }, 1000);
  };
  return (
    <section className="home-container">
      <div className="container mt-4">
        <div className="header-wrap  d-flex flex-column flex-sm-row mb-4  ">
          <button
            onClick={askNewQuestion}
            className="btn-askQuestion btn btn-primary order-2 order-sm-1 col-4 col-md-3"
          >
            Ask Question
          </button>
          {user && (
            <p className="  order-1 order-sm-2 ms-auto ">
              Welcome: {user.user_name}
            </p>
          )}
        </div>
        <div className="questions-container">
          <h3 className="title">Questions</h3>
          <hr className="border border-secondary border-1 opacity-25"></hr>

          <Question />
        </div>
      </div>
    </section>
  );
}

export default Home;
