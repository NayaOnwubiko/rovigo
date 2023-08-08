import "./RestaurantDisplay.scss";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import SaveTripModal from "../SaveTripModal/SaveTripModal";

function RestaurantDisplay({ searchedRestaurant }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (searchedRestaurant) {
    return (
      <>
        <h3>Restaurants:</h3>
        <div className="carousel-container">
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            emulateTouch={true}
            selectedItem={1}
          >
            {searchedRestaurant.map((item) => {
              return (
                <>
                  <RestaurantDetails
                    key={item.location_id}
                    restaurant_name={item.name}
                    restaurant_phone={item.phone}
                    restaurant_website={item.website}
                    restaurant_address={item.address}
                    restaurant_photo={
                      item.photo
                        ? item.photo.images.large.url
                        : "https://robbreport.com/wp-content/uploads/2021/10/restaurant_place_setting_jay_wennington_unsplash.jpg"
                    }
                    ranking_category={item.ranking_category}
                  />
                  <button onClick={() => handleShowModal(item)}>
                    Save To Trip
                  </button>
                </>
              );
            })}
          </Carousel>
          <SaveTripModal
            show={showModal}
            setShow={setShowModal}
            item={selectedItem}
            userId={currentUser._id}
          />
        </div>
      </>
    );
  }
}

export default RestaurantDisplay;
