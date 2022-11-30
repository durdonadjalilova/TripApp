import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalNewExpenseForm from "../Modals/ModalNewExpenseForm";
import ModalNewTripForm from "../Modals/ModalNewTripForm";
import hamburgerMenu from "./../../Images/hamburger menu.png";
import "./LeftNav.css";

const LeftNav = ({ id, handleReport }) => {
  const [showEForm, setShowEForm] = useState(false);
  const [showComp, setShowComp] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);
  return (
    <>
      <img
        src={hamburgerMenu}
        style={{ height: "40px", width: "40px" }}
        className="hamb"
        onClick={() => setShowComp(!showComp)}
        alt="menu"
      />

      <div className="left-nav">
        {showEForm && (
          <ModalNewExpenseForm
            setShowEForm={setShowEForm}
            showEForm={showEForm}
          />
        )}
        {showTripForm && (
          <ModalNewTripForm
            setShowTripForm={setShowTripForm}
            showTripForm={showTripForm}
          />
        )}
        <div className="chrome">
          <div
            className="nav-expenses"
            onClick={() => setShowEForm(!showEForm)}
          >
            <p> ✚ Enter Expense</p>
          </div>
        </div>

        <div className="chrome">
          <div
            className="nav-expenses"
            onClick={() => setShowTripForm(!showTripForm)}
          >
            {/* <Link to={`/cars/${id}/trips/trip/new`}> ✚ Enter Mileage </Link> */}
            <p> ✚ Enter Mileage </p>
          </div>
        </div>

        <div className="chrome">
          <div className="nav-expenses">
            <button onClick={handleReport} className="cars-new-button">
              🗂 Generate Report    
            </button>
          </div>
        </div>

        <div className="chrome">
          <div className="nav-expenses">
            <Link to={`/cars/${id}/expenses`}>📕 Expense Table</Link>
          </div>
        </div>

        <div className="chrome">
          <div className="nav-expenses">
            <Link to={`/cars/${id}/trips`}>📘 Mileage Table</Link>
          </div>
        </div>
      </div>
      {showComp && (
        <div>
          <div className="left-nav-mb">
            {showEForm && (
              <ModalNewExpenseForm
                setShowEForm={setShowEForm}
                showEForm={showEForm}
              />
            )}
            {showTripForm && (
              <ModalNewTripForm
                setShowTripForm={setShowTripForm}
                showTripForm={showTripForm}
              />
            )}
            <div className="chrome">
              <div
                className="nav-expenses"
                onClick={() => setShowEForm(!showEForm)}
              >
                {/* <button onClick={() => setGasForm(!gasForm)}> */}
                <p>✚ Enter Expense </p>
                {/* <Link to={`/cars/${id}/expenses/expense/new`}>✚ Enter Expense</Link> */}
              </div>
            </div>

            <div className="chrome">
              <div
                className="nav-expenses"
                onClick={() => setShowTripForm(!showTripForm)}
              >
                {/* <Link to={`/cars/${id}/trips/trip/new`}> */}
                <p>✚ Enter Mileage</p>
                {/* </Link> */}
              </div>
            </div>

            <div className="chrome">
              <div className="nav-expenses">
                <button onClick={handleReport} className="cars-new-button">
                  🗂 Generate Report    
                </button>
              </div>
            </div>

            <div className="chrome">
              <div className="nav-expenses">
                <Link to={`/cars/${id}/expenses`}>📕 Expense Table</Link>
              </div>
            </div>

            <div className="chrome">
              <div className="nav-expenses">
                <Link to={`/cars/${id}/trips`}>📘 Mileage Table</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftNav;
