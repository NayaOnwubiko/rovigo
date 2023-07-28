function AttractionDetails({ name, phone, photo, website, address }) {
  return (
    <li key={name}>
      <div>
        <img src={photo} alt={name} />
        <h4>{name}</h4>
        <p>{phone}</p>
        <p>{address}</p>
        <p>{website}</p>
      </div>
    </li>
  );
}

export default AttractionDetails;
