import "./HotelDisplay.scss";
import HotelDetails from "../HotelDetails/HotelDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import SaveTripModal from "../SaveTripModal/SaveTripModal";
import Slide from "../../components/Slide/Slide";

function HotelDisplay({ searchedHotel, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (searchedHotel) {
    return (
      <>
        <div className="hotel-section">
          <span>
            <FontAwesomeIcon icon={faBed} />
          </span>
          <h3>Hotels</h3>
        </div>
        <div className="carousel-container">
          <Slide slidesToShow={2} arrowsScroll={2}>
            {searchedHotel.map((item) => {
              return (
                <>
                  <HotelDetails
                    key={item.listing_key}
                    hotel_name={item.name}
                    price={item.price}
                    rating={item.rating}
                    hotel_photo={
                      item.photo
                        ? item.photo.images.large.url
                        : "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    ranking_category={item.ranking_category}
                  />
                  <button onClick={() => handleShowModal(item)}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </>
              );
            })}
          </Slide>
          {showModal && (
            <SaveTripModal
              show={showModal}
              setShow={setShowModal}
              item={selectedItem}
              userId={currentUser ? currentUser._id : null}
              itemType="hotel"
            />
          )}
        </div>
      </>
    );
  }
}

export default HotelDisplay;
