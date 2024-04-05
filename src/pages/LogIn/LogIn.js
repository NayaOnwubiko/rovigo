import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="login">
        <h2>Welcome back to Rovigo.</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <button type="submit">Sign In</button>
          {error && error}
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
