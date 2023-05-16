// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function PlaceSearch ({ handleSearch }) {
    
    
// }

// export default PlaceSearch;

// // const [locationObjects, setLocationObjects] = useState(null);

// //     useEffect(() => {
// //         const options = {
// //             method: 'GET',
// //             url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
// //             params: {
// //                 query: ''
// //             },
// //             headers: {
// //                 'X-RapidAPI-Key': process.env.REACT_APP_KEY,
// //                 'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
// //             },
// //         };

// //         axios
// //             .request(options)
// //             .then(function (response) {
// //                 console.log(response.data);
// //                 setLocationObjects(response.data);
// //             })
// //             .catch(function (error) {
// //                 console.error(error);
// //             });
// //     },[]);

// //     if (locationObjects === null) {
// //         return <h2>Loading....</h2>
// //     }

// //     return (
// //         <div>
// //             <h2>Find your destination</h2>
// //                 <form 
// //                     onSubmit={handleSearch}
// //                 >
// //                     <input
// //                         type='text'
// //                         placeholder='Search Destination...'
// //                         name='location'
// //                         list='locationlist'
// //                     />
// //                     <button type='submit'>Search</button>
// //                 </form>
// //                 <datalist id='locationlist'>
// //                     {locationObjects.map((location) => {
// //                         return (
// //                             <option 
// //                                 key={location.data}
// //                                 value={location.data}
// //                             >
// //                                 {location.data}
// //                             </option>
// //                         )
// //                     })}{" "}
// //                 </datalist>
// //         </div>