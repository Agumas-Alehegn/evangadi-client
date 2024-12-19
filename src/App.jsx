import { useEffect, useState, createContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import Landing from "./pages/landing/Landing";
import Question from "./pages/postQuestion/Question";
import Home from "./pages/home/Home";
import AnswerPage from "./pages/postAnswer/AnswerPage";
import SharedComponent from "./components/sharedComponent/SharedComponent,";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import UserProvider from "./context/UserProvider";

// export const userContext = createContext();
function App() {
  // const [user_name, setUserName] = useState({});
  const Navigate = useNavigate();
  async function checkUser() {
    const access_token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // setUserName(data);
      // console.log(data);
    } catch (error) {
      console.log(error.response);
      Navigate("/");
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<SharedComponent />}>
          <Route index element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route path="postQuestion" element={<Question />} />
          <Route path="home/:id" element={<AnswerPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
