import React from 'react';
import { useState } from 'react'
import { Spinner, Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
import { navigate } from 'gatsby'
// import Header from '../templates/Header'
import 'font-awesome/css/font-awesome.min.css';
// import { Spinner } from '@cedcommerce/ounce-ui'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const axios = require('axios').default


const Login = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [inProgress, setInProgress] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [toast, setToast] = useState(false)


  const authenticateUser = async () => {
    // setTrigger(false);

    if (username && password) {
      setInProgress(true);

      try {
        const response = await axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wp-rest-api/v1/authenticate-user', {
          headers: {
            'Authorization': `Basic ` + btoa(username + ':' + password)
          }

        }
        );
        console.log(response);
        //setApiResponse(response);
        localStorage.setItem('user', JSON.stringify(response.data.data))
        setToast(true);
        setToastMessage("You have been successfully Logged In");
        setToastType("success");
        navigate(
          "/shop",
          {
            state: response.data.data,
          }
        )
      } catch (err) {
        console.log("errrrrrrrrrr");
        console.log("response")
        console.log(err.message);
        console.log(err.code);
        console.log(err.data);
        setToast(true);
        setToastType("error");
        setToastMessage(" Invalid Username or Password ");

      }
      setInProgress(false);

    }

    else {
      console.log("else")
      setToast(true);
      setToastType("error");
      if (username === '') { setToastMessage("Please Enter a Username") }
      else if (password === '') { setToastMessage(" Please Enter a Password") }

    }
  }

  return (
    inProgress ? (<Spinner />) : (


      <body className="ced-headles-body">
        <div className="ced-headles-account-login ced-headles-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                <div className="ced-headles-card ced-headles-login-form" >
                  <div className="ced-headles-card-body">
                    <div className="ced-headles-title">
                      <h3>Login Now</h3>
                      <p>You can login using your username.</p>
                    </div>
                    <div className="col-md-12 form-group">
                      <p>Username</p>
                      <input className="form-control" type="text" onChange={(e) => { setUserName(e.target.value) }} />

                    </div>
                    <div className="col-md-12 form-group">
                      <p >Password </p>
                        <input className="form-control" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="d-flex flex-wrap justify-content-between ced-headles-bottom-content">
                      <div className="form-check">

                        <label className="form-check-label"><input type="checkbox" className="form-check-input width-auto" />Remember me</label>
                      </div>
                      <a className="ced-headles-lost-pass" href="/">Forgot password?</a>
                    </div>
                    <div className="ced-headles-button">
                      <button className="ced-headles-btn" onClick={() => { authenticateUser() }}>Login</button>
                    </div>
                    <p className="ced-headles-outer-link">Don't have an account? <a href="/signup">Register here </a>
                    </p>
                  </div>
                </div>
                {
                  toast &&
                  <ToastWrapper >
                    <Toast message={toastMessage ?? "none"} type={toastType} timeout={3000} onDismiss={() => { setToast(false) }} />
                  </ToastWrapper>
                }
              </div>
            </div>
          </div>
        </div>
      </body>



      // <div>
      //   {/* <Header /> */}

      //   <div className="login-page">
      //     <div className="form">
      //       <div className="login">
      //         <div className="login-header">
      //           <h3>LOGIN</h3>
      //           <p>Please enter your credentials to login.</p>
      //         </div>
      //       </div>
      //       {/* <form className="login-form"> */}
      //         <input type="text" placeholder="username" onChange = { (e) => { setUserName(e.target.value) } } />
      //         <input type="password" placeholder="password" onChange = { (e) => { setPassword(e.target.value) } } />
      //         <button onClick = { () => { authenticateUser() } }>login</button>
      //         <p className="message">Not registered? <a href="/signup">Create an account</a></p>
      //       {/* </form> */}
      //     </div>
      //     { 
      //     toast &&
      //       <ToastWrapper >
      //           <Toast message={toastMessage??"jfjfk"} type={toastType} timeout={3000} onDismiss={()=>{ setToast(false)}}/>
      //       </ToastWrapper> 
      //     } 
      //   </div>

      // </div> 


    )

  );
};

export default Login







