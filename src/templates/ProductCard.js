import * as React from "react"
import "../css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from '../images/icon.png'
import { Link } from 'gatsby';
import StarRated from './StarRated';
import { useState, useEffect } from 'react';
import { Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
// import AddToCart from '../components/AddToCart.js'
import addtocart from '../components/addtocart'

const ProductCard = (props) => {

    const [featuredImage, setFeaturedImage] = useState("");
    const [featuredImageExist, setFeaturedImageExist] = useState(false);
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastType, setToastType ] = useState('none');
    const [ toast , setToast ] = useState(false);

    //console.log(props)

    useEffect(() => {

        Object.keys(props.data).map(key => {
            if (key === "images" && props.data[key] !== null) {
                const ImageObject = props.data[key];
                let image_flag = 1;
                ImageObject.map(galleryImage => {
                    if (image_flag === 1) {
                        setFeaturedImage(galleryImage["src"]);
                        setFeaturedImageExist(true);

                    }
                    image_flag++;
                    return null
                })

            }
            return null

        })

    }, [])


    return (

        <div className="col-lg-4 col-md-6 col-12">
            <div className="ced-headles-single-product">
                <div className="ced-headles-product-image">
                    {
                        featuredImageExist ? (<img src={featuredImage}  alt="ProductImage" />
                        ) :
                            (<img src={icon}  alt="ProductImage"  />)
                    }

                    <div className="ced-headles-button">
                        {/* <a href="/" className="ced-headles-btn"><i className="fa fa-shopping-cart"></i> Add to Cart</a> */}
                        {
                            props.data.type === 'simple' ? (
                                <button className="ced-headles-btn" onClick = { () => {
                                    let resp = addtocart(props.data);
                                    console.log(resp);
                                    resp.then((response) => {
                                        console.log(response); 
                                        setToast(true);
                                        setToastType('success');
                                        setToastMessage('Your Product has been successfully added to cart');
                                    }).catch((error) => {
                                        console.log(error) 
                                        setToast(true);
                                        setToastType('warning')
                                        setToastMessage("Can't add product to your cart now");
                                    })
                                
                                } } ><i className="fa fa-shopping-cart"></i>Add To Cart</button>
                            )  : (
                                <Link className="ced-headles-btn-view" to="/singleProductView" state={{ product: props.data }} ><i class="fa fa-eye"></i> View</Link>
                    
                            )
                        }
                         </div>
                </div>
                <div className="ced-headles-product-info">
                    <span className="ced-headles-category">{props.data.category}</span>
                    <h4 className="ced-headles-title">
                        {/* <a href="#">{ props.data.name }</a> */}
                        <Link to='/singleProductView' state={{ product: props.data }}> { props.data.name } </Link>

                    </h4>
                    <div className="ced-headles-review">
                        
                      <StarRated defaultColor="grey" present={ props.average_rating} size={25} spacing="none" />
                             
                      <span className="ced-headles-span">{props.average_rating} Review(s)</span>
                    </div>
                    <div className="ced-headles-price">
                        <span>${props.data.price}</span>
                    </div>
                </div>
            </div>
            {
                        toast &&
                        <ToastWrapper >
                            <Toast message={toastMessage ?? "none"} type={toastType} timeout={3000} onDismiss={() => { setToast(false) }} />
                        </ToastWrapper>
                    }
        </div>


    )



}

export default ProductCard;