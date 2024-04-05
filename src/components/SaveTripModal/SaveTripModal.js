import "./SaveTripModal.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function SaveTripModal({ show, setShow, item, userId, itemType }) {
  // Initialize the query client
  const queryClient = useQueryClient();

  // State to track the selected trip
  const [selectedTrip, setSelectedTrip] = useState("");

  // State to track the saved message and its visibility
  const [savedMessage, setSavedMessage] = useState(false);

  // Fetch trips data using a query
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

  // Mutation for saving an item to a trip
  const mutation = useMutation(
    (newItem) => {
      let endpoint = `/${itemType}s`; // Use dynamic endpoint based on itemType

      return newRequest.post(endpoint, newItem);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tripslist"]);
        setShow(false);
        setSavedMessage(true);
      },
    }
  );

  // Handle clicking a list item
  const handleSave = (tripId) => {
    setSelectedTrip(tripId);

    if (!tripId) {
      return <p>Please select a trip</p>;
    }

    // Create the new item with the selected trip and mutate to save
    const newItem = {
      tripId: tripId,
      ...item,
    };

    mutation.mutate(newItem);
  };

  // Handle the cancel action
  const handleCancel = () => {
    setShow(false);
  };

  // Render the modal content
  if (!show) {
    return null;
  }

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
            <form>
              <label>
                Select a Trip
                <ul>
                  {data.map((trip) => (
                    <li
                      key={trip._id}
                      onClick={() => handleSave(trip._id)}
                      className={selectedTrip === trip._id ? "selected" : ""}
                    >
                      <div className="trip-details">
                        <img src={trip.photo} alt="" />
                        <span>{trip.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </label>
            </form>
          )}
        </div>
      </div>
      {savedMessage && (
        <div className="saved">
          {itemType.charAt(0).toUpperCase() + itemType.slice(1)} saved to trip!
        </div>
      )}
    </div>
  );
}

export default SaveTripModal;
