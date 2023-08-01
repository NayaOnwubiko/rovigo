import "./AttractionDetails.scss";

function AttractionDetails({ name, phone, photo, website, address }) {
  return (
    <div className="attraction_card">
      <img src={photo} alt={name} />
      <div className="info">
        <h4>{name}</h4>
        <p className="phone">{phone}</p>
        <p className="address">{address}</p>
        <p className="website">{website}</p>
      </div>
    </div>
  );
}

export default AttractionDetails;
