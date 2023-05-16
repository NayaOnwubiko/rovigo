function AttractionDetails({location_id, name, phone, photo, website, address}){
    return (
           <li key={location_id}>
            <div>
                <img
                    src={photo}
                    alt={name}
                />
                <h4>{name}</h4>
                <p>{phone}</p>
                <p>{address}</p>
                <p>{website}</p>
            </div>
        </li>
    )
}

export default AttractionDetails;