import HotelDetails from "../HotelDetails/HotelDetails";
import Slide from "../Slide/Slide";

function HotelDisplay({ searchedHotel }) {
  if (searchedHotel) {
    return (
      <>
        <h3>Hotels:</h3>
        <Slide slidesToShow={4} arrowsScroll={4}>
          <ul>
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
          </ul>
        </Slide>
      </>
    );
  }
}

export default HotelDisplay;
