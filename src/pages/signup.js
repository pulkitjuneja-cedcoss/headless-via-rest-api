import React from 'react';
import { useState } from 'react'
import { Spinner, Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
// import Header from '../templates/Header'
import 'font-awesome/css/font-awesome.min.css';
// import { Spinner } from '@cedcommerce/ounce-ui'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const axios = require('axios').default

const Signup = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [toast, setToast] = useState(false)


  // const token = {
  //   Username: "admin",
  //   Password: "password"
  // }

  const createUser = async () => {

    if (username && password && confirmpassword && email && email.includes('.com') && password === confirmpassword) {
      setInProgress(true);

      try {
        const response = await axios.post('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wp/v2/users/', {
          username: username,
          password: password,
          email: email,
        }, {
          headers: {
            'Authorization': `Basic ZGVtb2NlNTpjZWRjb21tZXJjZTEyMw==`
          }
        });
        console.log(response);
        //setApiResponse(response);
        setToast(true);
        setToastMessage("You have been successfully Registered");
        setToastType("success");
      } catch (error) {
        console.error("error", error);
        setToast(true);
        setToastType("error");
        if (username === '') { setToastMessage("Please Enter a Username") }
        else if (email === '') { setToastMessage("Please Enter you Email") }
        else if (!email.includes('.com')) { setToastMessage("Please Enter a valid Email Address") }
        else if (password === confirmpassword) { setToastMessage("Password and Confirm didn't match") }

      }
      setInProgress(false);

    }

    else {
      console.log("else")
      setToast(true);
      setToastType("error");
      console.log(password, confirmpassword)
      if (username === '') { setToastMessage("Please Enter a Username") }
      else if (email === '') { setToastMessage("Please Enter you Email") }
      else if (email.includes('.com')) { setToastMessage("Please Enter a valid Email Address") }
      else if (password !== confirmpassword) { setToastMessage("Password and Confirm didn't match") }
      // username ? setToastMessage("Please Enter a Username") : ('');
      // username ? setToastMessage("Please Enter a Username") : ('');
      // username ? setToastMessage("Please Enter a Username") : ('');

    }
  }



  return (


    inProgress ? (<Spinner />) : (
      // <div>

      //    <div className="login-page">

      //     < div className="form" >
      //         <h1>Sign Up</h1>
      //         <p>Please fill in this form to create an account.</p>
      //         <hr className="login-page-hr" />

      //         <input type="text" placeholder="Enter UserName" name="username"  onChange={ (e) => { setUserName(e.target.value) } }/>
      //         <input type="text" placeholder="Enter Email" name="email"  onChange={ (e) => { setEmail(e.target.value) } }/>
      //         <input type="password" placeholder="Enter Password" name="psw"  onChange={ (e) => { setPassword(e.target.value) } } />
      //         <input type="password" placeholder="Repeat Password" name="psw-repeat"  onChange={ (e) => { setConfirmPassword(e.target.value) } } />

      //         <input type="checkbox" checked="checked" name="remember"  /> Remember me     
      //         <p>By creating an account you agree to our <a href="/sgnup" >Terms & Privacy</a>.</p>

      //         <div className="clearfix">
      //             <button type="button" className="cancelbtn">Cancel</button>
      //             <button type="submit" className="signupbtn" onClick= { () => {createUser()} }>Sign Up</button>
      //         </div>
      //   </div>
      //     { toast &&
      //     <ToastWrapper >
      //         <Toast message={toastMessage??"jfjfk"} type={toastType} timeout={3000} onDismiss={()=>{
      //       setToast(false)}}/>

      //     </ToastWrapper> } 

      //   </div>

      // </div> 


      <body className="ced-headles-body">
        <div className="ced-headles-account-login ced-headles-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                <div className="ced-headles-register-form">
                  <div className="ced-headles-title">
                    <h3>Register</h3>
                    <p>Registration takes less than a minute but gives you full control over your orders.</p>
                  </div>
                  <div className="row" >
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p>Uername</p>
                          <input type="text" className="form-control" name="username" onChange={(e) => { setUserName(e.target.value) }} />

                        
                      </div>
                    </div>
                    {/* <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" type="text" required />
                      </div>
                    </div> */}
                    <div className="col-sm-12">
                      <div className="ced-headles-form-group">
                        <p>E-mail Address</p>
                          <input type="text" className="form-control" name="email" onChange={(e) => { setEmail(e.target.value) }} />

                        
                      </div>
                    </div>
                    {/* <div className="col-sm-6">
                      <div className="form-group">
                        <label >Phone Number</label>
                        <input className="form-control" type="text" required />
                      </div>
                    </div> */}
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p >Password</p>
                          <input type="password" className="form-control" name="psw" onChange={(e) => { setPassword(e.target.value) }} />

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p>Confirm Password</p>
                          <input type="password" className="form-control" name="psw-repeat" onChange={(e) => { setConfirmPassword(e.target.value) }} />

                        
                      </div>
                    </div>
                    <div className="ced-headles-button">
                      <button type="submit" className="ced-headles-btn" onClick={() => { createUser() }}>Register</button>
                    </div>
                    <p className="ced-headles-outer-link">Already have an account? <a href="/login">Login Now</a></p>
                  </div>
                </div>
              </div>
            </div>
            {toast &&
              <ToastWrapper >
                <Toast message={toastMessage ?? "jfjfk"} type={toastType} timeout={3000} onDismiss={() => {
                  setToast(false)
                }} />

              </ToastWrapper>}
          </div>
        </div>
      </body>

    )
  )
};

export default Signup







