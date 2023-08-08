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

function SingleTrip() {
  return (
    <>
      <div className="single-trip">
        <h2>Single Trip</h2>
        <div className="item">
          <div className="title">
            <FontAwesomeIcon icon={faBed} />
            <span>Hotels</span>
          </div>
          <img
            src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hotel cover"
          />
          <h4>
            <FontAwesomeIcon icon={faSuitcase} />
            Hotel Bagudu
          </h4>
          <p className="rating">
            <FontAwesomeIcon icon={faStar} />
            Rating: 4.5
          </p>
          <p className="price">
            <FontAwesomeIcon icon={faMoneyBill1} />
            Price range: $60
          </p>
        </div>
        <div className="item">
          <div className="title">
            <FontAwesomeIcon icon={faUtensils} />
            <span>Restaurants</span>
          </div>
          <img
            src="https://robbreport.com/wp-content/uploads/2021/10/restaurant_place_setting_jay_wennington_unsplash.jpg"
            alt="restaurant cover"
          />
          <h4>Kenturkey Fried Beans</h4>
          <span className="desc">
            <FontAwesomeIcon icon={faPhone} />
            +768-987-7654
          </span>
          <span className="address">
            <FontAwesomeIcon icon={faAddressBook} />
            231 Bagudu Street, Spain
          </span>
          <span className="desc">
            <FontAwesomeIcon icon={faGlobe} />
            Website
          </span>
        </div>
        <div className="item">
          <div className="title">
            <FontAwesomeIcon icon={faMapLocationDot} />
            <span>Attractions</span>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xDoOxRyka2f7EptRWcoi6AUfhCRY2x7iPQ&usqp=CAU"
            alt="attraction cover"
          />
        </div>
      </div>
    </>
  );
}

export default SingleTrip;
