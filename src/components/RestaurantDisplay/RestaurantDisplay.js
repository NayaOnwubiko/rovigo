import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";

function RestaurantDisplay({searchedRestaurant}) {

    if (searchedRestaurant) {
        return (
            <section>
                <h3>Restaurants:</h3>
                    <ul>
                        {searchedRestaurant.map(item => {
                            return <RestaurantDetails
                                        key={item.location_id}
                                        name={item.name}
                                        phone={item.phone}
                                        website={item.website}
                                        address={item.address}
                                        photo={item.photo
                                            ? item.photo.images.large.url
                                            : "https://robbreport.com/wp-content/uploads/2021/10/restaurant_place_setting_jay_wennington_unsplash.jpg"
                                        }
                                    />
                        })}
                    </ul>
            </section>
        );
        
    }

}

export default RestaurantDisplay;