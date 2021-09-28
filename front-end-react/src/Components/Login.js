import React, { useContext, useEffect, useState } from "react";
// import "../../App.css";
import { useDispatch } from "react-redux";
// import { addCars } from "../../Store/Actions/carsActions";
import { addCars } from "../Store/Actions/carsActions";
import { getAllCarsFN } from "../util/networkRequest";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { signInWithGoogle, signup, login } from "../Services/Firebase";
import "../Components/Style/Login.css";
import { SiTwitter } from "react-icons/si";
import { FcKey } from "react-icons/fc";
import { AiFillLock } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import TripLogo from "./Images/giflogo.GIF";


// import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup } from 'mdb-react-ui-kit';
const Login = () => {
  const dispatch = useDispatch();
  const user = useContext(UserContext);
  const history = useHistory();
  const [displayLogin, setDisplayLogin] = useState(false)
  const [displaySignUp, setDisplaySignUp] = useState(false)
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [signUpInput, setSignUpInput] = useState({
    newEmail: "",
    newPassword: "",
    passwordCheck: "",
  });
  const handleGoogle = () =>{
    handleX()
    signInWithGoogle()
  }
  const handleX = () => {
    setDisplaySignUp(false)
    setDisplayLogin(false)
  }
  const handleDisplayLogin = () => {
    if (displaySignUp) {
      setDisplaySignUp(!displaySignUp)
      setDisplayLogin(!displayLogin)
    } else {
      setDisplayLogin(!displayLogin)
    }
  }
  const handleDisplaySignIn = () => {
    setDisplaySignUp(!displaySignUp)
    setDisplayLogin(!displayLogin)
  }
  const handleLoginIn = (e) => {
    e.preventDefault()
    login(input.email, input.password)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(signUpInput.newEmail, signUpInput.newPassword)
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };
  const handleSignUpChange = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      history.push("/cars");
    }
  }, [user, history]);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const res = await getAllCarsFN(user);
        dispatch(addCars(res));
        if (res.length) {
          //FIXME: The current code does nothing
          let filterArray = res.filter((el) => el.is_default === true);
          history.push(`/cars/${filterArray[filterArray.length - 1].id}`);
        } else {
          history.push("/cars/car/new");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCars();
  }, [dispatch, user, history]);

  return (
    <div className="sign-box">
      <div className="top">
        <div className="social-icons">
          <FcKey />
          <SiTwitter />
          <FaInstagramSquare />
          <GrFacebook />
        </div>
      </div>
      <nav className="nav-login">
        <ul className="nav-ul">
          <li>
            <img
              src={TripLogo}
              style={{ height: "119px", width: "119px" }}
              alt={"Logo"}
            />
          </li>
          <li>
            <h2>How it Works</h2>
          </li>
          <li>
            <h2>Budgeting 411</h2>
          </li>
          <li>
            <h2>Tax Incentives</h2>
          </li>
        </ul>
        <div className="icon-login">
          <button className="sign-in" onClick={handleDisplayLogin}>
            <AiFillLock />
            Sign In
          </button>
          <button className="sign-up">Free Sign Up</button>
        </div>
      </nav>
      {/* --------------------------------- */}
      {/* Log in */}
      {displayLogin &&
        <form className="logInForm" onSubmit={handleLoginIn}>
          <button type="button" className="btn-close x-button" onClick={handleX} aria-label="Close"></button>
          <div>
            <button type="button" className="btn btn-outline-primary" onClick={handleDisplaySignIn}>New User</button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleGoogle}>Google Sign in</button>
          </div>
          <legend>Log In</legend>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              onChange={handleChange}
              value={input.email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="...@url.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              onChange={handleChange}
              value={input.password}
              type="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>}
      {/* signUp */}
      {displaySignUp && <form className="signUpForm" onSubmit={handleSubmit}>
      <button type="button" className="btn-close x-button" onClick={handleX} aria-label="Close"></button>
          <div><button type="button" className="btn btn-outline-secondary" onClick={handleGoogle}>Google Sign in</button></div>
        <legend>Sign Up</legend>
        <div className="mb-3">
          <label htmlFor="newEmail" className="form-label">Email address</label>
          <input
            onChange={handleSignUpChange}
            value={signUpInput.newEmail}
            type="email"
            className="form-control"
            id="newEmail"
            aria-describedby="emailHelp"
            placeholder="...@url.com"
            required
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Password</label>
          <input
            onChange={handleSignUpChange}
            value={signUpInput.newPassword}
            type="password"
            className="form-control"
            id="newPassword"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>}
      {/* --------------------------------------- */}
      <div className="login-body">
        <section className="first-section">
          <article className="intro-text">
            <h1 className="b">Experience a New Way </h1>
            <h1 className="b">To Manage </h1>
            <h1 className="g">Your Auto Finances</h1>
            <button onClick={signInWithGoogle} className="start-up">
              Get Started Now
            </button>
          </article>

          <div className="card-a">
            <div className="first-image">
              {/* image */}
              {/* <div className="text-a"text></div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
