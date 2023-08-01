import "./RestaurantDetails.scss";

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
      <span className="title">{restaurant_name}</span>
      <span className="desc">{restaurant_phone}</span>
      <span className="address">{restaurant_address}</span>
      <span className="desc">{restaurant_website}</span>
    </div>
  );
}

export default RestaurantDetails;
