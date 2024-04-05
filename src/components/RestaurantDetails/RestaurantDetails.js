import "./RestaurantDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";

function RestaurantDetails({
  location_id,
  restaurant_name,
  restaurant_phone,
  restaurant_photo,
  restaurant_website,
  restaurant_address,
  ranking_catgory,
}) {
  return (
    <div className="restaurant" key={location_id}>
      <img src={restaurant_photo} alt={restaurant_name} />
      <div className="text">
        <span>
          <h4 className="title">{restaurant_name}</h4>
        </span>
        <p className="desc">{restaurant_phone}</p>
        <p className="address">{restaurant_address}</p>
        <p className="website">{restaurant_website}</p>
      </div>
    </div>
  );
}

export default RestaurantDetails;
