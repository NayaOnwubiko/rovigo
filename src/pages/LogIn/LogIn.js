// import axios from "axios";
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
    //     axios
    //         .post("http://localhost:8080/users/login", {
    //             email: event.target.email.value,
    //             password: event.target.password.value
    //         })
    //         .then(response => {
    //             localStorage.authToken = response.data.token;
    //             navigate("/trips");
    //         })
    //         .catch(error => {
    //             alert("Unable to login, sorry");
    //             console.error(error);
    //         })
  };

  const authToken = localStorage.authToken;

  if (authToken) {
    navigate("/trips");
  }

  return (
    <>
      <h2>Log In Page</h2>
      <form>
        <label>
          Email
          <input type="text" name="email" onChange={handleChange}></input>
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <Link to="/signup">Create an Account</Link>
        <button onClick={handleLogin}>Sign In</button>
      </form>
    </>
  );
}

export default LogIn;
