// // import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// const api = new WooCommerceRestApi({
//   url: process.env.WORDPRESS_STORE_URL,
//   consumerKey: process.env.WC_CONSUMER_KEY,
//   consumerSecret: process.env.WC_CONSUMER_SECRET,
//   version: "wc/v3"
// });


// /**
//  *   CREATE ORDER
//  *  @see https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#create-an-order
//  */


// export const createOrder = async () => {
//     const {data} = await api.post( "orders", {
//     name: "Premium Quality", 
//     type: "simple",
//     regular_price: "21.99",
//    })
//     .then((response) => {
//       // Successful request
//       console.log("Response Status:", response.status);
//       console.log("Response Headers:", response.headers);
//       console.log("Response Data:", response.data);
//     })
//     .catch((error) => {
//       // Invalid request, for 4xx and 5xx statuses
//       console.log("Response Status:", error.response.status);
//       console.log("Response Headers:", error.response.headers);
//       console.log("Response Data:", error.response.data);
//     })
//     .finally(() => {
//       // Always executed.
//     });

//}    


const axios = require('axios').default



 const CreateOrder =  (orderData) => {
   console.log(orderData);
   return true;

  const order = axios.post('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/orders?consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
    ,{
      payment_method: "bacs",
      payment_method_title: "Credit/Debit Card",
      set_paid: true,
      billing: orderData.CustomerDetails.billing,
      shipping: orderData.CustomerDetails.shipping,
      line_items: orderData.OrderItems
    }
    ).then((response) => {
      console.log(response)

    }).catch((error) => {
      console.log(error)
    }); 


  
 return order;
   
}


export default CreateOrder