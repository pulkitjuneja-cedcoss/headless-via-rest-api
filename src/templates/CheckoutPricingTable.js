import * as React from "react"
import "../css/index.css"

const CheckoutPricingTable = (props) => {
    console.log(props);


    return (
        <div className="col-lg-4">
            <div className="ced-headles-checkout-sidebar">
                <div className="ced-headles-checkout-sidebar-price-table ">
                    <h5 className="ced-headles-title">Pricing Table</h5>
                    <div className="ced-headles-sub-total-price">
                        <div className="ced-headles-total-price">
                            <p className="value">Subotal Price:</p>
                            <p className="price">{ props.data.data.currency_symbol }{ props.data.data.cart_subtotal }</p>
                        </div>
                        <div className="ced-headles-total-price shipping">
                            <p className="value">Shipping Cost:</p>
                            <p className="price">{ props.data.data.currency_symbol }{ props.data.data.shipping_total }</p>
                        </div>
                        <div className="ced-headles-total-price discount">
                            <p className="value">Discount:</p>
                            <p className="price">{ props.data.data.currency_symbol }{ props.data.data.discount_amount }</p>
                        </div>
                        {/* <div className="ced-headles-total-price discount">
                            <p className="value">Coupon Applied:</p>
                            <p className="price">$10.00</p>
                        </div> */}
                    </div>
                    <div className="ced-headles-total-payable">
                        <div className="ced-headles-payable-price">
                            <p className="value">Total Price to be paid:</p>
                            <p className="price">{ props.data.data.currency_symbol }{ props.data.data.cart_total }</p>
                        </div>
                    </div>
                    {/* <div className="ced-headles-price-table-btn ced-headles-button">
                        <a href="/cheeckout" className="ced-headles-btn ced-headles-btn-alt">Checkout</a>
                    </div> */}
                </div>

            </div>
        </div>

    )

}

export default React.memo(CheckoutPricingTable);