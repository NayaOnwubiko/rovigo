import "./TripsList.scss";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TripsItem from "../TripsItem/TripsItem";

function TripsList() {
  const [tripsList, setTripsList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.authToken;
    if (!jwtToken) {
      navigate("/");
      return;
    }
    axios
      .get("http://localhost:8080/trips", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setTripsList(response.data);
      })
      .catch((error) => {
        console.error("Could not aceess API:" + error);
      });
  }, [navigate]);

  if (!tripsList) {
    return <p>Start adding trips</p>;
  }

  return (
    <div className="trips-list">
      {tripsList.map((trips) => {
        return (
          <Link to="/trip/123" className="link">
            <div className="details" key={trips.id}>
              <TripsItem tripsItem={trips} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default TripsList;
