import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8080/users/login", {
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then(response => {
                localStorage.authToken = response.data.token;
                navigate("/trips");
            })
            .catch(error => {
                alert("Unable to login, sorry");
                console.error(error);
            })
    }

    const authToken = localStorage.authToken;

    if (authToken) {
        navigate("/trips");
    }

    return (
        <>
        <h2>Log In Page</h2>
            <form onSubmit={handleLogin}>
                <label>Email
                    <input type="text" name="email"></input>
                </label><br />
                <label>Password
                    <input type="password" name="password"></input>
                </label><br />
                <Link to="/signup">Create an Account</Link>
                <button>Sign In</button>
            </form>
        </>
    )

}

export default LogIn;