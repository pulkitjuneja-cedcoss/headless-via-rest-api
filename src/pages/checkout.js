import React, { useState, useEffect } from "react"
import "../css/index.css"
import 'font-awesome/css/font-awesome.min.css';
import { Toast, ToastWrapper, Spinner } from '@cedcommerce/ounce-ui'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios'
import CheckoutPricingTable from "../templates/CheckoutPricingTable";
// import { Link } from "gatsby"
import CreateOrder from '../components/CreateOrder.js'
import Credit_debit_html from "../components/payments/stripe/credit_debit_html";


const Checkout = ({ location }) => {

   const [billingFirstName, setBillingFirstName] = useState("");
   const [billingLastName, setBillingLastName] = useState("");
   // const [billingCompanyName, setBillingCompanyName] = useState("");
   const [billingStreetAddress, setBillingStreetAddress] = useState("");
   const [billingCity, setBillingCity] = useState("");
   const [billingCountry, setBillingCountry] = useState("");
   const [billingUserState, setBillingUserState] = useState("");
   const [billingEmail, setBillingEmail] = useState("");
   const [billingPostalCode, setBillingPostalCode] = useState("");
   const [billingPhoneNumber, setBillingPhoneNumber] = useState("");

   const [shippingFirstName, setShippingFirstName] = useState("");
   const [shippingLastName, setShippingLastName] = useState("");
   // const [shippingCompanyName, setShippingCompanyName] = useState("");
   const [shippingStreetAddress, setShippingStreetAddress] = useState("");
   const [shippingCity, setShippingCity] = useState("");
   const [shippingCountry, setShippingCountry] = useState("");
   const [shippingUserState, setShippingUserState] = useState("");
   const [shippingEmail, setShippingEmail] = useState("");
   const [shippingPostalCode, setShippingPostalCode] = useState("");
   const [shippingPhoneNumber, setShippingPhoneNumber] = useState("");
   const [sameAdd, setSameAdd] = useState(false);
   const [checkoutPricingTable, setCheckoutPricingTable] = useState({})
   // const [loading, setLoading] = useState(false);
   const [orderCreated, setOrderCreated] = useState(false);
   // const [orderResponse, setOrderResponse] = useState(false);
   // const [modal, setModal] = useState(false);
   const [orderApiCalled, setOrderApiCalled] = useState(false);
   const [toastMessage, setToastMessage] = useState('');
   const [toastType, setToastType] = useState('none');
   const [toast, setToast] = useState(false);

   let id = {};
   localStorage.getItem('customer_id') !== null ? id['customer_id'] = localStorage.getItem('customer_id') : id['cart_id'] = localStorage.getItem('cart_id');

   const CustomerDetails = {
      'billing': {
         "first_name": billingFirstName, "last_name": billingLastName, "company": '',
         "address_1": billingStreetAddress, "city": billingCity, "state": billingUserState, "country": billingCountry,
         "address_2": "", "postcode": billingPostalCode, "email": billingEmail, "phone": billingPhoneNumber,
      },
      'shipping': {
         "first_name": shippingFirstName, "last_name": shippingLastName, "company": '',
         "address_1": shippingStreetAddress, "city": shippingCity, "state": shippingUserState, "country": shippingCountry,
         "address_2": "", "postcode": shippingPostalCode, "email": shippingEmail, "phone": shippingPhoneNumber,
      }
   }


   // const CustomerDetails = {
   //    'billing': {
   //    "billing_firstname": billingFirstName, "billing_lastname": billingLastName, "billing_companyname": '',
   //    "billing_address_1": billingStreetAddress, "billing_city": billingCity, "billing_state": billingUserState, "billing_country": billingCountry,
   //    "billing_address_2": "", "billing_postcode": billingPostalCode, "billing_email": billingEmail, "billing_phone": billingPhoneNumber,
   //    }, 
   //    'shipping': {
   //    "shipping_firstname": shippingFirstName, "shipping_lastname": shippingLastName, "shipping_companyname": '',
   //    "shipping_address_1": shippingStreetAddress, "shipping_city": shippingCity, "shipping_state": shippingUserState, "shipping_country": shippingCountry,
   //    "shipping_address_2": "", "shipping_postcode": shippingPostalCode, "shipping_email": shippingEmail, "shipping_phone": shippingPhoneNumber,
   //    }
   // }

   //const saveAddressParams = new URLSearchParams();
   // saveAddressParams.append('customer_id', 2 ); 
   //  saveAddressParams.append('billing_city', 'kanpur' ); 

   const saveAddressParams = { ...id, ...CustomerDetails };

   const saveAddress = () => {
      setToast(true);
      setToastType('warning');
      setToastMessage('We are saving your address. Please Wait...') 
          
      axios.post(
         'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/saveuseraddress', saveAddressParams, {
         headers: {
            'uid': 'cedcommerce',
         }
      }
      ).then((response) => {
         console.log(response.data)
         setToast(true);
         setToastType('success');
         setToastMessage('Your Address hass been successfully saved. Create your order now') 
         setCheckoutPricingTable(response.data);
      }).catch((error) => {
         console.log(error)
         setToast(true);
         setToastType('success');
         setToastMessage('Unable to save your address. Please try again later') 
      })

      

   }

   useEffect(() => {
      if (sameAdd) {
         // console.log("useEffect if",billingFirstName)
         setShippingFirstName(billingFirstName);
         setShippingLastName(billingLastName);
         setShippingStreetAddress(billingStreetAddress);
         setShippingCity(billingCity)
         setShippingUserState(billingUserState);
         setShippingCountry(billingCountry);
         // setShippingCompanyName(billingCompanyName);
         setShippingPhoneNumber(billingPhoneNumber);
         setShippingPostalCode(billingPostalCode);
         setShippingEmail(billingEmail)


      } else {
         //  console.log("useEffect else")
         setShippingFirstName("");
         setShippingLastName("");
         setShippingStreetAddress("");
         setShippingCity("")
         setShippingUserState("");
         setShippingCountry("");
         // setShippingCompanyName('');
         setShippingPhoneNumber('')
         setShippingPostalCode('');
         setShippingEmail('');
      }

   }, [sameAdd]);

   console.log(location.state);

   const OrderItems = location.state.orderData;

   return (

      <body className="ced-headles-body">
         <section className="ced-headles-checkout-wrapper ced-headles-section">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-8">
                     <div className="ced-headles-checkout-steps-form-style-1">
                        <ul id="accordionExample" className="ced-headles-ul">
                           <li>
                              <h6 className="ced-headles-title accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">Your Personal Details </h6>
                              <div className="ced-headles-checkout-steps-form-content collapse show" id="collapseThree" data-bs-parent="#accordionExample">
                                 <div className="row">
                                    <div className="col-md-12">
                                       <div className="ced-headles-single-form form-default">
                                          <div className="row">
                                             <p>Name</p>
                                             <div className="col-md-6 form-input form">
                                                <input type="text" placeholder="First Name" onChange={(e) => { setBillingFirstName(e.target.value) }} />
                                             </div>
                                             <div className="col-md-6 form-input form">
                                                <input type="text" placeholder="Last Name" onChange={(e) => { setBillingLastName(e.target.value) }} />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Email Address</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Email Address" onChange={(e) => { setBillingEmail(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Phone Number</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Phone Number" onChange={(e) => { setBillingPhoneNumber(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Mailing Address</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Mailing Address" onChange={(e) => { setBillingStreetAddress(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>City</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="City" onChange={(e) => { setBillingCity(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Post Code</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Post Code" onChange={(e) => { setBillingPostalCode(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Country</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Country" onChange={(e) => { setBillingCountry(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Region/State</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="State" onChange={(e) => { setBillingUserState(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>

                                    <div className="col-md-12">
                                       <div className="ced-headles-single-checkbox checkbox-style-3">
                                          <p><input type="checkbox" onChange={() => setSameAdd(!sameAdd)} />

                                             My delivery and mailing addresses are the same.</p>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="ced-headles-single-form ced-headles-button">
                                          <button className="ced-headles-btn" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">next
                                             step</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li>
                              <h6 className="ced-headles-title accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Shipping Address</h6>
                              <div className="ced-headles-checkout-steps-form-content collapse" id="collapseFour" data-bs-parent="#accordionExample">
                                 <div className="row">
                                    <div className="col-md-12">
                                       <div className="ced-headles-single-form form-default">
                                          <div className="row">
                                             <p>User Name</p>
                                             <div className="col-md-6 form-input form">
                                                <input type="text" placeholder="First Name" value={shippingFirstName} onChange={(e) => { setShippingFirstName(e.target.value) }} />
                                             </div>
                                             <div className="col-md-6 form-input form">
                                                <input type="text" placeholder="Last Name" value={shippingLastName} onChange={(e) => { setShippingLastName(e.target.value) }} />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Email Address</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Email Address" value={shippingEmail} onChange={(e) => { setShippingEmail(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Phone Number</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Phone Number" value={shippingPhoneNumber} onChange={(e) => { setShippingPhoneNumber(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Mailing Address</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Mailing Address" value={shippingStreetAddress} onChange={(e) => { setShippingStreetAddress(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>City</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="City" value={shippingCity} onChange={(e) => { setShippingCity(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Post Code</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Post Code" value={shippingPostalCode} onChange={(e) => { setShippingPostalCode(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Country</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="Country" value={shippingCountry} onChange={(e) => { setShippingCountry(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="ced-headles-single-form form-default">
                                          <p>Region/State</p>
                                          <div className="form-input form">
                                             <input type="text" placeholder="State" value={shippingUserState} onChange={(e) => { setShippingUserState(e.target.value) }} />
                                          </div>
                                       </div>
                                    </div>

                                    <div className="col-md-12">
                                       <div className="ced-headles-steps-form-btn ced-headles-button">
                                          <button className="ced-headles-btn" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">previous</button>
                                          <button className="ced-headles-btn ced-headles-btn-alt" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapseThree" onClick={() => { saveAddress(); }}>Save & Continue</button>
                                          {/* <a href="#" className="ced-headles-btn ced-headles-btn-alt">Save & Continue</a> */}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           {
                              console.log('checkkkkkkkkkkkkkk', Object.keys(checkoutPricingTable).length)
                           }
                           {
                           Object.keys(checkoutPricingTable).length > 0 ? (
                              <li>
                                 <h6 className="ced-headles-title accordion-button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">Create Order</h6>
                                 <div className="ced-headles-checkout-steps-form-content collapse" id="collapsefive" data-bs-parent="#accordionExample">
                                    <div className="row">
                                       <div className="col-12">
                                          <div className="ced-headles-checkout-payment-form">
                                             <div className="ced-headles-single-form form-default ced-headles-button">
                                                {
                                                   orderApiCalled ? (
                                                      orderCreated ? (<div>
                                                         <p>Your Order has been created successfully.</p>
                                                         <div className="ced-headles-steps-form-btn ced-headles-button">
                                                            <button className="ced-headles-btn collapsed" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" >Make Payment</button>
                                                         </div>
                                                      </div>) : (<div>Can't create your order. Please try Again
                                                         <p>Create your order now</p>
                                                         <button className="ced-headles-btn" onClick={() => {
                                                            let result = CreateOrder({ CustomerDetails, OrderItems })

                                                            setOrderApiCalled(true);
                                                            // result.then((response) => {
                                                            //    console.log(response);
                                                            setOrderCreated(true);

                                                            // }).catch((error) => {
                                                            //    console.log(error)
                                                            // })
                                                         }}  >Create Order</button>
                                                      </div>)

                                                   ): (
                                                      <div>
                                                         <p>Create your order now</p>
                                                         <button className="ced-headles-btn" onClick={() => {
                                                            let result = CreateOrder({ CustomerDetails, OrderItems })

                                                            setOrderApiCalled(true);
                                                            // result.then((response) => {
                                                            //    console.log(response);
                                                            setOrderCreated(true);

                                                            // }).catch((error) => {
                                                            //    console.log(error)
                                                            // })
                                                         }}  >Create Order</button>
                                                      </div>
                                                      )
                                                }
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </li>

                           ) : (<></>)

                           }
                           {
                             // orderCreated ? (
                                 <Credit_debit_html  addressParams= {saveAddressParams} checkoutPricingTable={ checkoutPricingTable } />
                                // ) : (<></>)
                           }
                        </ul>
                     </div>
                  </div>{
                     console.log("checkooooooooooo", checkoutPricingTable)
                  }
                  {
                      Object.keys(checkoutPricingTable).length > 0 ? (
                        <CheckoutPricingTable data={checkoutPricingTable} />
                     ) : (<></>)
                  }
                   {
                     toast &&
                     <ToastWrapper >
                     <Toast message={toastMessage ?? "none"} type={toastType} timeout={3000} onDismiss={() => { setToast(false) }} />
                     </ToastWrapper>
                  }
               </div>
            </div>
         </section>

         <a href="/checkout" className="ced-headles-scroll-top">
            <i className="fa fa-angle-up" aria-hidden="true"></i>
         </a>
         <script src="assets/js/bootstrap.min.js"></script>
      </body>

   )

}

export default Checkout;

