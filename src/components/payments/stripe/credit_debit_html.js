import React,{ useState } from 'react'
import { registerCard, registerCustomer, makePayment } from './credit_debit'
import "../../../css/index.css"
import 'font-awesome/css/font-awesome.min.css';
import { Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import  { updateStatus }  from '../../order/orderStatus.js'


const Credit_debit_html = (props) => {

    const [ name, setName ] = useState('');
    const [ cardNumber, setCardNumber ] = useState('');
    const [ expMonth, setExpMonth] = useState('');
    const [ expYear, setExpYear] = useState();
    const [ cvc, setCvc] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('none');
    const [toast, setToast] = useState(false);

    const { checkoutPricingTable, addressParams, orderResponse } = props;
    const cardData = { 'name': name, 'cardNumber': cardNumber, 'expMonth': expMonth, 'expYear': expYear, 'cvc': cvc };

    const current_date = new Date();
    const date = current_date.getDate();
    const month = current_date.getMonth();
    const year = current_date.getFullYear();


    const updateOrderStatus = (order_id) => {
        let result = updateStatus(order_id);
        result.then( (response) => {
            console.log(response)
        }).catch( (error) => {
            console.log(error)
        })
    }

    const verifyCardDetails = () => {

        if(name && cardNumber && expMonth && expYear && cvc !== ''  ){

            if(cardNumber.length !== 19 ){ setToast(true);setToastType('warning'); setToastMessage('Please Enter a Valid Card Number. It should pnly contain 16 digits.') }
            else if(expMonth > 12 ){ setToast(true);setToastType('warning'); setToastMessage('Card Expiry Month cannot be grater than 12') }
            else if(expYear.length !== 4 ){ setToast(true);setToastType('warning'); setToastMessage('Please Enter a Valid Card Expiry Year') }
            else if(expYear < year ){ setToast(true);setToastType('warning'); setToastMessage('Please Enter a valid Card Expiry Month') }
            else if(cvc.length !== 3){ setToast(true);setToastType('warning'); setToastMessage('Please Enter a Valid CVC or CVV') }
            else if(expYear == year ){ 
                console.log('okkkkk')
                if(expMonth <= month + 1 ){
                    setToast(true);setToastType('warning'); setToastMessage('Please Enter a valid Card Expiry Month and Expiry Year')
                }
                else{
                    let register_card = registerCard({'cardData':cardData, "checkoutPricingTable": checkoutPricingTable, "addressParams": addressParams });
                    console.log(register_card);
                    // register_card.then((response) => {
                    //     console.log(response)
                    // }).catch((error) => { console.log(error)})

                    register_card.then((response) => {
                        console.log(response.data);
                        let register_customer = registerCustomer({'cardData':cardData, "checkoutPricingTable": checkoutPricingTable, "addressParams": addressParams,'response': response });
                        register_customer.then((response) => {
                            let make_payment = makePayment({'cardData':cardData, "checkoutPricingTable": checkoutPricingTable, "addressParams": addressParams, 'response': response });
                            make_payment.then((response) => {
                                console.log(response);
                                setToast(true);
                                setToastType('success');
                                setToastMessage('You have successfully made Payment.') 
                                updateOrderStatus(orderResponse.id);
                          
                            }).catch((error) => {
                                console.log(error);
                                setToast(true);
                                setToastType('error');
                                setToastMessage('Unable to make Payment. Facing Technical issues. Please try again later ') 
                            }) 
                        }).catch((error) => {
                            console.log(error);
                            setToast(true);
                            setToastType('error');
                            setToastMessage('Unable to make Payment. Facing Technical issues. Please try again later ') 
                        })
                    }).catch( (error) => {
                        console.log(error);   
                        setToast(true);
                        setToastType('error');
                        setToastMessage('Unable to make Payment. Facing Technical issues. Please try again later ') 
                    }) 
                   
                    setToast(true);
                    setToastType('none');
                    setToastMessage('We are Procesing Your Payment. Please Wait!!!...') 
                }
            }
           else{
            let register_card = registerCard({'cardData':cardData, "checkoutPricingTable": checkoutPricingTable, "addressParams": addressParams });
            console.log(register_card);
            register_card.then((response) => {
                console.log(response.data);
                let register_customer = registerCustomer({'cardData':cardData, "checkoutPricingTable": checkoutPricingTable, "addressParams": addressParams,'response': response });
                register_customer.then((response) => {
                    let make_payment = makePayment({'cardData':cardData, "checkoutPricingTable": checkoutPricingTable, "addressParams": addressParams, 'response': response });
                    make_payment.then((response) => {
                        console.log(response);
                        setToast(true);
                        setToastType('success');
                        setToastMessage('You have successfully made Payment.') 
                        updateOrderStatus(orderResponse.id);
                    }).catch((error) => {
                        console.log(error);
                        setToast(true);
                        setToastType('error');
                        setToastMessage('Unable to make Payment. Facing Technical issues. Please try again later ') 
                    }) 
                }).catch((error) => {
                    console.log(error);
                    setToast(true);
                    setToastType('error');
                    setToastMessage('Unable to make Payment. Facing Technical issues. Please try again later ') 
                })
            }).catch( (error) => {
                console.log(error);   
                setToast(true);
                setToastType('error');
                setToastMessage('Unable to make Payment. Facing Technical issues. Please try again later ') 
            }) 
            setToast(true);
            setToastType('none');
            setToastMessage('We are Procesing Your Payment. Please Wait!!!...') 

           }
      
        }
        else{
            if(name === ''){ setToast(true);setToastType('warning'); setToastMessage('Please Enter Card Holder Name') }
            else if(cardNumber === ''){ setToast(true);setToastType('warning'); setToastMessage('Please Enter Card Number') }
            else if(expMonth === ''){ setToast(true);setToastType('warning'); setToastMessage('Please Enter Card Expiry Month') }
            else if(expYear === ''){ setToast(true);setToastType('warning'); setToastMessage('Please Enter Card Expiry Year') }
            else if(cvc === ''){ setToast(true);setToastType('warning'); setToastMessage('Please Enter CVC or CVV') }
            
        }
    }

    return (

        <li>
            <h6 className="ced-headles-title accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">Payment Info</h6>
            <div className="ced-headles-checkout-steps-form-content collapse" id="collapseSix" data-bs-parent="#accordionExample">
                <div className="row">
                    <div className="col-12">
                        <div className="ced-headles-single-checkbox checkbox-style-3">
                            <input type="checkbox" name="Credit/Debit Card" checked onChange={() => { return null }} /> Credit/Debit Card
                            {/* <input type="checkbox" name="Paypal" />    Paypal */}
                        </div>
                        <div className="ced-headles-checkout-payment-form">
                            <div className="ced-headles-single-form form-default">
                                <p>Cardholder Name</p>
                                <div className="form-input form">
                                    <input type="text" placeholder="Cardholder Name" onChange = { (e) => { setName(e.target.value)} } />
                                </div>
                            </div>
                            <div className="ced-headles-single-form form-default">
                                <p>Card Number</p>
                                <div className="form-input form">
                                    <input type="text" placeholder="0000 0000 0000 0000" onChange = { (e) => { setCardNumber(e.target.value) } } />
                                    <img src="https://demo.graygrids.com/themes/shopgrids/assets/images/payment/card.png" alt="card" />
                                </div>
                            </div>
                            <div className="ced-headles-payment-card-info">
                                <div className="ced-headles-single-form form-default">
                                    <p>Expiration</p>
                                    <div className="d-flex">
                                        <div className="form-input form">
                                            <input type="number" placeholder="MM"  maxLength= "2" onChange = { (e) => { setExpMonth(e.target.value) } } />
                                        </div>
                                        <div className="form-input form">
                                            <input type="number" placeholder="YYYY"  maxLength= "4" onChange = { (e) => { setExpYear(e.target.value) } } />
                                        </div>
                                        <div className="form-input form">
                                            <input type="number" placeholder="CVC/CVV" maxLength="3" onChange = { (e) => { setCvc(e.target.value) } } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ced-headles-single-form form-default ced-headles-button">
                                <button className="ced-headles-btn"
                                onClick = { () => {
                                    verifyCardDetails()
                                }}>Pay now( 
                                    {/* {checkoutPricingTable.data.currency_symbol} {checkoutPricingTable.data.cart_total}  */}
                                    )</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                toast &&
                <ToastWrapper >
                <Toast message={toastMessage ?? "none"} type={toastType} timeout={3000} onDismiss={() => { setToast(false) }} />
                </ToastWrapper>
            }
        </li>

    )


}


export default Credit_debit_html


