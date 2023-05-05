import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function PlaceSearch ({ setCoordinates, onLoad, onPlaceChanged }) {

    return (
        <div>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                
            </Autocomplete>
        </div>
    )
}

export default PlaceSearch;