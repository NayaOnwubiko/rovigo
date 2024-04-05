import "./AttractionDisplay.scss";
import AttractionDetails from "../AttractionDetails/AttractionDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import SaveTripModal from "../SaveTripModal/SaveTripModal";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Slide from "../../components/Slide/Slide";

function AttractionDisplay({ searchedAttraction, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (searchedAttraction) {
    return (
      <>
        <div className="attraction-section">
          <span>
            <FontAwesomeIcon icon={faMapLocationDot} />
          </span>
          <h3>Attractions</h3>
        </div>
        <div className="carousel-container"></div>
        <Slide slidesToShow={2} arrowsScroll={2}>
          {searchedAttraction.map((item) => {
            return (
              <div key={item.name}>
                <AttractionDetails
                  name={item.name}
                  phone={item.phone}
                  website={item.website}
                  address={item.address}
                  photo={
                    item.photo
                      ? item.photo.images.large.url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xDoOxRyka2f7EptRWcoi6AUfhCRY2x7iPQ&usqp=CAU"
                  }
                />
                <button onClick={() => handleShowModal(item)}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            );
          })}
        </Slide>
        {showModal && (
          <SaveTripModal
            show={showModal}
            setShow={setShowModal}
            item={selectedItem}
            userId={currentUser ? currentUser._id : null}
            itemType="attraction"
          />
        )}
      </>
    );
  }
}

export default AttractionDisplay;
