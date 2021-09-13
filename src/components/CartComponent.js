import React from 'react'


const CartComponent = ({ChildData}) => {


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
                            </div>{ChildData}
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default CartComponent;