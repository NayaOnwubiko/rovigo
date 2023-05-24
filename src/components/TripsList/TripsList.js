import { useEffect, useState } from "react";
import axios from "axios";
import TripsItem from "../TripsItem/TripsItem";
import CreateTripsModal from "../CreateTripsModal/CreateTripsModal";

function TripsList(){
    const [tripsList, setTripsList] = useState(null);
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/trips")
            .then((response) => {
                setTripsList(response.data);
            })
            .catch((error) => {
                console.error("Could not aceess API:" + error);
            });
    }, []);

    if (!tripsList) {
        return (
            <>
             <h4 onClick={handleClick}>+ Create Trip</h4>
                <CreateTripsModal
                    onClose={() => setShow(false)}
                    show={show} 
                    setShow={setShow}
            />
            <p>Loading....</p>
            </>
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