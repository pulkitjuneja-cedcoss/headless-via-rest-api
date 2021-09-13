import React from 'react';
import { useState, useEffect } from 'react';
import Thumbnail from '../templates/Thumbnail'
import { Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
// import icon from '../images/icon.png'
// import StarRated from '../templates/StarRated';
import ProductReview from '../templates/ProductReview.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import addtocart from '../components/addtocart'

//https://demo.cedcommerce.com/woocommerce/woocommerce-headless

// ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d
// cs_570f0302d78f09d0a73410991296fe79d208d314

const SingleProductView = ({ location }) => {

    const [featuredImage, setFeaturedImage] = useState("");
    const [featuredImageExist, setFeaturedImageExist] = useState(false);
    const [displayImage, setDisplayImage] = useState("");
    const [firstGalleryImageExist, setFirstGalleryImageExist] = useState(false);
    const [galleryImagesExist, setGalleryImagesExist] = useState(false);
    const [galleryImagesLinks, setGalleryImagesLinks] = useState([]);
    const [productVariationsData, setProductVariationsData] = useState([])
    const [attr, setAttr] = useState({});
    const [event, setEvent] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('none');
    const [toast, setToast] = useState(false)
    // const [ selectedVariation, setSelectedVariation ] = useState();


    console.log("singleProductView", location);

    const { product } = location.state;


    const setAttributes = (label, value) => {
        setEvent(!event);
        const obj = attr;
        obj[label] = value;
        setAttr(obj)
        // console.log(obj)
    }


    const productVariations = async () => {

        await axios.get(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/products/' + location.state.product.id + '/variations?consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
        ).then((response) => {
            // console.log(response)
            setProductVariationsData(response.data)
        }).catch((error) => {
            console.log(error)

        });

    }

    useEffect(() => {

        let galleryImagesLinks = [];
        Object.keys(location.state.product).map(key => {

            if (key === "images" && location.state.product[key] !== null) {
                const GalleryImageObject = location.state.product[key];

                let image_flag = 1;
                // setFeaturedImage(ImageObject["sourceUrl"]);
                GalleryImageObject.map(galleryImage => {
                    if (image_flag === 1) {
                        setFeaturedImage(galleryImage["src"]);
                        setFeaturedImageExist(true);
                        setFirstGalleryImageExist(true);
                    }
                    galleryImagesLinks.push(galleryImage["src"]);
                    image_flag++;
                    return null
                })
                setGalleryImagesLinks(galleryImagesLinks);
                setGalleryImagesExist(true)

            }

            return null
        })


        // productReviews();
        if (location.state.product.variations.length > 0) {
            //  if ( productVariationsData.length === 0 ){
            productVariations();
            // }
        }
    }, [])


    const displayProductImage = (link) => {
        // console.log("link", link);
        setDisplayImage(link);
        // setFeaturedImageExist(false)
        setFirstGalleryImageExist(false);
    }


    return (

        <body className="ced-headles-body">
            <section className="ced-headles-item-details ced-headles-section">
                <div className="container">
                    <div className="ced-headles-top-area">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12 col-12">
                                <div className="ced-headles-product-images">
                                    <main id="gallery">
                                        <div className="ced-headles-main-img">

                                            {
                                                firstGalleryImageExist ? (<img src={featuredImage} alt="ProductImage" />
                                                ) : (<></>)
                                            }
                                            {
                                                displayImage ? (<img src={displayImage} alt="ProductImage" />
                                                ) : (<div></div>)
                                            }
                                        </div>
                                        <div className="ced-headles-images">
                                            {/* {
                                                console.log('galleryImagesurl', galleryImagesExist)
                                            } */}
                                            {
                                                galleryImagesExist ? (
                                                    <div className="ced-headles-thumbnail">{
                                                        galleryImagesLinks.map((link) => {
                                                            return <button onClick={() => displayProductImage(link)}>
                                                                <Thumbnail link={link} />
                                                            </button>
                                                        })
                                                    }
                                                    </div>
                                                ) : (<div> </div>)
                                            }


                                        </div>
                                    </main>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-12">
                                <div className="ced-headles-product-info">
                                    <h2 className="ced-headles-title">{product.name}</h2>
                                    <p className="ced-headles-category"><i className="fa fa-tag"></i> Drones:<a href="img">Action
                                        cameras</a>
                                    </p>

                                    {
                                        product.variations.length > 0 ? (

                                            productVariationsData.length > 0 ? (
                                                productVariationsData.map((variant) => {
                                                    // console.log(variant);
                                                    // console.log(attr)
                                                    // let link = 'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/product/' + link_part ;
                                                    //  let desired_sku = product.sku;
                                                    let link_part = ''
                                                    // let desired_permalink = product.permalink;
                                                    if (Object.keys(attr).length > 0) {
                                                        // console.log(attr, "attr")
                                                        Object.keys(attr).map(attribute_key => {
                                                            // console.log("hy", attribute_key, attr[attribute_key])
                                                            link_part = link_part + 'attribute_pa_' + attribute_key.toLowerCase() + '=' + attr[attribute_key].toLowerCase() + '&';
                                                            // desired_sku = desired_sku + '-' + attr[attribute_key].toUpperCase()
                                                            // console.log(desired_permalink);
                                                            return null
                                                        })
                                                    }
                                                    link_part = link_part.slice(0, link_part.length - 1);
                                                    let desired_permalink = 'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/product/' + product.name.toLowerCase().replaceAll(' ', '-') + '/?' + link_part;
                                                    // console.log("desiire",desired_permalink)
                                                    //     console.log("var_sku",variant.permalink)
                                                    if (variant.permalink === desired_permalink) {
                                                        // console.log('matched');
                                                        // setSelectedVariation(variant.id);
                                                        localStorage.setItem('variation_id', variant.id);

                                                        return (
                                                            <h3 className="ced-headles-price">
                                                                ${variant.sale_price ? variant.sale_price : variant.price}
                                                                <span>${variant.regular_price ? variant.regular_price : variant.price}</span>
                                                            </h3>

                                                        )

                                                    }

                                                    return null
                                                })
                                            ) : (<div></div>)

                                        ) : (
                                            <h3 className="ced-headles-price">
                                                ${product.sale_price ? product.sale_price : product.price}
                                                <span>${product.regular_price ? product.regular_price : product.price}</span>
                                            </h3>
                                        )
                                    }

                                    <p className="ced-headles-info-text">{product.short_description.slice(3, product.short_description.length - 5)}</p>

                                    <div className="row">
                                        {

                                            product.attributes.length > 0 ? (
                                                <div>
                                                    {/* <h2>Product Attibutes:</h2> */}
                                                    {
                                                        product.attributes.map((attribute) => {
                                                            return (
                                                                <div className="col-lg-4 col-md-4 col-12">
                                                                    <div className="form-group size">
                                                                        <label for="attr">{attribute.name.toUpperCase()}</label>
                                                                        {
                                                                            attribute.options.length > 1 ? (
                                                                                <select name="attr" className="form-control" onChange={(e) => {
                                                                                    console.log(attribute.name, e.target.value);
                                                                                    setAttributes(attribute.name, e.target.value)
                                                                                }
                                                                                }>
                                                                                    <option value="select">Select</option>    {
                                                                                        attribute.options.map((value) => {
                                                                                            return <option value={value} > {value} </ option >
                                                                                        })
                                                                                    }</select>
                                                                            ) : (<h4> {attribute.options[0]} </h4>)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : (<div></div>)
                                        }

                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="form-group quantity">
                                                <label for="quanty">Quantity
                                                    <select className="form-control">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>

                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="ced-headles-bottom-content">
                                        <div className="row align-items-end">

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="ced-headles-button ced-headles-cart-button">
                                                    <button className="ced-headles-btn-wt" onClick={() => {
                                                        let resp = addtocart(product);
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
                                                            setToastMessage("Can't add product to Cart now. Please try again");
                                                        })

                                                    }} >Add to Cart</button>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12"></div>

                                        </div>
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
                    <div className="ced-headles-product-details-info">
                        <div className="ced-headles-single-block">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="ced-headles-info-body">
                                        <h4>Details</h4>
                                        <p>{product.description.slice(3, product.description.length - 5)}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="ced-headles-info-body">
                                        <h4>Specifications</h4>
                                        <ul className="ced-headles-normal-list">
                                            {'weight' in product && product.weight !== '' ? (<li><span>Weight:</span>{product.weight}</li>) : (<></>)}
                                            {'length' in product && product.dimensions.length !== '' ? (<li><span>Length:</span>{product.length}</li>) : (<></>)}
                                            {'width' in product && product.dimensions.width !== '' ? (<li><span>Width:</span>{product.width}</li>) : (<></>)}
                                            {'height' in product && product.dimensions.heigth !== '' ? (<li><span>Height:</span>{product.heigth}</li>) : (<></>)}
                                            {/* { product.brand !== '' ? (<li><span>Brand:</span>{product.brand}</li>) : (<></>)} */}

                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- review section --> */}
                        <ProductReview productId={location.state.product.id} product_rating={location.state.product.average_rating} />

                    </div>
                </div>
            </section>
            {/* // <!-- modal --> */}


        </body >

    )

}

export default SingleProductView;
