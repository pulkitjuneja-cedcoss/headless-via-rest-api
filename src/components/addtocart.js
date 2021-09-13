

import "../css/index.css"
const axios = require('axios').default

const addtocart = (product) => {
    console.log("addtocart",product);
    // product.type == 'variable' ? console.log(localStorage.getItem('variationId')) : console.log('simple');

    const addToCartParams = new URLSearchParams();
    // console.log(localStorage.getItem('customer_id') )

    if( localStorage.getItem('customer_id') !== null ){
        addToCartParams.append('customer_id', localStorage.getItem('customer_id'));
    }
    else if( localStorage.getItem('cart_id') !== null ){
       addToCartParams.append('cart_id', localStorage.getItem('cart_id')) ;
    
    }

    if(product.type === 'simple')(
        addToCartParams.append('product_id', product.id ) 
    )
    else if(product.type === 'variable'){
        addToCartParams.append('product_id', product.id ) 
        addToCartParams.append('variation_id', localStorage.getItem('variation_id') )
    }
    
    addToCartParams.append('qty', 1 ); 
     
    
    console.log(addToCartParams);

    const header = { 'uid': 'cedcommerce' };
    const addProduct = axios.post(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/addtocart', addToCartParams ,{
                headers: header
            }
          ).then((response) => {
              
            console.log(response.data)
            localStorage.getItem('cart_id',response.data.cart_id.cart_id)
            return response;
            }).catch((error) => {
              console.log(error)
              return error;
            })

    return addProduct;
    
}

export default addtocart


