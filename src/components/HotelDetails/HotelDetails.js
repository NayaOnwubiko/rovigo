import "./HotelDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";

function HotelDetails({
  listing_key,
  hotel_name,
  price,
  hotel_photo,
  rating,
  ranking_category,
}) {
  return (
    <>
      <div key={listing_key} className="hotel-item">
        <img src={hotel_photo} alt={hotel_name} />
        <div className="text">
          <span>
            <h4>{hotel_name}</h4>
          </span>
          <p className="rating">
            <FontAwesomeIcon icon={faStar} /> {rating}
          </p>
          <p className="price">
            <FontAwesomeIcon icon={faMoneyBill1} /> {price}
          </p>
        </div>
      </div>
    </>
  );
}

export default HotelDetails;
