import "./RightPanel.css";

const RightPanel = ({ car, id, tripsArr, expensesArr }) => {
  return (
    <div className="odo-deets">
      <div className="odo-mileage">
        Mileage
        <p className="total-odo">
          {tripsArr.reduce((total, trip) => {
            total += trip.miles;
            return total;
          }, 0)}
        </p>
      </div>

      <div className="all-expenses">
        <p className="expense-title">Expenses</p>
        <p className="total-expenses">
          $
          {expensesArr
            .reduce((total, expense) => {
              total += expense.amount_spent;
              return total;
            }, 0)
            .toLocaleString()}
          .00
        </p>
      </div>

      <div className="deets">
        <li>Car ID: {id}</li>
        <li>Make: {car?.make}</li>
        <li>Model: {car?.model}</li>
        <li>VIN: {car?.vin}</li>
        <li>Year: {car?.year}</li>
        <li>Odometer: {car?.odometer}</li>
        <li>Doors: {car?.doors}</li>
      </div>
    </div>
  );
};

export default RightPanel;
