import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CreateTripsModal from '../CreateTripsModal/CreateTripsModal';

function TripsItem({ tripsItem }){

    let navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    };

    return (
        <>
        <h4 onClick={handleClick}>+ Create Trip</h4>
            <CreateTripsModal
                onClose={() => setShow(false)}
                show={show} 
                setShow={setShow}
            />
        </>
    )
}

export default TripsItem;