import "./CreateTripsModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useState } from "react";

function CreateTripsModal({ setShow, show, userId }) {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newTrip) => {
      return newRequest.post("/trips", newTrip);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tripslist"]);
        await queryClient.refetchQueries(["tripslist"]);
        setSuccessMessage("Trip successfully created!");
      },
    }
  );

  if (!show) {
    return null;
  }

  // If the user clicks cancel, navigate to the trips page
  const handleCancel = () => {
    setShow(false);
    navigate("/trips");
  };

  // If the user clicks create, make an axios post request to the endpoint and add to the trips table in the database
  const handleCreate = async (e) => {
    e.preventDefault();

    const newTrip = {
      title: e.target.trip_name.value,
      userId,
    };

    mutation.mutate(newTrip);
    setShow(false);
  };

  return (
    <div className="modal_container">
      <div className="modal">
        <h4 className="modal__title">Create a new trip</h4>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="modal__close"
          onClick={handleCancel}
        />
        <div className="modal__form">
          {successMessage ? (
            <div className="message">{successMessage}</div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTripsModal;
