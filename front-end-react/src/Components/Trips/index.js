import { useEffect, useContext } from "react";
import TripsListItem from "./TripsListItem";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTripsFN } from "../../util/networkRequest";
import { addTrips } from "../../Store/Actions/tripsActions";
import "../../Components/Style/Trips/TripsIndex.css";

const Trips = () => {
  const user = useContext(UserContext);
  let history = useHistory();
  const entireState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cars, trips } = entireState;
  const { id } = useParams();
  let tripsArr = Object.values(trips);

  useEffect(() => {
    const fetchAllTrips = async () => {
      try {
        if (user) {
          let res = await getAllTripsFN(id, user);
          dispatch(addTrips(res));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTrips();
  }, [dispatch, id, user]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="trips-table-parent">
      <h2>
        {cars[id]?.make} {cars[id]?.model} Mileage
      </h2>
      <Link to={`/cars/${id}/trips/trip/new`}>
        <button className="trips-new-button">Add New Trip</button>
      </Link>
      <table className="trips-main-table">
        <thead>
          <tr className="head-row">
            <th className="head-date">Date</th>
            <th className="head-miles">Miles</th>
            <th className="head-reason">Reason</th>
            <th className="head-biz-use">Business Use</th>
            <th className="head-edit">Show</th>
          </tr>
        </thead>
        <tbody>
          {tripsArr.map((trip, i) => {
            return <TripsListItem key={i} trip={trip} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Trips;
