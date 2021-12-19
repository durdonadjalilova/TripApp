import React from "react";
import "../Components/Login.js";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../Components/Style/LandBar.css";
import { signInWithGoogle } from "../Services/Firebase";

export default function Home() {
  // const [state, setState] = useState('start')
  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="white" sticky>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <MDBNavbarNav right className="mb-2 mb-lg-0">
              <MDBNavbarItem></MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  <img
                    className="navbar-brand"
                    className="logo"
                    src="https://www.pngall.com/wp-content/uploads/5/Car-Steering-Wheel-PNG-Images.png"
                  />
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <button type="button" className="btn btn-primary">
              Sign Up Free
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={signInWithGoogle}
            >
              Login
            </button>
          </div>
        </MDBContainer>
      </MDBNavbar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <section className="first-section">
        <div className="mid-box">
          <div style={{ maxWidth: "100%" }}>
            <h1 className="b">
              Experience a <br></br>fresh way to
            </h1>{" "}
            <h1 className="g">manage money</h1>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={signInWithGoogle}
            color="dark-green"
          >
            Get Started
          </button>
        </div>
      </section>
      <p className="mt-4">Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
    </header>
  );
}
