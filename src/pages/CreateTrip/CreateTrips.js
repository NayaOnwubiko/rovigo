import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/authContext";

function CreateTrip() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/trips/create", {
        id: uuidv4(),
        trip_name: event.target.trip_name.value,
        user_id: currentUser,
      })
      .then((response) => {
        alert("Trip successfully created");
        console.log(response);
        navigate("/trips");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleCreate}>
      <label>
        Trip Name
        <input
          type="text"
          placeholder="Enter your trip name"
          name="trip_name"
        ></input>
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateTrip;
