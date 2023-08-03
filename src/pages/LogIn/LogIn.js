import axios from "axios";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

function LogIn() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(inputs);
      navigate("/trips");
    } catch (error) {
      alert("Unable to log in, sorry");
      console.error(error);
    }
    axios
      .post("http://localhost:8080/users/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        localStorage.authToken = response.data.token;
        navigate("/trips");
      })
      .catch((error) => {
        alert("Unable to login, sorry");
        console.error(error);
      });
  };

  const authToken = localStorage.authToken;

  if (authToken) {
    navigate("/trips");
  }

  return (
    <>
      <div className="login">
        <h2>Welcome back to Rovigo.</h2>
        <form>
          <label>
            Email
            <input type="text" name="email" onChange={handleChange}></input>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={handleChange}
            ></input>
          </label>
          <button onClick={handleLogin}>Sign In</button>
        </form>
        <span>
          Not a member? <Link to="/signup">Create an Account</Link> to enjoy the
          best of Rovigo.
        </span>
      </div>
    </>
  );
}

export default LogIn;
