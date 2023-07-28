import "./CreateTripsModal.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/authContext";

function CreateTripsModal({ setShow, show }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  //If the user clicks cancel, navigate to the trips page
  const handleCancel = () => {
    setShow(false);
    navigate("/trips");
  };

  //If the user clicks create, make an axios post request to the endpoint and add to the trips table in the database
  const handleCreate = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:8080/trips/create", {
        id: uuidv4(),
        trip_name: event.target.trip_name.value,
        user_id: currentUser,
      })
      .then((response) => {
        setShow(false);
        alert("Trip successfully created");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal">
      <h4 className="modal__title">Create a new trip </h4>
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
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateTripsModal;
