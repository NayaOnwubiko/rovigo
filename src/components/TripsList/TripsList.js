import "./TripsList.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TripsItem from "../TripsItem/TripsItem";
import newRequest from "../../utils/newRequest";

function TripsList() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery(["triplist"], () =>
    newRequest.get(`/trips?userId=${currentUser._id}`).then((res) => res.data)
  );

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return "error";
  }

  return (
    <div className="trips-list">
      {data.map((trips) => (
        <Link to={`/trip/${trips._id}`} className="link" key={trips._id}>
          <div className="details">
            <TripsItem tripsItem={trips} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TripsList;
