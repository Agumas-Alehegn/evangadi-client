import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import Landing from "./pages/landing/Landing";
import Question from "./pages/postQuestion/Question";
import Home from "./pages/home/Home";
import AnswerPage from "./pages/postAnswer/AnswerPage";
import How from "./pages/how/How";
import SharedComponent from "./components/sharedComponent/SharedComponent,";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import UserProvider from "./context/UserProvider";
import LoaderProvider from "./context/LoaderProvider";

function App() {
  const Navigate = useNavigate();
  const location = useLocation();
  const isHowPage = location.pathname === "/how";

  async function checkUser() {
    const access_token = localStorage.getItem("access_token");
    try {
      await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      if (isHowPage) {
        Navigate("/how");
      } else {
        Navigate("/");
      }
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthProvider>
      <LoaderProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<SharedComponent />}>
              <Route index element={<Landing />} />
              <Route path="how" element={<How />} />
              <Route path="home" element={<Home />} />
              <Route path="postQuestion" element={<Question />} />
              <Route path="home/:id" element={<AnswerPage />} />
            </Route>
          </Routes>
        </UserProvider>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
