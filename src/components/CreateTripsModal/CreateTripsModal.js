import "./CreateTripsModal.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import uniqid from "uniqid";

function CreateTripsModal({ setShow, show }){
    const [formData, setFormData] = useState({ id: "", trip_name: ""});

    const navigate = useNavigate();
    if (show === false) {
        return null;
    }

    //If the user clicks cancel, navigate to the trips page
    const handleCancel = () => {
        setShow(false);
        navigate("/trips");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name] : value});
    }

    //If the user clicks create, make an axios post request to the endpoint and add to the trips table in the database
    const handleCreate = (event) => {
        event.preventDefault();

        const authToken = localStorage.authToken;

        axios
            .post("http://localhost:8080/trips/create", {
                id: uniqid(),
                trip_name: formData.trip_name,
                headers: {
                    Authorization: `Bearer ${authToken}`
                }         
            })
            .then((response) => {
                console.log(response);
                setShow(false);
                navigate("/trips");
                alert("Trip successfully created");
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="modal">
            <h4 className="modal__title">Create Trip</h4>
                 <form>
                    <label>Trip Name</label>
                    <input
                        type='text'
                        placeholder='Enter your trip name'
                        name='trip_name'
                        value={formData.trip_name}
                        onChange={handleInputChange}
                    />
                    <button onClick={() => handleCreate}>Create</button>
                    <button onlick={handleCancel}>Cancel</button>
                </form>
        </div>
    )
}

export default CreateTripsModal;