import "./CreateTripsModal.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTripsModal({ setShow, show }){

    const navigate = useNavigate();
    if (show === false) {
        return null;
    }

//If the user clicks cancel, navigate to the trips page
    const handleCancel = () => {
        setShow(false);
        navigate("/trips");
    };

//If the user clicks create, make an axios post request to the endpoint and add to the trips database
    const handleCreate = () => {
        axios
            .post("http://localhost:8080/trips")
            .then((response) => {
                setShow(false);
                navigate("/trips");
                alert("Trip successfully created");
            })
    }

    return (
        <div className="modal">
            <h4 className="modal__title">Create Trip</h4>
                 <form>
                    <label>Trip Name</label>
                    <input
                        type='text'
                        placeholder='Enter your trip name'
                        name='trip_name'
                    />
                    <button onClick={() => handleCreate}>Create</button>
                    <button onlick={handleCancel}>Cancel</button>
                </form>
        </div>
    )
}

export default CreateTripsModal;