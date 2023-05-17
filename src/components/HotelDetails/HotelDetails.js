function HotelDetails({listing_key, name, price, photo, rating}){
    return (
           <li key={listing_key}>
            <div>
                <img
                    src={photo}
                    alt={name}
                />
                <h4>{name}</h4>
                <p>Rating: {rating}</p>
                <p>Price range: {price}</p>
            </div>
        </li>
    )
}

export default HotelDetails;