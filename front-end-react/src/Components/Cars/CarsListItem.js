import React from "react";
import { Link } from "react-router-dom";
import "../../Components/Style/Cars/CarsListItem.css";

function CarsListItem({ carsArr }) {
  let showElement = false;

  return (
    <div className="list-cars">
      <ul
        style={
          showElement
            ? { display: "none" }
            : { display: "flex", justifyContent: "space-around" }
        }
        className="ul-show"
      >
        {carsArr.map((car, i) => {
          return (
            <li key={i} className="li-show">
              <div className="card-center">
                <br></br>
                <br></br>
                <br></br>{" "}
                <img
                  className="car-pic"
                  src={
                    car.model.toLowerCase().includes("camry")
                      ? "https://freepngimg.com/thumb/toyota/3-toyota-png-image-car-image.png"
                      : car.model.toLowerCase().includes("i8")
                      ? "https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png"
                      : car.model.toLowerCase().includes("f150")
                      ? "https://www.pngkey.com/png/full/318-3181722_2016-ford-f-150-ford-f150-2016-one.png"
                      : car.model.toLowerCase().includes("odyssey")
                      ? "https://www.pngkey.com/png/full/76-766461_find-limited-time-offers-nearby-honda-odyssey-2018.png"
                      : car.model.toLowerCase().includes("corolla")
                      ? "https://www.pngkey.com/png/full/46-465237_the-toyota-corolla-le-eco-is-exactly-what.png"
                      : car.model.toLowerCase().includes("tundra")
                      ? "https://www.pngkey.com/png/full/350-3509571_2015-chevy-silverado-2017-ford-f150-blue.png"
                      : car.model.toLowerCase().includes("silverado")
                      ? "https://www.pngkey.com/png/full/290-2908552_2017-chevy-silverado-1500-1ls-graphite-metallic-chevy.png"
                      : car.model.toLowerCase().includes("sienna")
                      ? "https://www.pngkey.com/png/full/45-459841_2018-toyota-sienna-van-toyota-cars.png"
                      : "https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png" //i8 default
                  }
                  alt={"car"}
                />{" "}
                <div className="make-model">
                  {car?.make} {car?.model}
                  <Link to={`/cars/${car?.id}`}>
                    <button className="showMe">Select</button>
                  </Link>
                </div>
                <br></br>
              </div>

              {showElement && (
                <input
                  className="gas-here"
                  placeholder="enter gas"
                  type="text"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CarsListItem;
