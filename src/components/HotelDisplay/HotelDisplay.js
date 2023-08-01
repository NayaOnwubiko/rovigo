import "./HotelDisplay.scss";
import HotelDetails from "../HotelDetails/HotelDetails";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HotelDisplay({ searchedHotel }) {
  // Carousel slider settings
  const settings = {
    dots: false,
    infinte: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  if (searchedHotel) {
    return (
      <>
        <h3>Hotels:</h3>
        <div className="carousel-container">
          <Slider {...settings}>
            {searchedHotel.map((hotel) => {
              return (
                <HotelDetails
                  key={hotel.listing_key}
                  hotel_name={hotel.name}
                  price={hotel.price}
                  rating={hotel.rating}
                  hotel_photo={
                    hotel.photo
                      ? hotel.photo.images.large.url
                      : "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  ranking_category={hotel.ranking_category}
                />
              );
            })}
          </Slider>
        </div>
      </>
    );
  }
}

export default HotelDisplay;
