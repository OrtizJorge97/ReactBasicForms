import logo from './logo.svg';

import React, { useState } from "react";
import './App.css';

function App() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleFirstNameInputChange = (event) => {
    setValues({...values, firstName: event.target.value});
  };

  const handleLastNameInputChange = (event) => {
    setValues({...values, lastName: event.target.value});
  };

  const handleEmailInputChange = (event) => {
    setValues({...values, email: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(values.firstName && values.lastName && values.email) {
      setValid(true);
    }
    setSubmitted(true);
  };

  console.log(submitted);

  return (
    <div className="form-container">
       <form onSubmit={handleSubmit} className="register-form">
         {submitted && valid ? <div className="success-message">Success! Thank you for registering!</div> : null}
         <div>
          <input 
            onChange={handleFirstNameInputChange}
            value={values.firstName}
            className="form-field"
            placeholder="First Name"
            name="firstName"
          />
         </div>
         {submitted && !values.firstName ? <span>Please enter a first name</span> : null}
         <div>
          <input 
            onChange={handleLastNameInputChange}
            value={values.lastName}
            className="form-field"
            placeholder="Last Name"
            name="lastName" 
            />
         </div>
         {submitted && !values.lastName ? <span>Please enter your last name</span> : null}
         <div>
          <input 
            onChange={handleEmailInputChange}
            value={values.email}
            className="form-field"
            placeholder="Email"
            name="email" />
         </div>
         {submitted && !values.email ? <span>Please enter an email</span> : null}
         <br></br>
         <input type="submit" />
       </form>
    </div>
  );
}

export default App;
