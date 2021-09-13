import * as React from "react"
import "../css/index.css"
import 'font-awesome/css/font-awesome.min.css';
// import { Spinner } from '@cedcommerce/ounce-ui'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
// import { useState } from "react"
import no_product from '../images/no_product.jpg'


const ProductItem = (props) => {

    console.log(props);
    const { singleProduct, product_key } = props;

    console.log(singleProduct);

    let image_source = "";
    image_source = singleProduct.product_image !== "" && singleProduct.product_image !== null ? singleProduct.product_image : no_product;

    // useEffect(() => {
    //     console.log("productItem", "singleProductPrice", singleProductPrice, "productQuantity", productQuantity);
    //     props.callback(singleProductPrice, productQuantity);
    // }, [events])

    // useEffect(() => {
    //     props.callback({'product_id': singleProduct.product_id, 'qty': qty });
    // },[qty])

    // useEffect( () => {
    //     setQty(singleProduct.quantity)
    // },[props])

    const inc_qty = () => {
        props.callback({ 'product_id': singleProduct.product_id, 'qty': 'inc', product_key });
    }

    const red_qty = () => {
        if (singleProduct.quantity > 1) {
            props.callback({ 'product_id': singleProduct.product_id, 'qty': 'dec', "product_key": product_key });
        }

    }


    const deleteItem = async () => {
        //props.callback({'product_id': singleProduct.product_id, 'delete': 'del', "product_key": product_key })

        let removeItemParams = new URLSearchParams()
        console.log(singleProduct)
        removeItemParams.append('customer_id', localStorage.getItem('customer_id'))
        removeItemParams.append('product_id', singleProduct.product_id)
        singleProduct.variation_id ? removeItemParams.append('variation_id', singleProduct.variation_id) : console.log("headless");

        await axios.post(
            'http://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/removecart', removeItemParams,
            {
                headers: { 'uid': 'cedcommerce' }
            }
        ).then((response) => {
            console.log(response.data.cart_data.data.data)
            // response.data.cart_data.data.data
            props.callback({ 'cart_products': response.data.cart_data.data.data.products, 'delete': 'successfully', })
        }).catch((error) => {
            console.log(error)
            props.callback({ 'cart_products': [], 'delete': 'failed', })

        });
    }
    let singleProductPrice = singleProduct.product_price;
    let subtotal = singleProductPrice * singleProduct.quantity;

    return (

        <div className="ced-headles-cart-single-list">
            <div className="row align-items-center">
                <div className="col-lg-1 col-md-1 col-12">
                    <img className="ced-headles-img" src={image_source} alt="img" />
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                    <h5 className="ced-headles-product-name">
                        {singleProduct.product_name}
                    </h5>
                    <p className="ced-headles-product-des">
                        <span><em>Type:</em> Mirrorless</span>
                        <span><em>Color:</em> Black</span>
                    </p>
                </div>

                <div class="col-lg-2 col-md-2 col-12">
                    <div class="row">
                        <p>
                            <button className="ced-headles-quantity" onClick={() => { red_qty() }}> <i className="fa fa-minus"></i></button>
                            <strong className="ced-headles-strong">{singleProduct.quantity}</strong>
                            <button className="ced-headles-quantity" onClick={() => { inc_qty() }} ><i className="fa fa-plus" >{''}</i></button>
                        </p>
                    </div>
                </div>

                {/* <div className="col-lg-1 col-md-1 col-12">
                    <button className="ced-headless-dec-qty" onClick={ () => { red_qty() } }> <i className="fa fa-minus"></i></button>
                </div>
                <div className="col-lg-1 col-md-1 col-12">{singleProduct.quantity}</div>

                <div className="col-lg-1 col-md-1 col-12">

                    <button className="ced-headless-inc-qty" onClick={ () => { inc_qty() } } ><i className="fa fa-plus" >{''}</i></button>
                </div> */}


                <div className="col-lg-2 col-md-2 col-12">
                    <p> {singleProduct.currency_symbol} {subtotal}</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                    <p> {singleProduct.currency_symbol} {singleProduct.product_discount ? singleProduct.product_discount : 0}</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12 ced-headles-mr">
                    <button className="ced-headles-remove-item" onClick={() => { deleteItem() }}><i className="fa fa-close">{''}</i></button>
                </div>
            </div>
        </div>

    )

}

export default ProductItem

