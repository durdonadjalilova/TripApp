import { useHistory, Link } from "react-router-dom";
import "../Components/Style/NavBar.css";
import { signOut } from "../Services/Firebase";

export default function NavBar() {
  let history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

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
            <a
              href="https://www.irs.gov/newsroom/heres-the-411-on-who-can-deduct-car-expenses-on-their-tax-returns"
              target="blank"
            >
              IRS
            </a>
          </div>
        </div>
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}
