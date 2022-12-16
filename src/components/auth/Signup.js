import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // Redirect("/login")
        props.history.push("/");
        // ...
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          setError({ email: "This email is already exist" });
        } else if (
          errorMessage ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setError({ password: "Password should be at least 6 characters" });
        }
        console.log(errorMessage);
        // ..
      });
  };

  const onBack = (e) => {
    e.preventDefault();
    props.history.push("/");
  };

  return (
    <main className="auth">
      <section>
        <div style={{ textAlign: "center" }}>
          <span className="mdi mdi-cube-outline cube"></span>
        </div>
        <div>
          <button className="back" onClick={onBack}>
            Back to Home
          </button>
          <h1> Sign up </h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                className="input-form"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>
            {error.email ? <p className="error">{error.email}</p> : null}

            <div>
              <label htmlFor="password">Password</label>
              <input
                className="input-form"
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            {error.password ? <p className="error">{error.password}</p> : null}

            <div className="submit">
              <button type="submit" className="submit-button">
                Sign up
              </button>
            </div>
          </form>

          <p className="text-white text-center">
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
