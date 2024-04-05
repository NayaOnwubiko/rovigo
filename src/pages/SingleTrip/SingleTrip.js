import "./SingleTrip.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faUtensils,
  faMapLocationDot,
  faSuitcase,
  faStar,
  faMoneyBill1,
  faGlobe,
  faPhone,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";

function SingleTrip() {
  // Get the trip ID from the route parameter
  const { id } = useParams();

  // Fetch data for each category separately
  const fetchHotels = async () => {
    const response = await newRequest.get(`/hotels/${id}`);
    return response.data;
  };

  const fetchRestaurants = async () => {
    const response = await newRequest.get(`/restaurants/${id}`);
    return response.data;
  };

  const fetchAttractions = async () => {
    const response = await newRequest.get(`/attractions/${id}`);
    return response.data;
  };

  const { data: hotels } = useQuery(["hotels", id], fetchHotels);
  const { data: restaurants } = useQuery(["restaurants", id], fetchRestaurants);
  const { data: attractions } = useQuery(["attractions", id], fetchAttractions);

  return (
    <>
      <div className="single-trip">
        <h2>Single Trip</h2>
        <div className="item">
          <div className="title">
            <FontAwesomeIcon icon={faBed} />
            <span>Hotels</span>
          </div>
          {hotels && hotels.length > 0 ? (
            <ul>
              {hotels.map((hotel) => (
                <li key={hotel._id}>
                  <img src={hotel.photo} alt="hotel cover" />{" "}
                  <h4>
                    <FontAwesomeIcon icon={faSuitcase} />
                    {hotel.name}
                  </h4>
                  <p className="rating">
                    <FontAwesomeIcon icon={faStar} />
                    Rating: {hotel.rating}
                  </p>
                  <p className="price">
                    <FontAwesomeIcon icon={faMoneyBill1} />
                    Price range: ${hotel.price}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hotels added for this trip yet</p>
          )}
        </div>
        <div className="item">
          <div className="title">
            <FontAwesomeIcon icon={faUtensils} />
            <span>Restaurants</span>
          </div>
          {restaurants && restaurants.length > 0 ? (
            <ul>
              {restaurants.map((restaurant) => (
                <li key={restaurant._id}>
                  <img src={restaurant.photo} alt="restaurant cover" />
                  <h4>{restaurant.name}</h4>
                  <span className="desc">
                    <FontAwesomeIcon icon={faPhone} />
                    {restaurant.phone}
                  </span>
                  <span className="address">
                    <FontAwesomeIcon icon={faAddressBook} />
                    {restaurant.address}
                  </span>
                  <span className="desc">
                    <FontAwesomeIcon icon={faGlobe} />
                    {restaurant.website}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No restaurants added for this trip yet.</p>
          )}
        </div>
        <div className="item">
          <div className="title">
            <FontAwesomeIcon icon={faMapLocationDot} />
            <span>Attractions</span>
          </div>
          {attractions && attractions.length > 0 ? (
            <ul>
              {attractions.map((attraction) => (
                <li key={attraction._id}>
                  <img src={attraction.name} alt="attraction cover" />
                </li>
              ))}
            </ul>
          ) : (
            <p>No attractions added for this trip yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleTrip;
