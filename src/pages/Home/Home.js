import "./Home.scss";
import axios from "axios";
import SearchIcon from "../../assets/images/search.png";
import MapImage from "../../assets/images/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import RestaurantDisplay from "../../components/RestaurantDisplay/RestaurantDisplay";
import HotelDisplay from "../../components/HotelDisplay/HotelDisplay";
import AttractionDisplay from "../../components/AttractionDisplay/AttractionDisplay";

function Home() {
  // State variables to store data and loading status
  const [searchedHotel, setSearchedHotel] = useState(null);
  const [searchedRestaurant, setSearchedRestaurant] = useState(null);
  const [searchedAttraction, setSearchedAttraction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultsLoaded, setResultsLoaded] = useState(false); // State variable to indicate if results have loaded
  const [searchedLocation, setSearchedLocation] = useState(""); // Store the searched location

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    setSearchedLocation(location);
    setLoading(true);
    setResultsLoaded(false);
  };

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchData = async () => {
      try {
        // Search the location endpoint to get the longitude and latitude
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

        const response = await axios.request(options);
        const result = response.data.data[0].result_object;
        const foundLatitude = result.latitude;
        const foundLongitude = result.longitude;

        // Use the returned longitude and latitude to chain requests to the restaurant, hotel & attraction endpoints
        const hotelOptions = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng",
          params: {
            latitude: foundLatitude,
            longitude: foundLongitude,
            limit: 10,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        const restaurantOptions = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
          params: {
            latitude: foundLatitude,
            longitude: foundLongitude,
            limit: 10,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        const attractionsOptions = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
          params: {
            latitude: foundLatitude,
            longitude: foundLongitude,
            limit: 10,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        // Make parallel requests to fetch hotel, restaurant and attraction data
        const [hotelResponse, restaurantResponse, attractionsResponse] =
          await Promise.all([
            axios.request(hotelOptions),
            axios.request(restaurantOptions),
            axios.request(attractionsOptions),
          ]);

        const hotelData = hotelResponse.data.data;
        const restaurantData = restaurantResponse.data.data;
        const attractionsData = attractionsResponse.data.data;

        setSearchedHotel(hotelData);
        setSearchedRestaurant(restaurantData);
        setSearchedAttraction(attractionsData);

        setResultsLoaded(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loading, searchedLocation]);

  function SkeletonLoading() {
    // Replace with custom skeleton loading animation
    return <div>Loading....</div>;
  }

  return (
    <>
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
      {!resultsLoaded &&
        !loading && ( // Show the hero div when the results haven't loaded and loading is false
          <div className="hero">
            <div className="left">
              <span className="title">Plan your trips easily</span>
              <span className="desc">
                Make a personalized itinerary of Hotels, Restaurants &
                Attractions, guided by user tips and reviews
              </span>
              <button className="heroBtn">
                <FontAwesomeIcon icon={faPlaneDeparture} />
                Start exploring
              </button>
            </div>
            <div className="right">
              <img src={MapImage} alt="map" />
            </div>
          </div>
        )}
      {loading ? (
        <SkeletonLoading />
      ) : resultsLoaded ? (
        // Show the results div when the results have loaded
        <div className="results">
          {searchedHotel && (
            <div className="results-hotel">
              <HotelDisplay
                searchedHotel={searchedHotel}
                currentUser={currentUser}
              />
            </div>
          )}
          {searchedRestaurant && (
            <div className="results-restaurant">
              <RestaurantDisplay
                searchedRestaurant={searchedRestaurant}
                currentUser={currentUser}
              />
            </div>
          )}
          {searchedAttraction && (
            <div className="results-attraction">
              <AttractionDisplay
                searchedAttraction={searchedAttraction}
                currentUser={currentUser}
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Home;
