import { useParams, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "../Components/Style/NavBar.css";
import { signOut } from "../Services/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../Providers/UserProvider";
import {
  // deleteCarByID,
  getAllExpensesFN,
  getAllTripsFN,
} from "../util/networkRequest";
import { addExpenses } from "../Store/Actions/expenseActions";
import { addTrips } from "../Store/Actions/tripsActions";

// import { FcCurrencyExchange } from "react-icons/fc";
// import { ImRoad } from "react-icons/im";
// import expenses from "../Store/Reducers/expenses";

export default function NavBar({ navExpenses, navMileage }) {
  const entireState = useSelector((state) => state);
  const { cars, expenses, trips } = entireState;
  const user = useContext(UserContext);
  const expensesArr = Object.values(expenses);
  const tripsArr = Object.values(trips);
  const dispatch = useDispatch();
  let { id } = useParams();
  let [expenseForm, setExpenseForm] = useState(false);
  let [mileageForm, setMileageForm] = useState(false);
  let history = useHistory();

  // const entireState = useSelector((state) => state);
  // const { cars, expenses, trips } = entireState;
  // console.log(entireState)

  const handleLogout = async () => {
    try {
      await signOut();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setExpenseForm(navExpenses);
  }, [navExpenses]);
  useEffect(() => {
    setMileageForm(navMileage);
  }, [navMileage]);

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        if (user) {
          let res = await getAllExpensesFN(id, user);
          dispatch(addExpenses(res));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllExpenses();

    const getAllTrips = async () => {
      try {
        if (user) {
          let res = await getAllTripsFN(id, user);
          dispatch(addTrips(res));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllTrips();
  }, [id, user, history, dispatch]);

  if (!user) {
    return <div className="spinner-border"></div>;
  } else {
    let car = cars[id];

    let totalBusinessExpenses = 0;
    let expenses = [["Expense", "Date", "Amount"]];
    expensesArr.forEach((expense) => {
      if (expense.business_use) {
        expenses.push([
          `${expense.expense_type}`,
          `${expense.date}`,
          `$${expense.amount_spent.toLocaleString()}`,
        ]);
        totalBusinessExpenses += Number(expense.amount_spent);
      }
    });
    // console.log("expenses outside handleReport", expenses);

    let totalBusinessTrips = 0;
    let trips = [["Date", "Miles", "Reason"]];

    tripsArr.forEach((trip) => {
      if (trip.business_use) {
        trips.push([`${trip.date}`, `${trip.miles}`, `${trip.reason}`]);
        totalBusinessTrips += Number(trip.miles);
      }
    });
  }

  return (
    <div className="log-start">
      <div className="corner-fix">
        <Link to={`/cars`}>Home</Link>
        <div className="dropdown">
          <div className="dropbtn">Driver Resources</div>
          <div className="dropdown-content">
            <a
              href="https://www.uber.com/us/en/drive/tax-information/"
              target="blank"
            >
              Uber
            </a>
            <a href="https://www.lyft.com/driver/taxes" target="blank">
              Lyft
            </a>
            <a href="#" target="blank">
              Other
            </a>
          </div>
        </div>
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}
