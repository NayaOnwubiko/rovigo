import "./SignUp.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post("/auth/signup", {
        ...user,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="signup">
        <h2>Sign up to Rovigo & start planning that trip</h2>
        <form onSubmit={handleSignUp}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <span>Already a member? Sign In to your Rovigo Account</span>
        </div>
      </div>
    </>
  );
}

export default SignUp;
