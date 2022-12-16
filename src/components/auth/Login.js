import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.history.push("/");
        console.log(user);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          setError({ email: "User not found" });
        } else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          setError({ password: "Wrong Password" });
        }
        console.log("err => ", errorMessage);
      });
  };

  const onBack = (e) => {
    e.preventDefault();
    props.history.push("/");
  };

  return (
    <>
      <main className="auth">
        <section>
          <div style={{ textAlign: "center" }}>
            <span className="mdi mdi-cube-outline cube"></span>
          </div>
          <div>
            <button className="back" onClick={onBack}>
              Back to Home
            </button>
            <h1> Login </h1>
            <form onSubmit={onLogin}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  className="input-form"
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error.email ? <p className="error">{error.email}</p> : null}

              <div>
                <label htmlFor="password">Password</label>
                <input
                  className="input-form"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error.password ? (
                <p className="error">{error.password}</p>
              ) : null}

              <div className="submit">
                <button type="submit" className="submit-button">
                  Login
                </button>
              </div>
            </form>

            <p className="text-white text-center">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
