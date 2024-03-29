import { useState } from "react";
import "./login.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const Login = (props) => {
  // using state for displaying login form and signup form
  const [active, setActive] = useState(true);

  // changing states
  // function executes when signup is clicked
  function handleSignUpSide() {
    setActive(false);
  }
  // function executes when logn is clicked
  function handleloginSide() {
    setActive(true);
  }

  return (
    <>
      <div className="loginBoxWrapper">
        <div
          className={`wrapper ${
            active ? "login-container" : "container-signup"
          }`}
          id="container"
        >
          {/* close button top right position  */}
          <div className="close" onClick={props.closeLogin}>
            &#10006;
          </div>
          {/* svg for curve */}

          <svg
            className={`defaultSvg ${active ? "login-Svg" : "signup-svg"}`}
            viewBox="0 0 365 685"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.9"
              d="M327.9 315.624C269.809 192.958 316.858 53.2931 347.103 0H0V685H329.06C370.347 523.742 383.624 433.293 327.9 315.624Z"
              fill="#71B646"
            />
          </svg>

          {/* form section */}
          <div
            className={`${active ? "loginPanel" : "signupPanel"}`}
            id="panel"
          >
            <div className="options">
              <div className="option-login">
                <div
                  className={`option ${active ? "" : "disabled"}`}
                  onClick={handleloginSide}
                >
                  <h2 className={`${active ? "Login_Form_line" : ""}`}>
                    login
                  </h2>
                </div>
              </div>

              <div className="logo">
                <img
                  src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
                  alt="logo"
                />
              </div>
              <div className="option-signin ">
                <div
                  className={`signup-link option ${active ? "disabled" : ""}`}
                  onClick={handleSignUpSide}
                  id="signup-link"
                >
                  <h2 className={` ${active ? "" : "Login_Form_line"}`}>
                    Sign Up
                  </h2>
                </div>
              </div>
            </div>

            <div
              className={`form-container ${
                active ? "signup-transform" : "login-transform"
              }`}
            >
              {/* login form and signup form are used as component */}
              {/* handleSignUpSide is passed s props to use the function in loginForm component */}
              <LoginForm setIsLoggedIn={props.setIsLoggedIn}  setUserData={props.setUserData} close={props.closeLogin} handleSignUpSide={handleSignUpSide} />
              <SignUpForm setIsLoggedIn={props.setIsLoggedIn}  setUserData={props.setUserData} close={props.closeLogin}/>
            </div>
            {/* <LoginForm handleSignUpSide={handleSignUpSide} />

          {active ? (
            <div
              id="login-container"
              className={` ${
                active ? "original-position " : "login-transform"
              }`}
            >
              <LoginForm handleSignUpSide={handleSignUpSide} />
            </div>
          ) : (
            <div
              id="signup-container"
              className={` ${
                active ? "signup-transform" : "original-position "
              }`}
            >
              <SignUpForm />
            </div>
          )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
