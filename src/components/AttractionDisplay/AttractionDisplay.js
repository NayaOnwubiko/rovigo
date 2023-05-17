import AttractionDetails from "../AttractionDetails/AttractionDetails";

function AttractionDisplay({searchedAttraction}){
    
       if (searchedAttraction) {
        return (
            <section>
                <h3>Attractions:</h3>
                    <ul>
                        {searchedAttraction.map(item => {
                            return <AttractionDetails
                                        key={item.name}
                                        name={item.name}
                                        phone={item.phone}
                                        website={item.website}
                                        address={item.address}
                                        photo={item.photo
                                            ? item.photo.images.large.url
                                            : "https://static1.thetravelimages.com/wordpress/wp-content/uploads/2021/09/Hot-Air-Ballooning.png?q=50&fit=contain&w=1140&h=&dpr=1.5"
                                        }
                                    />
                        })}
                    </ul>
            </section>
        );
        
    }
}

export default AttractionDisplay;