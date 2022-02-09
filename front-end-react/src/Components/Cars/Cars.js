import React, { useEffect, useContext } from "react";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import { addCars } from "../../Store/Actions/carsActions";
import { getAllCarsFN } from "../../util/networkRequest";
import { UserContext } from "../../Providers/UserProvider";
import { Link, useHistory } from "react-router-dom";
import CarsListItem from "./CarsListItem";
import "../../Components/Style/Cars/Cars.css";

const Cars = () => {
  const entireState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cars } = entireState;
  const user = useContext(UserContext);
  const history = useHistory();
  const carsArr = Object.values(cars);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        if (user) {
          const res = await getAllCarsFN(user);
          dispatch(addCars(res));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCars();
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="cars-div">
      <div className="button-newcar">
        <Link to={`/cars/car/new`}>
          <div className="circle-car"></div>
        </Link>
      </div>
      <CarsListItem carsArr={carsArr} cars={cars} />
    </div>
  );
};

export default Cars;
