import HotelDetails from "../HotelDetails/HotelDetails";

function HotelDisplay({searchedHotel}) {

    if (searchedHotel) {
        return (
            <section>
                <h3>Hotels:</h3>
                    <ul>
                        {searchedHotel.map(hotel=> {
                            return <HotelDetails
                                        key={hotel.location_id}
                                        name={hotel.name}
                                        phone={hotel.phone}
                                        website={hotel.website}
                                        address={hotel.address}
                                        photo={hotel.photo
                                            ? hotel.photo.images.large.url
                                            : "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        }
                                    />
                        })}
                    </ul>
            </section>
        );
        
    }

}

export default HotelDisplay;