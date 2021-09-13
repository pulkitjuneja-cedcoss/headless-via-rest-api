import * as React from "react"
import "../css/index.css"
import { Link } from "gatsby"
import ProductItem from "../templates/ProductItem"
import { useEffect, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Toast, Spinner, ToastWrapper } from "@cedcommerce/ounce-ui";
const axios = require('axios').default

const Cart = () => {
   // const [totalAmountPaid, setTotalAmountPaid] = useState(0);
   const [cartData, setCartData] = useState({});
   const [cartProducts, setCartProducts] = useState([]);
   const [event, setEvent] = useState(false);
   const [event2, setEvent2] = useState(false);
   const [cartChanged, setCartChanged] = useState(false);
   const [apiCalled, setApiCalled] = useState(false);
   const [toastMessage, setToastMessage] = useState('');
   const [toastType, setToastType] = useState('none');
   const [toast, setToast] = useState(false);
   //   const params = new URLSearchParams()

   //   params.append('card[number]', '3434343434343434')
   //   params.append('card[exp_month]', '08')
   //   params.append('card[exp_year]', '2022')
   //   params.append('card[cvc]', '314')

   // const getCardToken = () => {
   //   const fetchCardToken = axios.post('https://api.stripe.com/v1/tokens', params, {
   //     headers: {
   //       'Authorization': `Bearer sk_test_51JQ5CVSC2zQiWX5zIjsjYezghz4De6RFR5LSG5jLnHqr4H4EIhrPB28e3k4Ou5KEI2b6bbdZshndkboBgy6pzCWr00bfERyAUf`
   //     }
   //   }).then(response => {
   //     console.log(response);
   //     // setCustomerId(response.data.id);
   //   });

   // }

   const updateCart = () => {
      console.log("updateCart");
   }

   const handleCallback = (data) => {
      console.log("data", data)
      let key = data['product_key'];
      if (data.qty === 'inc') {
         console.log('inc')
         cartProducts[key]['quantity'] = cartProducts[key]['quantity'] + 1;
         console.log(cartProducts)
         setEvent(!event);
         setCartChanged(true);
         setCartProducts(cartProducts);
      }
      else if (data.qty === 'dec') {
         console.log('inc')
         cartProducts[key]['quantity'] = cartProducts[key]['quantity'] - 1;
         console.log(cartProducts)
         setEvent(!event);
         setCartChanged(true);
         setCartProducts(cartProducts);

      }
      else if (data.delete === "successfully") {

         setCartProducts(data.cart_products)
         // setEvent(!event);
         // setCartChanged(true);
         setToast(true);
         setToastType('success')
         setToastMessage("Product has been successfully removed from cart");

      }
      else if (data.delete === "failed") {
         setToast(true);
         setToastType('warning')
         setToastMessage("Can't remove product from your cart now. Facing some issue");

      }

   }

   useEffect(() => {
      console.log('useEffect')
      setEvent2(!event2)
   }, [event]);


   const viewCartParams = new URLSearchParams()

   localStorage.getItem('customer_id') !== null ? viewCartParams.append('customer_id', localStorage.getItem('customer_id')) : viewCartParams.append('cart_id', localStorage.getItem('cart_id'));


   const deleteCart = async () => {
      await axios.post(
         'http://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/deletecart', {
         'customer_id': localStorage.getItem('customer_id'),
      },
         {
            headers: { 'uid': 'cedcommerce' }
         }
      ).then((response) => {
         console.log(response.data)

      }).catch((error) => {
         console.log(error)

      });

   }

   const viewCart = async () => {
      await axios.post(
         'http://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/viewcart', viewCartParams,
         {
            headers: { 'uid': 'cedcommerce' }
         }
      ).then((response) => {
         console.log(response.data)
         setApiCalled(true);
         setCartData(response.data);
         let cartProductsData = [];
         response.data.data.products.map((product) => {
            console.log(product)
            let pro = {
               'product_id': product.product_id, 'product_name': product.product_name, 'product_image': product.product_image, 'product_price': product.product_price,
               'product_subtotal': product.product_subtotal, 'product_type': product.product_type, 'quantity': product.quantity, 'currency_symbol': product.currency_symbol,
               'variation_id': product.variation_id ? product.variation_id : null,
            };
            cartProductsData.push(pro);
            return null;
         })
         console.log(cartProductsData)
         setCartProducts(cartProductsData);
      }).catch((error) => {
         console.log(error)

      });

   }

   useEffect(() => {
      if (localStorage.getItem('cart_id') !== null || localStorage.getItem('customer_id') !== null) {
         viewCart();
         // return () => {
         //    setCartData({}); // This worked for me
         //  };
      }
   }, [])


   if (localStorage.getItem('customer_id') === null && localStorage.getItem('user_id') === null) {
      return (
         <body class="ced-headles-body">
            <div class="ced-headles-shopping-cart ced-headles-section">
               <div class="container">
                  <div class="row">
                     <h2>You have Empty Cart</h2>
                     <p> You have not added any Products in the Cart yet. Please Add some products or Login !!!....</p>
                     <div class="ced-headles-button">
                        <a href="/login" class="ced-headles-btn">Login</a>
                     </div>
                  </div>
               </div>
            </div>
         </body>
      )
   }
   return (
      <body className="ced-headles-body">
         <div className="ced-headles-shopping-cart ced-headles-section">
            <div className="container">
               <div className="ced-headles-cart-list-head">
                  <div className="ced-headles-cart-list-title">
                     <div className="row">
                        <div className="col-lg-1 col-md-1 col-12"></div>
                        <div className="col-lg-3 col-md-3 col-12">
                           <p>Product Name</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                           <p>Quantity</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                           <p>Subtotal</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                           <p>Discount</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                           <p>Remove</p>
                        </div>
                     </div>
                  </div>

                  {
                     apiCalled ? (
                        cartProducts.length > 0 ? (
                           Object.keys(cartProducts).map((product_key) => {
                              console.log('out', product_key)
                              let product = cartProducts[product_key];
                              return (<ProductItem singleProduct={product} product_key={product_key} callback={handleCallback} />)
                           }
                           )) : (<div class="ced-headles-body">
                              <div class="ced-headles-shopping-cart ced-headles-section">
                                 <div class="container">
                                    <div class="row">
                                       <h2>You have Empty Cart</h2>
                                       <p> You have not added any Products in the Cart yet. Please Add some products or Login !!!....</p>
                                       <div class="ced-headles-button">
                                          <a href="/login" class="ced-headles-btn">Login</a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>)
                     ) : (<Spinner />)

                  }

                  {
                     toast &&
                     <ToastWrapper >
                        <Toast message={toastMessage ?? "none"} type={toastType} timeout={3000} onDismiss={() => { setToast(false) }} />
                     </ToastWrapper>
                  }

               </div>

               {
                  cartProducts.length > 0 ? (
                     <div className="row">
                        <div className="col-12">
                           <div className="ced-headles-total-amount">
                              <div className="row">
                                 <div className="col-lg-8 col-md-6 col-12">
                                    <div className="ced-headles-left">
                                       <div className="ced-headles-coupon">
                                          <form action="#" target="_blank">
                                             <input type="text" name="Coupon" placeholder="Enter Your Coupon" />
                                             <div className="ced-headles-button">
                                                <button className="ced-headles-btn" >Apply Coupon</button>
                                             </div>
                                          </form>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-lg-4 col-md-6 col-12">
                                    <div className="ced-headles-right">
                                       <div className="ced-headles-button">
                                          {
                                             cartChanged ? (
                                                <button className="ced-headles-btn" onClick={() => { updateCart() }} >Save Changes</button>
                                             ) : (<>
                                                <Link to="/checkout" state={{ 'orderData': cartProducts }} className="ced-headles-btn">Checkout</Link>
                                                <a href="/shop" className="ced-headles-btn ced-headles-btn-alt">Continue shopping</a>

                                             </>)
                                          }
                                          {
                                             <button className="ced-headles-btn" onClick={() => { deleteCart() }} >Delete Cart</button>

                                          }
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     ) : (<></>)
                  }
            </div>
         </div>
         <a href="/cart" className="ced-headles-scroll-top">
            <i className="fa fa-angle-up" aria-hidden="true"></i>
         </a>
      </body>


   )


}


export default Cart;



