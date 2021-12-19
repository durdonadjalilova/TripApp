import { useEffect, useContext, useState } from "react";
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
  const [data, setData] = useState(tripsArr);
  const [order, setOrder] = useState("ASC");
  let [isActive, setActive] = useState("false");

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

  const sorting = (col) => {
    // setIsActive("true");
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      console.log(sorted);
      setData(sorted);
      setOrder("DSC");
      setActive(!isActive);
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
      setActive(!isActive);
    }
  };

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
            <th
              onClick={() => sorting("date")}
              className={
                order === "ASC"
                  ? "head-date headerSortDown"
                  : "head-date  headerSortUp"
              }
            >
              Date
            </th>
            <th
              onClick={() => sorting("miles")}
              className={
                order === "ASC"
                  ? "head-miles headerSortDown"
                  : "head-miles  headerSortUp"
              }
            >
              Miles
            </th>
            <th
              onClick={() => sorting("reason")}
              className={
                order === "ASC"
                  ? "head-reason headerSortDown"
                  : "head-reason  headerSortUp"
              }
            >
              Reason
            </th>
            <th
              onClick={() => sorting("business_use")}
              className={
                order === "ASC"
                  ? "head-biz-use headerSortDown"
                  : "head-biz-use  headerSortUp"
              }
            >
              Business Use
            </th>
            <th className="head-edit">Show</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trip, i) => {
            return <TripsListItem key={i} trip={trip} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Trips;
