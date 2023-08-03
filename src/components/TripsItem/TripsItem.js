import "./TripsItem.scss";

function TripsItem({ tripsItem }) {
  return (
    <div className="trip-item">
      <img
        src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cover"
      />
      <h4>{tripsItem.trip_name}</h4>
    </div>
  );
}

export default TripsItem;
