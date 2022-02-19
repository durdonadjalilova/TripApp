import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCarsFN } from "../util/networkRequest";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { signup, login } from "../Services/Firebase";
import "../Components/Style/Login.css";
import { AiFillLock } from "react-icons/ai";
import TripLogo from "./Images/giflogo.GIF";

const Login = () => {
  const entireState = useSelector((state) => state);
  const { cars } = entireState;
  const user = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [signUpInput, setSignUpInput] = useState({
    newEmail: "",
    newPassword: "",
    passwordCheck: "",
  });
  // const handleGoogle = () => {
  //   try {
  //     handleX();
  //     // signInWithGoogle();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleX = () => {
    setDisplaySignUp(false);
    setDisplayLogin(false);
  };
  const handleDisplayLogin = () => {
    if (displaySignUp) {
      setDisplaySignUp(!displaySignUp);
      setDisplayLogin(!displayLogin);
    } else {
      setDisplayLogin(!displayLogin);
    }
  };
  const handleDisplaySignIn = () => {
    setDisplaySignUp(!displaySignUp);
    setDisplayLogin(!displayLogin);
  };
  const handleLoginIn = async (e) => {
    e.preventDefault();
    try {
      await login(input.email, input.password);
    } catch (error) {
      if (
        String(error).includes(
          "The password is invalid or the user does not have a password."
        )
      ) {
        setError(
          "The password is invalid or the user does not have a password."
        );
      } else if (
        String(error).includes(
          "Access to this account has been temporarily disabled due to many failed login attempts."
        )
      ) {
        setError(
          "Access to this account has been temporarily disabled due to many failed login attempts."
        );
      } else {
        window.alert(error);
        console.log(error);
      }
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(signUpInput.newEmail, signUpInput.newPassword);
    } catch (error) {
      if (String(error).includes("The email address is badly formatted.")) {
        setError("The email address is badly formatted.");
      } else if (
        String(error).includes(
          "The email address is already in use by another account"
        )
      ) {
        setError("The email address is already in use by another account.");
      } else {
        window.alert(error);
        console.log(error);
      }
    }
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
    setError("");
  };
  const handleSignUpChange = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.id]: e.target.value });
    setError("");
  };

  useEffect(() => {
    if (user) {
      history.push("/cars");
    }
  }, [user, history]);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        if (!cars) {
          const res = await getAllCarsFN(user);
          // dispatch(addCars(res));
          if (res.length) {
            //FIXME: The current code does nothing
            history.push(`/cars`);
            // let filterArray = res.filter((el) => el.is_default === true);
            // history.push(`/cars/${filterArray[filterArray.length - 1].id}`);
          } else {
            history.push("/cars/car/new");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAllCars();
  }, [cars, user, history]);

  return (
    <div className="sign-box">
      {/* <div className="top"> */}
      {/* <div className="social-icons">
          <FcKey />
          <SiTwitter />
          <FaInstagramSquare />
          <GrFacebook />
        </div> */}
      {/* </div> */}
      <nav className="nav-login">
        <ul className="nav-ul">
          <li>
            <img
              src={TripLogo}
              style={{
                height: "119px",
                width: "119px",
                marginTop: "40px",
                marginLeft: "30px",
              }}
              alt={"Logo"}
            />
          </li>
          {/* <li>
            <h2>How it Works</h2>
          </li>
          <li>
            <h2>Budgeting 411</h2>
          </li>
          <li>
            <h2>Tax Incentives</h2>
          </li> */}
        </ul>
        <div className="icon-login">
          <button className="sign-in" onClick={handleDisplayLogin}>
            <AiFillLock />
            Sign In
          </button>
        </div>
      </nav>
      {/* --------------------------------- */}
      {/* Log in */}
      {displayLogin && (
        <form className="logInForm" onSubmit={handleLoginIn}>
          {error !== "" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="btn-close x-button"
            onClick={handleX}
            aria-label="Close"
          ></button>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleDisplaySignIn}
            >
              New User
            </button>
            {/* <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleGoogle}
            >
              Google Sign in
            </button> */}
          </div>
          <legend>Log In</legend>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              value={input.password}
              type="password"
              className="form-control"
              id="password"
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
      {/* signUp */}
      {displaySignUp && (
        <form className="signUpForm" onSubmit={handleSignUp}>
          {error !== "" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="btn-close x-button"
            onClick={handleX}
            aria-label="Close"
          ></button>
          {/* <div>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleGoogle}
            >
              Google Sign in
            </button>
          </div> */}
          <legend>Sign Up</legend>
          <div className="mb-3">
            <label htmlFor="newEmail" className="form-label">
              Email address
            </label>
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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Password
            </label>
            <input
              onChange={handleSignUpChange}
              value={signUpInput.newPassword}
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="6 characters minimum"
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
      {/* --------------------------------------- */}
      <div className="login-body">
        <section className="first-section">
          <article className="intro-text">
            <h1 className="b">Experience a New Way </h1>
            <h1 className="b">To Track </h1>
            <h1 className="g">Your Mileage and Vehicle Expenses</h1>
            <button onClick={handleDisplayLogin} className="start-up">
              Get Started Now
            </button>
          </article>

          <img
            className="first-image"
            src="https://cdn.wallethub.com/wallethub/posts/97502/most-and-least-risky-states-for-drivers-wallets-hero.png"
            alt="wallet"
          />
        </section>
      </div>
    </div>
  );
};

export default Login;
