import './Home.scss';
import { useEffect, useState } from 'react';
import { PlacesData } from '../../components/PlacesData/PlacesData';
import PlaceSearch from '../../components/PlaceSearch/PlaceSearch';
import PlaceList from '../../components/PlaceList/PlaceList';

function Home() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setfilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState(0);

    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        const filtered = places?.filter((place) => Number(place.rating) >= rating);
        setfilteredPlaces(filtered)
    }, [rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);
            PlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    console.log(data);
                    setPlaces(data?.filter((place) => place.name && place.num_reviews >= 0));
                    setfilteredPlaces([]);
                    setIsLoading(false);
                })
        }
    }, [type, bounds]);

    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    };

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
    };

    return (
        <>
            <h1>Home Page</h1>
            <PlaceSearch onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <PlaceList places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
            />
        </>

    )
}

export default Home;