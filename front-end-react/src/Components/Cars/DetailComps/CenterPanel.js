import { Link } from "react-router-dom";
import "./CenterPanel.css";

const CenterPanel = ({ car, id, handleDelete }) => {
  return (
    <div className="concar-div">
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Warning!!!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              You are about to delete this car. All records associated with this
              car will be lost.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Keep Car
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-dismiss="modal"
              >
                Delete Car
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        className="concar"
        src={
          car
            ? car.model.toLowerCase().includes("camry")
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
            : null
        }
        //https://www.pngkey.com/png/full/350-3509571_2015-chevy-silverado-2017-ford-f150-blue.png
        alt={"car"}
      />
      <div className="all-bs">
        <button
          type="button"
          className=" button-delete"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        ></button>
        <Link to={`/cars/${id}/edit`}>
          <button className="button-edit"></button>
        </Link>
      </div>
    </div>
  );
};

export default CenterPanel;
