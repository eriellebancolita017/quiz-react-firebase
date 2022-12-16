import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Home = (props) => {
  const [authState, setAuthstate] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        setAuthstate(true);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        setAuthstate(false);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        props.history.push("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Fragment>
      <Helmet>
        <title>Home - Quiz App</title>
      </Helmet>
      <div id="home">
        <section>
          <div style={{ textAlign: "center" }}>
            <span className="mdi mdi-cube-outline cube"></span>
          </div>
          <h1>MotoProg</h1>
          {!!authState ? (
            <div className="play-button-container">
              <ul>
                <li>
                  <Link className="play-button" to="/play/quiz">
                    Play
                  </Link>
                  <Link className="play-button" to="" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="auth-container">
              <Link to="/login" className="auth-buttons" id="login-button">
                Login
              </Link>
              <Link to="/signup" className="auth-buttons" id="signup-button">
                Sign up
              </Link>
            </div>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
