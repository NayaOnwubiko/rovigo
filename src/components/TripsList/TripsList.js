import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TripsItem from "../TripsItem/TripsItem";

function TripsList(){
    const [tripsList, setTripsList] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.authToken;
        if (!jwtToken) {
            navigate("/");
            return ;
        }
        axios
            .get("http://localhost:8080/trips", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            .then((response) => {
                setTripsList(response.data);
            })
            .catch((error) => {
                console.error("Could not aceess API:" + error);
            });
    }, [navigate]);

    if (!tripsList) {
        return (
            <p>Loading....</p>
            );
    }

    return (
        <>
        <h2>Trips List</h2>
            <section>
                {tripsList.map((trips) => {
                    return (
                        <li key={trips.id}>
                            <TripsItem tripsItem={trips} />
                        </li>
                    );
                })}
            </section>
        </>
    );
}

export default TripsList;