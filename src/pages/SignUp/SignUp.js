import './SignUp.scss';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
//Once the user signs up, navigate to the trips page

    const navigate = useNavigate();

    if (localStorage.authToken) {
        navigate("/trips");
    }

    const handleSignUp = (event) => {
        event.preventDefault();

    //Post the signup details to the endpoint
        axios.post("http://localhost:8080/users/signup", {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        })
        .then(response => {
            localStorage.authToken = response.data.token;
            navigate("/trips");
        })
        .catch(error => {
            alert("Unable to Sign Up, please try again");
        })
    }

    return (
        <>
        <h1>SignUp Page</h1>
            <section>
                <form onSubmit={handleSignUp}>
                    <label>Name
                        <input type="text" name="name"></input>
                    </label>
                    <label>Email
                        <input type="text" name="email"></input>
                    </label>
                    <label>Password
                        <input type="password" name="password"></input>
                    </label>
                    <button>Sign Up</button>
                </form>
            </section>
        </>
    )
}

export default SignUp;