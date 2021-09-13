import React from 'react';
import { useState } from 'react';
import { Spinner, Button } from '@cedcommerce/ounce-ui';
const axios = require('axios').default

const OrderStatus = () => {

  const [orderId, setOrderId] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderApiCalled, setOrderApiCalled] = useState(false)

  const fetOrderDetails = async (id) => {
    setOrderApiCalled(true);

    await axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/orders/' + id + '?consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
    ).then((response) => {
      console.log(response);
      setApiResponse(response);

    }).catch((error) => {
      console.error(error);
      setApiResponse('errored');

    });

    setLoading(false);

  }


  // The below code is for fetching ORDER STATUS directly without entering ORDER ID when it is redirected
  //  from Order Creation Modal to here

  // if( trigger && location.state !== null && location.state.id !== null){
  //   setLoading(true);
  //   fetOrderDetails(location.state.id) 

  // }

  // The above code is for fetching ORDER STATUS directly without entering ORDER ID when it is redirected
  //  from Order Creation Modal to here    


  return (
    <div>
      <input type="number" onChange={(e) => setOrderId(e.target.value)} placeholder='Enter order Id here' />
      <Button onClick={() => {
        setLoading(true);
        fetOrderDetails(orderId);
      }}>Fetch</Button>

      {orderApiCalled ? (

        loading ? (<Spinner />) : (<div>
          {
            apiResponse !== "errored" ? (
              <div class="orderStatus">
                <h2 class="orderStatus-heading">Order Details</h2>
                <p class="orderStatus-contents">Order ID: {apiResponse.data.id}</p>
                <p class="orderStatus-contents">Order Status: {apiResponse.data.status}</p>
                <p class="orderStatus-contents">Order Date: {apiResponse.data.date_created}</p>
                <p class="orderStatus-contents">Order Items: {apiResponse.data.line_items.length}</p>
                <p class="orderStatus-contents">Quantity of Items: { }</p>
                <p class="orderStatus-contents">Total Amout Paid: {apiResponse.data.total}</p>
                <p class="orderStatus-contents">Total Tax: {apiResponse.data.total_tax}</p>
                <p class="orderStatus-contents">Shipping First Name: {apiResponse.data.shipping.first_name}</p>
                <p class="orderStatus-contents">Shipping Last Name: {apiResponse.data.shipping.last_name}</p>
                <p class="orderStatus-contents">Shipping Company Name: {apiResponse.data.shipping.company}</p>
                <p class="orderStatus-contents">Shipping Street Address: { }</p>
                <p class="orderStatus-contents">Shipping City: {apiResponse.data.shipping.city}</p>
                <p class="orderStatus-contents">Shipping State: {apiResponse.data.shipping.state}</p>
                <p class="orderStatus-contents">Shipping Country: {apiResponse.data.shipping.country}</p>
                <p class="orderStatus-contents">Billing First Name: {apiResponse.data.billing.first_name}</p>
                <p class="orderStatus-contents">Billing Last Name: {apiResponse.data.billing.last_name}</p>
                <p class="orderStatus-contents">Billing Company Name: {apiResponse.data.billing.company}</p>
                <p class="orderStatus-contents">Billing Street Address: { }</p>
                <p class="orderStatus-contents">Billing City: {apiResponse.data.billing.city}</p>
                <p class="orderStatus-contents">Billing State: {apiResponse.data.billing.state}</p>
                <p class="orderStatus-contents">Billing Country: {apiResponse.data.billing.country}</p>
              </div>) : (
              <div class="orderStatus">
                <h2>Your Order Status cannot be fetched now. Please try again later.</h2>
                <h3>Sorry for Inconvenience</h3>
              </div>
            )
          }

        </div>)

      ) : (<></>)

      }

    </div>

  );
};

export default OrderStatus







