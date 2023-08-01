import { useState } from "react";
import "./HotelDetails.scss";
// import SaveTripModal from "../SaveTripModal/SaveTripModal";

function HotelDetails({
  listing_key,
  hotel_name,
  price,
  hotel_photo,
  rating,
  ranking_category,
}) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <>
      <div key={listing_key} className="hotel-item">
        <img src={hotel_photo} alt={hotel_name} />
        <h4>{hotel_name}</h4>
        <p className="rating">Rating: {rating}</p>
        <p className="price">Price range: {price}</p>
        <button onClick={handleClick}>Save</button>
      </div>
      {/* <SaveTripModal
        onClose={() => setShow(false)}
        show={show}
        setShow={setShow}
        listing_key={listing_key}
        hotel_name={hotel_name}
        price={price}
        hotel_photo={hotel_photo}
        rating={rating}
        ranking_category={ranking_category}
      /> */}
    </>
  );
}

export default HotelDetails;
