import './Home.scss';
import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import PlaceSearch from '../../components/PlaceSearch/PlaceSearch';
import RestaurantDisplay from '../../components/RestaurantDisplay/RestaurantDisplay';
import HotelDisplay from '../../components/HotelDisplay/HotelDisplay';
import AttractionDisplay from '../../components/AttractionDisplay/AttractionDisplay';



function Home() {
    const [searchedHotel, setSearchedHotel] = useState('');
    const [searchedRestaurant, setSearchedRestaurant] = useState(null);
    const [searchedAttraction, setSearchedAttraction] = useState(null);
    

    const handleSearch = (event) => {
        event.preventDefault();
        const searchedLocation = event.target.location.value;

        //Search the location endpoint to get the longitude and latitude
        const options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/locations/search',
            params: {
                query: searchedLocation
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        axios
            .request(options)
            .then(function (response) {
                const result = response.data.data[0].result_object;
                const foundLatitude = result.latitude;
                const foundLongitude = result.longitude;
        
        //Use the returned longitude and latitude to chain requests to the restaurant, hotel & attraction endpoints
        const hotelOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
            params: {
                    latitude: foundLatitude,
                    longitude: foundLongitude,
                    limit: 5
            },
            headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        axios
            .request(hotelOptions)
            .then(function (response) {
                let hotelData = response.data.data;
                setSearchedHotel(hotelData);
            })
            .catch(function (error) {
                console.error(error);
            })

        const restaurantOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: {
                    latitude: foundLatitude,
                    longitude: foundLongitude,
                    limit: 5
            },
            headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        axios
            .request(restaurantOptions)
            .then(function (response) {
                let restaurantData = response.data.data;
                setSearchedRestaurant(restaurantData);
            })
            .catch(function (error) {
                console.error(error);
            })

        const attractionsOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
            params: {
                    latitude: foundLatitude,
                    longitude: foundLongitude,
                    limit: 5
            },
            headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
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
        
    }

    return (
        <>
            <h1>Home Page</h1>
                {/* <section>
                    <PlaceSearch handleSearch={handleSearch} />
                </section> */}
                <h2>Find your destination</h2>
                    <NavLink to="/trips">
                        <p>Trips</p>
                    </NavLink>
                    <NavLink to="/signup">
                        <p>SignUp</p>
                    </NavLink>
                    <NavLink to="/login">
                        <p>Login</p>
                    </NavLink>
               <form 
                    onSubmit={handleSearch}
                >
                    <input
                        type='text'
                        placeholder='Search Destination...'
                        name='location'
                    />
                    <button type='submit'>Search</button>
                </form>
                    <HotelDisplay searchedHotel={searchedHotel} />
                    <RestaurantDisplay searchedRestaurant={searchedRestaurant} />
                    <AttractionDisplay searchedAttraction={searchedAttraction} />
        </>
    );
    
}


export default Home;