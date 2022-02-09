import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../Providers/UserProvider";
import {
  deleteCarByID,
  getAllExpensesFN,
  getAllTripsFN,
} from "../../util/networkRequest";
import { addExpenses } from "../../Store/Actions/expenseActions";
import { addTrips } from "../../Store/Actions/tripsActions";
import "../Style/Cars/CarDetails.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import LeftNav from "./DetailComps/LeftNav";
import CenterPanel from "./DetailComps/CenterPanel";
import RightPanel from "./DetailComps/RightPanel";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CarDetails() {
  const entireState = useSelector((state) => state);
  const { cars, expenses, trips } = entireState;
  const user = useContext(UserContext);
  const expensesArr = Object.values(expenses);
  const tripsArr = Object.values(trips);
  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();
  const deleteCar = async () => {
    try {
      await deleteCarByID(id, user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCar();
      history.push("/cars");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        if (user && id) {
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
        if (user && id) {
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
      let newDate = new Date(expense.date);
      let year = newDate.getFullYear();
      if (expense.business_use) {
        if (year === 2022) {
          expenses.push([
            `${expense.expense_type}`,
            `${newDate.toLocaleDateString()}`,
            `$${expense.amount_spent.toLocaleString()}`,
          ]);
          totalBusinessExpenses += Number(expense.amount_spent);
        }
      }
    });

    let totalBusinessTrips = 0;
    let trips = [["Date", "Miles", "Reason"]];

    tripsArr.forEach((trip) => {
      let newDate = new Date(trip.date);
      let year = newDate.getFullYear();
      if (trip.business_use) {
        if (year === 2022) {
          trips.push([
            `${newDate.toLocaleDateString()}`,
            `${trip.miles}`,
            `${trip.reason}`,
          ]);
          totalBusinessTrips += Number(trip.miles);
        }
      }
    });

    const handleReport = () => {
      car = cars[id];
      let documentDefinition = {
        header: function (currentPage, pageCount) {
          return {
            text: currentPage.toString() + " of " + pageCount,
            alignment: "right",
            margin: [0, 30, 20, 50],
            fontSize: 7,
          };
        },
        content: [
          {
            text: `Driver: ${car?.driver} `,
            bold: true,
            fontSize: 20,
            alignment: "center",
            margin: [0, 20],
          },
          {
            layout: "lightHorizontalLines",
            table: {
              headerRows: 1,
              widths: ["50%"],
              height: "100",
              body: [
                [{ text: "Car details", bold: true, fontSize: 15 }],
                [`Car make: ${car?.make}`],
                [`Car model: ${car?.model}`],
                [`Car VIN: ${car?.vin}`],
                [`Car year: ${car?.year}`],
                [`Car mileage: ${car?.odometer.toLocaleString()}`],
                [`Number of car doors: ${car?.doors}`],
              ],
              fontSize: 40,
            },
          },

          {
            pageBreak: "before",
            text: `${car?.make} ${car?.model} expenses for business-use\n for the year 2021 `,
            bold: true,
            fontSize: 20,
            alignment: "center",
            margin: [0, 20],
          },
          {
            layout: "lightHorizontalLines",
            table: {
              headerRows: 1,
              widths: ["*", "30%", "20%"],
              height: "100",
              body: expenses,
              fontSize: 40,
            },
          },
          {
            text: `Total expenses: $${totalBusinessExpenses.toLocaleString()}`,
            alignment: "left",
            bold: true,
            fontSize: 15,
            margin: [307, 20, 10, 0],
          },
          {
            pageBreak: "before",
            text: `${car?.make} ${car?.model} miles for business-use\n for the year 2021 `,
            bold: true,
            fontSize: 20,
            alignment: "center",
            margin: [0, 20],
          },
          {
            layout: "lightHorizontalLines",
            table: {
              headerRows: 1,
              widths: ["25%", "25%", "*"],

              body: trips,
            },
          },
          {
            text: `Total mileage: ${totalBusinessTrips.toLocaleString()}`,
            alignment: "left",
            bold: true,
            fontSize: 15,
            margin: [35, 20, 10, 0],
          },
        ],
      };

      const pdfDoc = pdfMake
        .createPdf(documentDefinition)
        .download(`${car?.driver}.pdf`);
      return pdfDoc;
    };

    return (
      <section className="car-section">
        <LeftNav id={id} handleReport={handleReport} />

        <CenterPanel car={car} id={id} handleDelete={handleDelete} />

        <RightPanel
          id={id}
          car={car}
          expensesArr={expensesArr}
          tripsArr={tripsArr}
        />
      </section>
    );
  }
}

export default CarDetails;
