import "./SaveTripModal.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function SaveTripModal({ show, setShow, item, userId }) {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(
    ["triplist"],
    async () => {
      const response = await newRequest.get(`/trips?userId=${userId}`);
      return response.data;
    },
    {
      cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
    }
  );

  const [selectedTrip, setSelectedTrip] = useState("");

  const mutation = useMutation(
    (newTrip) => {
      return newRequest.post("/trips", newTrip); // Adjust the endpoint per the API
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tripslist"]);
        setShow(false);
      },
    }
  );

  if (!show) {
    return null;
  }

  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const tripItem = {
      tripId: selectedTrip,
      itemType: item.type,
      itemId: item.id,
    };

    mutation.mutate(tripItem);
  };

  return (
    <div className="modal_container">
      <div className="modal">
        <h4 className="modal__title">Save to Trip</h4>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="modal__close"
          onClick={handleCancel}
        />
        <div className="modal__form">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading trips</div>
          ) : (
            <form onSubmit={handleSave}>
              <label>
                Select a Trip
                <select
                  value={selectedTrip}
                  onChange={(e) => setSelectedTrip(e.target.value)}
                >
                  <option value="" disabled>
                    Select a Trip
                  </option>
                  {data.map((trip) => (
                    <option key={trip._id} value={trip._id}>
                      {trip.title}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaveTripModal;
