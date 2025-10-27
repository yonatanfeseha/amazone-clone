import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ClipLoader from "react-spinners/ClipLoader";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navigate = useNavigate();

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else if (e.target.name === "signup") {
      setLoading({ ...loading, signIn: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png?20250504041148"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1></h1>
        <form action="">
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={classes.signin_btn}
            onClick={authHandler}
            name="signin"
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "sign In"}
          </button>
        </form>
        <p>
          Many technologies have their own impact.Emerging technologies like
          artificial intelligence, robotics, Internet of things Many
          technologies{" "}
        </p>
        <button
          className={classes.signup_btn}
          onClick={authHandler}
          name="signup"
        >
          {loading.signUp ? (
            <Loader color="#000" size={15}></Loader>
          ) : (
            "Create your Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "10px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
