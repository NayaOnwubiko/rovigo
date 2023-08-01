import AttractionDetails from "../AttractionDetails/AttractionDetails";
import Slide from "../../components/Slide/Slide";

function AttractionDisplay({ searchedAttraction }) {
  if (searchedAttraction) {
    return (
      <>
        <h3>Attractions:</h3>
        <Slide slidesToShow={2} arrowsScroll={2}>
          {searchedAttraction.map((item) => {
            return (
              <AttractionDetails
                key={item.name}
                name={item.name}
                phone={item.phone}
                website={item.website}
                address={item.address}
                photo={
                  item.photo
                    ? item.photo.images.large.url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xDoOxRyka2f7EptRWcoi6AUfhCRY2x7iPQ&usqp=CAU"
                }
              />
            );
          })}
        </Slide>
      </>
    );
  }
}

export default AttractionDisplay;
