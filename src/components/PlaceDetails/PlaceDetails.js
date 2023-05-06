function PlaceDetails({ place, selected, refProp }){

    if (selected)
        refProp?.current?.scrollIntoView({ behaviour: "smooth", block: "start"});

    return (
        <div>
            <img
                src={place.photo
                    ? place.photo.images.large.url
                    : "https://m.media-amazon.com/images/S/aplus-media/vc/e7bd4465-b3da-4c5b-b688-788708883764.__CR0,0,300,300_PT0_SX300_V1___.jpg"
                }/>
            <h4>{place.name}</h4>
                <p>{Number(place.rating)}</p>
                <p>/{place.num_reviews}reviews</p>
                <p>{place.price_level}</p>
                <p>{place.ranking}</p>
            {place?.awards?.map((award) => (
                <div>
                    <img
                        src={award.images.small}
                        alt={award.display_name}
                        />
                    <p>{award.display_name}</p>
                </div>
            ))}
            {place?.address && (
                <p>{place.address}</p>
            )}
            {place?.phone && (
                <p>{place.phone}</p>
            )}
            <button onClick={() => window.open(place.web_url, "_blank")}>
                Trip Advisor
            </button>
            <button onClick={() => window.open(place.website, "_blank")}>
                Website
            </button>
        </div>
    )

}

export default PlaceDetails;