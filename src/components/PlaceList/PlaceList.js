import { createRef, useEffect, useState } from 'react';

function PlaceList({ places, childClicked, isLoading, type, setType, rating, setRating }){

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) =>
            Array(places?.length)
                .fill()
                .map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <>
        <h2>Destinations</h2>
            <div>
                {isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <>
                    <form>
                        <label>Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="restaurants">Restaurants</option>
                            <option value="hotels">Hotels</option>
                            <option value="attractions">Attractions</option>
                        </select>
                    </form>
                    <form>
                        <label htmlFor="rating">Rating</label>
                            <select 
                                id="rating"
                                defaultValue=""
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value="0">Above 3.0</option>
                                <option value="4">Above 4.0</option>
                            <option value="4.5">Above 4.5</option>
                            </select>
                    </form>
                    </>
                )}
                <ul>
                    {places?.map((place, i) => (
                        
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PlaceList;