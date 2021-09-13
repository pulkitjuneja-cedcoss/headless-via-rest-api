import * as React from "react"
import "../css/index.css"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { StarRating, Modal } from '@cedcommerce/ounce-ui'
// import icon from '../images/icon.png'
import StarRated from '../templates/StarRated';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductReview = (props) => {

    const [singleProductReviews, setSingleProductReviews] = useState()
    const [modal, setModal] = useState(false)
    const [productReview, setProductReview] = useState('');
    const [productReviewerEmail, setProductReviewerEmail] = useState('')
    const [productReviewerName, setProductReviewerName] = useState('')
    const [productRating, setProductRating] = useState(0)
    // const [submitReviewApiCalled, setSubmitReviewApiCalled] = useState(false);
    // const [reviewSubmitted, setReviewSubmitted] = useState(false)
    const [ viewProductRating, setViewProductRating] = useState()

    const submitReview = async () => {
        // setSubmitReviewApiCalled(true)
        axios.post(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/products/reviews?consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314', {
            product_id: props.productId,
            review: productReview,
            reviewer: productReviewerName,
            reviewer_email: productReviewerEmail,
            rating: productRating
        }).then((response) => {
            console.log(response)
            alert('Your Review has been submitted')
        }).catch((error) => {
            console.log(error.message)
            alert(' We are facing some issue while submitting our Review')

        })

    }

    const productReviews = async () => {

        await axios.get(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wp-rest-api/v1/product/reviews/' + props.productId
        ).then((response) => {
            console.log(response)
            let review_array = [];

            if (response.data[1].length > 0) {
                response.data[1].map((review) => {
                    let review_object = { 'email': review.comment_author_email, 'content': review.comment_content, 'date': review.comment_date }
                    // console.log(review_object)
                    review_array.push(review_object)
                    return null
                })
                // console.log(review_array)
                setSingleProductReviews(review_array)
                setViewProductRating(response.data[0])
            }
            else {
                setSingleProductReviews('No Reviews')
            }

        }).catch((error) => {
            console.log(error)

        });

    }

    useEffect(() => {
        productReviews();
    },[])

    const { product_rating } =  props;


    return (
        <div className="row">
            <div className="col-lg-4 col-12">
                <div className="ced-headles-single-block ced-headles-give-review">
                    <h4 className="ced-headles-h4">{ product_rating.slice(0,3) } (Overall)</h4>
                    <ul className="ced-headles-pad">
                        <li>
                            <span>5 stars - { viewProductRating ? viewProductRating['5'] : 0 }</span>
                            <StarRated defaultColor="grey" present={5} size={20} spacing="none" />
                        </li>
                       
                        <li>
                            <span>4 stars - { viewProductRating ? viewProductRating['4'] : 0 }</span>
                            <StarRated defaultColor="grey" present={4} size={20} spacing="none" />
                           
                        </li>
                        <li>
                            <span>3 stars - { viewProductRating ? viewProductRating['3'] : 0 }</span>
                            <StarRated defaultColor="grey" present={2} size={20} spacing="none" />
                            
                        </li>
                        <li>
                            <span>2 stars - { viewProductRating ? viewProductRating['2'] : 0 }</span>
                            <StarRated defaultColor="grey" present={2} size={20} spacing="none" />
                        </li>
                        <li>
                            <span>1 star - { viewProductRating ? viewProductRating['1'] : 0 }</span>
                            <StarRated defaultColor="grey" present={1} size={20} spacing="none" />
                        </li>
                    </ul>
                    <button type="button" className="btn ced-headles-review-btn" onClick={() => { setModal(true) }}>
                        Leave a Review
                    </button>

                </div>
            </div>
            <div className="col-lg-8 col-12">
                <div className="ced-headles-single-block">
                    <div className="ced-headles-reviews">

                        <Modal
                            open={modal}
                            heading="Leave a Review"
                            secondaryAction={{ content: "Close", thickness: "thin", onAction: () => { setModal(false) } }}
                            close={() => { setModal(false) }}
                        >

                            <div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label for="review-name" className="ced-headles-review-label">Your Name
                                                  <input className="form-control ced-headles-review-form" type="text" id="review-name" required onChange={(e) => setProductReviewerName(e.target.value)} />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label for="review-email" className="ced-headles-review-label">Your Email
                                                   <input className="form-control ced-headles-review-form" type="email" id="review-email" required onChange={(e) => setProductReviewerEmail(e.target.value)} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label for="review-subject" className="ced-headles-review-label">Subject
                                                   <input className="form-control ced-headles-review-form" type="text" id="review-subject" required />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label for="review-rating" className="ced-headles-review-label" >Rating 
                                                    <StarRating defaultColor="grey" present={productRating} size={25} maximum={5} onClick={(present) => { console.log(present); setProductRating(present) }} spacing="none" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="review-message" className="ced-headles-review-label" >Review
                                           <textarea className="form-control ced-headles-review-form" id="review-message" rows="8" required onChange={(e)=>{setProductReview(e.target.value)}}></textarea>
                                        </label>
                                    </div>
                                </div>
                                {/* className="modal-footer button" */}
                                <div >
                                    <button type="ced-headles-button" className="ced-headles-btn-blue" onClick={() => { setModal(false); submitReview() }}>Submit Review</button>
                                </div>
                            </div>



                        </Modal>

                        <h4 className="ced-headles-title">Latest Reviews</h4>
                        {
                            console.log(singleProductReviews)
                        }



                        {
                            Array.isArray(singleProductReviews) && singleProductReviews.length > 0 ? (
                                singleProductReviews.map((review) => {

                                    return (

                                        <div className="ced-headles-single-review">
                                            <img src="https://demo.graygrids.com/themes/shopgrids/assets/images/blog/comment1.jpg" alt="img" />
                                            <div className="ced-headles-review-info">
                                                <h4 className="ced-headles-h4">{review.email}
                                                    <span>
                                                    </span>
                                                </h4>
                                                <ul className="ced-headles-stars">
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                </ul>
                                                <p>{review.content}</p>
                                            </div>
                                        </div>

                                        // <div className="parent_review">
                                        //     <img src={icon} alt='product_review' />
                                        //     <p>{ review.content}</p>
                                        // </div>
                                    )

                                })
                            ) : (<h3>{singleProductReviews}</h3>)


                        }


                    </div>
                </div>
            </div>

        </div >

    )
}

export default ProductReview;