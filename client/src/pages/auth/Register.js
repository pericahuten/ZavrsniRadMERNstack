import React, { useState, useEffect } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(()=> {
      window.localStorage.setItem('emailForSignIn', email);
    }).catch((error) => {
      console.log(error.code)
      console.log(error.message)
    });
    toast.success(
      `Mail je poslan na ${email}. Klikom na link u mailu završite registraciju.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoFocus
      />

      <br />
      <button type="submit" className="btn btn-raised">
        Registracija
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registracija</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
