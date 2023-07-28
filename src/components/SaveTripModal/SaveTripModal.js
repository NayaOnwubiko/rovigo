// import "./SaveTripModal.scss";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import TripsItem from "../TripsItem/TripsItem";
// import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

// function SaveTripModal({
//   setShow,
//   show,
//   listing_key,
//   hotel_name,
//   price,
//   hotel_photo,
//   rating,
//   ranking_category,
// }) {
//   const [tripsList, setTripsList] = useState(null);
//   const [tripId, setTripId] = useState(null);
//   const navigate = useNavigate();

//   //Get the list of all the user trips from the endpoint
//   useEffect(() => {
//     const jwtToken = localStorage.authToken;
//     if (!jwtToken) {
//       navigate("/");
//       return;
//     }
//     axios
//       .get("http://localhost:8080/trips", {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       .then((response) => {
//         setTripsList(response.data);
//         setTripId(response.data.id);
//         console.log(response.data.id);
//       })
//       .catch((error) => {
//         console.error("Could not aceess API:" + error);
//       });
//   }, [navigate, tripId]);

//   if (!show) {
//     return null;
//   }

//   const handleCancel = () => {
//     setShow(false);
//     navigate("/");
//   };

//   const handleAdd = () => {
//     axios
//       .post(`http://localhost:8080/trips/${trips.id}`, {
//         id: uuidv4(),
//         trip_id: trips.id,
//         listing_key: listing_key,
//         hotel_name: hotel_name,
//         hotel_photo: hotel_photo,
//         price: price,
//         rating: rating,
//         ranking_category: ranking_category,
//       })
//       .then((response) => {
//         navigate("/");
//         alert(`${hotel_name} added to trip`);
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   if (!tripsList) {
//     return <p>Start adding trips</p>;
//   }

//   return (
//     <div className="modal">
//       <h3 className="modal__title">Save this to a trip</h3>
//       <section>
//         {tripsList.map((trips) => {
//           return (
//             <li key={trips.id}>
//               <button onClick={() => handleAdd(trips.id)}>
//                 <TripsItem tripsItem={trips} />
//               </button>
//             </li>
//           );
//         })}
//       </section>
//       <button onClick={handleCancel}>Cancel</button>
//     </div>
//   );
// }

// export default SaveTripModal;
