import React from "react";
import { Link } from "react-router-dom";
import "./how.css";

function How() {
  return (
    <section className="how container">
      <div className="col-10 mx-auto">
        <h2 className=" ">How Evangadi Network Works</h2>
        <hr />
        <h3 className="t"> Create an Account</h3>
        <p>
          To get started, simply <Link to={"/"}>sign up </Link> on our platform.
          This will give you access to all the features that our community
          offers. You can create a profile, track your activity, and interact
          with others.
          <p>
            <strong>Sign Up:</strong>Fill in your basic details, including your
            name, email, and password.
          </p>
        </p>
        <h3>Ask Questions </h3>
        <p>
          As a community, we believe in asking questions and finding answers
          together. If you're stuck on a project, confused about a concept, or
          looking for advice on a particular topic, feel free to ask your
          question. Here's how you can do that: Click "Ask a Question": You'll
          find a simple form to submit your question. Be clear and provide any
          relevant details about your issue
          <ul>
            <li>
              <strong>Title:</strong> Choose the appropriate title for your
              question, so other members can easily find it.
            </li>
            <li>
              <strong> Submit:</strong>
              Once your question is submitted, it will be visible to the
              community for answers.
            </li>
          </ul>
        </p>
        <h3>Answer Questions</h3>
        <p>
          If you have the knowledge to help, you can contribute by answering
          questions. Answering questions not only helps others but also helps
          you grow your own skills as you explain complex topics. Here's how to
          answer:
          <ul>
            <li>
              {" "}
              <strong>Browse Questions:</strong>Browse through the list of
              questions posted by other members.
            </li>
            <li>
              {" "}
              <strong> Provide Solutions:</strong>Click on any question to view
              its details and post your answer. Be clear, concise, and provide
              explanations or links that may help others.
            </li>
          </ul>
        </p>
        <p>
          <Link to={"/"}>Join Now </Link>and become part of the community, where
          knowledge is shared, and everyone has something valuable to
          contribute. Whether you’re looking for solutions to your problems, or
          you want to help others, Evangadi Networks is the place for you!
        </p>
      </div>
    </section>
  );
}

export default How;
