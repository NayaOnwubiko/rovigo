import './Trips.scss';
import TripsList from '../../components/TripsList/TripsList';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CreateTripsModal from '../../components/CreateTripsModal/CreateTripsModal';

function Trips() {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    };
    //Check for a user token, and if it doesn't exist, display a sign up message
    const authToken = localStorage.authToken;

    if (!authToken) {
        return (
            <div>
                <h3>Sign up <Link to="/signup">here</Link> to start creating trips.</h3>
                    <p>Already a user? <Link to="/login">Log In</Link></p>
            </div>
        );
    }
    
    return (
        <>
        <h1>Trips Page</h1>
            <div>
                 <h4 onClick={handleClick}>+ Create Trip</h4>
                <CreateTripsModal
                    onClose={() => setShow(false)}
                    show={show} 
                    setShow={setShow}
            />
            </div>
            <TripsList />
        </>
    )
}

export default Trips;