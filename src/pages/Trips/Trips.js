import "./Trips.scss";
import TripsList from "../../components/TripsList/TripsList";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateTripsModal from "../../components/CreateTripsModal/CreateTripsModal";

function Trips() {
  const [show, setShow] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleClick = () => {
    setShow(true);
  };

  if (!currentUser) {
    return (
      <div>
        <h3>
          Sign up <Link to="/signup">here</Link> to start creating trips.
        </h3>
        <p>
          Already a user? <Link to="/login">Log In</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="trips">
        <h2>Trips</h2>
        <button onClick={handleClick}>+ Create Trip</button>
        <CreateTripsModal
          onClose={() => setShow(false)}
          show={show}
          setShow={setShow}
          userId={currentUser._id}
        />
        <TripsList />
      </div>
    </>
  );
}

export default Trips;
