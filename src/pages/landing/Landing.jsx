import Login from "../../components/login/Login";
// import About from "../../components/about/About";
import { AuthContextProvider } from "../../context/AuthContext";
import "./landing.css";

function Landing() {
  return (
    <section className="landing-container ">
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </section>
  );
}

export default Landing;
