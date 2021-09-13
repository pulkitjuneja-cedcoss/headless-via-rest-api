import React from 'react';
import "../css/index.css"
import '@cedcommerce/ounce-ui/dist/index.css'


const TopFilter = (props) => {
    console.log(props);

    const filterProducts = (filterValue) => {
        props.callback(filterValue)
        console.log(filterValue);
    }

    const orderby_value = props.params.orderby ?  props.params.orderby : '';
    const order_value =  props.params.order ?    props.params.order : '';

    return (
        <div className="ced-headles-product-grid-topbar">
            <div className="row align-items-center">
                <div className="col-lg-7 col-md-8 col-12">
                    <div className="ced-headles-product-sorting">
                        <label for="sorting">Sort by:
                            <select className="form-control" value = {orderby_value} onChange={(e) => { filterProducts(["orderby",e.target.value]) } }>
                                <option value="" >Select</option>
                                <option value="date" >Date</option>
                                <option value="id" >Id</option>
                                <option value="title" >Title</option>
                                <option value="slug" > Slug</option>
                                <option value="popularity" >Popularity</option>
                                <option value="rating" >Rating</option>
                            </select>
                        </label>
                        
                        <label for="sorting">Order:
                            <select className="form-control" value = {order_value} onChange={(e) => { filterProducts(['order',e.target.value]) } } >
                                <option value="" >Select</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                                {/* <option>High - Low Price</option>
                                    <option>Average Rating</option>
                                    <option>A - Z Order</option>
                                    <option>Z - A Order</option> */}
                            </select>
                        </label>
                        

                        <h3 className="ced-headles-total-show-product">Showing: <span>1 - 12 items</span></h3>
                    </div>
                </div>
                {/* <div class="col-lg-5 col-md-4 col-12">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-grid-tab" data-bs-toggle="tab" data-bs-target="#nav-grid" type="button" role="tab" aria-controls="nav-grid" aria-selected="true"><i class="fa fa-th"></i></button>

                        </div>
                    </nav>
                </div> */}
            </div>
        </div>
    )

}

export default TopFilter;