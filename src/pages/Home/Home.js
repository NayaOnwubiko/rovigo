import "./Home.scss";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import SearchIcon from "../../assets/images/search.png";
import { useState } from "react";
import RestaurantDisplay from "../../components/RestaurantDisplay/RestaurantDisplay";
import HotelDisplay from "../../components/HotelDisplay/HotelDisplay";
import AttractionDisplay from "../../components/AttractionDisplay/AttractionDisplay";

function Home() {
  const [searchedHotel, setSearchedHotel] = useState(null);
  const [searchedRestaurant, setSearchedRestaurant] = useState(null);
  const [searchedAttraction, setSearchedAttraction] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchedLocation = event.target.location.value;

    //Search the location endpoint to get the longitude and latitude
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/locations/search",
      params: {
        query: searchedLocation,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_KEY,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const result = response.data.data[0].result_object;
        const foundLatitude = result.latitude;
        const foundLongitude = result.longitude;

        //Use the returned longitude and latitude to chain requests to the restaurant, hotel & attraction endpoints
        const hotelOptions = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng",
          params: {
            latitude: foundLatitude,
            longitude: foundLongitude,
            limit: 5,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        axios
          .request(hotelOptions)
          .then(function (response) {
            let hotelData = response.data.data;
            setSearchedHotel(hotelData);
          })
          .catch(function (error) {
            console.error(error);
          });

        const restaurantOptions = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
          params: {
            latitude: foundLatitude,
            longitude: foundLongitude,
            limit: 5,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        axios
          .request(restaurantOptions)
          .then(function (response) {
            let restaurantData = response.data.data;
            setSearchedRestaurant(restaurantData);
          })
          .catch(function (error) {
            console.error(error);
          });

        const attractionsOptions = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
          params: {
            latitude: foundLatitude,
            longitude: foundLongitude,
            limit: 5,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        axios
          .request(attractionsOptions)
          .then(function (response) {
            let attractionsData = response.data.data;
            setSearchedAttraction(attractionsData);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="search">
        <div className="container">
          <h2>Find your destination</h2>
          <div className="searchInput">
            <div className="searchItem">
              <img src={SearchIcon} alt="search_icon" />
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search Destination..."
                  name="location"
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <HotelDisplay searchedHotel={searchedHotel} />
      <RestaurantDisplay searchedRestaurant={searchedRestaurant} />
      <AttractionDisplay searchedAttraction={searchedAttraction} />
    </>
  );
}

export default Home;
