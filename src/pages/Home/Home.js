import './Home.scss';
import axios from 'axios';
import { useState } from 'react';
// import PlaceSearch from '../../components/PlaceSearch/PlaceSearch';
import RestaurantDisplay from '../../components/RestaurantDisplay/RestaurantDisplay';
import HotelDisplay from '../../components/HotelDisplay/HotelDisplay';
import AttractionDisplay from '../../components/AttractionDisplay/AttractionDisplay';



function Home() {
    const [searchedRestaurant, setSearchedRestaurant] = useState(null);
    const [searchedHotel, setSearchedHotel] = useState(null);
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
        const restaurantOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: {
                    latitude: foundLatitude,
                    longitude: foundLongitude
            },
            headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        axios
            .request(restaurantOptions)
            .then(function (response) {
                setSearchedRestaurant(response.data.data);
            })
            .catch(function (error) {
                console.error(error);
            })

         const hotelOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
            params: {
                    latitude: foundLatitude,
                    longitude: foundLongitude
            },
            headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        axios
            .request(hotelOptions)
            .then(function (response) {
                setSearchedHotel(response.data.data);
            })
            .catch(function (error) {
                console.error(error);
            })

        const attractionsOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
            params: {
                    latitude: foundLatitude,
                    longitude: foundLongitude
            },
            headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        
        axios
            .request(attractionsOptions)
            .then(function (response) {
                setSearchedAttraction(response.data.data);
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
               <form 
                    onSubmit={handleSearch}
                >
                    <input
                        type='text'
                        placeholder='Search Destination...'
                        name='location'
                        list='locationlist'
                    />
                    <button type='submit'>Search</button>
                </form>
                <section>
                    <RestaurantDisplay searchedRestaurant={searchedRestaurant} />
                </section>
                <section>
                    <HotelDisplay searchedHotel={searchedHotel} />
                </section>
                <section>
                    <AttractionDisplay searchedAttraction={searchedAttraction} />
                </section>
        </>    
    );
    
}


export default Home;