import React from 'react';
import "../css/index.css"
import ProductCard from '../templates/ProductCard';
import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, RangeSlider } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import 'font-awesome/css/font-awesome.min.css';
import TopFilter from '../templates/TopFilter.js'
// import AllCategories from '../templates/AllCategories.js'
// import Header from '../templates/Header.js'
import axios from 'axios';
import PriceFilter from '../templates/PriceFilter'
// import Footer from '../templates/Footer.js'

const ProductCategories = ({ location }) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [event, setEvent] = useState(false);
    const [urlParams, setUrlParams] = useState({});
    const [ filterByName, setFilterByName] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500)
    const [tempMinVal, setTempMinVal] = useState(0);
    const [tempMaxVal, setTempMaxVal] = useState(500);

    const { category_id } = location.state;

    const fetchProductByCategory = async () => {
        // console.log(pageNumber);

        let urlString1 = 'per_page=2&page=' + pageNumber + '&' ;
        let urlString2 = '';
        let priceString = 'min_price=' + minPrice + '&max_price=' + maxPrice;
        // console.log("urlpaams",urlParams)

        Object.keys(urlParams).map( (parameter) => {
          if( urlParams[parameter] !== '' ){
            urlString2 = urlString2 + parameter + '=' + urlParams[parameter] + '&';
          }
    
          return null
        })
    
        setIsLoadingMore(true);

        await axios.get(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/products?'+ urlString1 + urlString2 + priceString + 'category=' + category_id + '&consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'

        ).then((response) => {

            setProducts(response.data);
            setTotalPages(parseInt(response.headers['x-wp-totalpages']));

        }).catch((error) => {
            console.log(error)
        })

        setIsLoadingMore(false);

    }

    const handleCallback = useCallback( ( childData ) => {
        console.log("parentcall",childData);
        urlParams[childData[0]] = childData[1];
        console.log(urlParams);
        setPageNumber(1);
        setUrlParams(urlParams);
        setEvent(!event);
    
    },[urlParams]
    )

    const SearchByName = () => {
        console.log("filterByName",filterByName);
        urlParams['search'] = filterByName;
        setPageNumber(1);
        setUrlParams(urlParams);
        setEvent(!event);
    }
    
    const ResetNameFilter = () => {
        urlParams['search'] = '';
        setPageNumber(1);
        setUrlParams(urlParams);
        setFilterByName('')
        setEvent(!event);
    
    }

    const setPriceRange = (min, max) => {
        console.log(min, max)
        setTempMaxVal(max);
        setTempMinVal(min);
    
      }
    
      const setPriceRangeFilter = () => {
        console.log(tempMaxVal, "minVal", tempMaxVal, "max")
        setMinPrice(tempMinVal);
        setMaxPrice(tempMaxVal);
    
      }

      const ResetPriceFilter = () => {
        setMinPrice(0);
        setMaxPrice(500);
      }

      useEffect( () => {
        console.log(urlParams);
        fetchProductByCategory();
      },[event,location,pageNumber,minPrice, maxPrice])


    // useEffect( () => {
    //     console.log(urlParams);
    //     fetchProductByCategory();
    //   },[event])
    
    // useEffect(() => {
    //     fetchProductByCategory();
    // }, [location])

    // useEffect(() => {
    //     console.log(pageNumber,'useEffecttttttt')
    //     fetchProductByCategory();
    // }, [pageNumber])


    if (isLoadingMore) {
        return <Spinner />
    }
    else {
        return (
            <body class="ced-headles-body">
                <section class="ced-headles-product-grids ced-headles-section">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-12">
                                <div class="ced-headles-product-sidebar">
                                    <div class="ced-headles-single-widget search">
                                        <h3>Search Product</h3>
                                        <form>
                                            <label>
                                              <input type="text" placeholder="Search Here By name..." value = {filterByName} onChange = { (e) => { setFilterByName(e.target.value) } } />
                                              <button type="button"><i class="fa fa-search">{''}</i></button>
                                            </label>
                                            
                                           
                                        </form>
                                        <button class="ced-headles-btn-search" onClick = { () => { SearchByName() } } >Search</button>
                                        <button class="ced-headles-btn-reset" onClick = { () => { ResetNameFilter() } } >Reset </button>
                    

                                    </div>


                                    <div class="ced-headles-single-widget range">
                                        <h3>Price Range</h3>
                                        <RangeSlider alignment="center" minValue={minPrice} maxValue={maxPrice} onChange={(minVal, maxVal) => { console.log(minVal, maxVal); setPriceRange(minVal, maxVal) }} />
 
                                        <div class="range-inner">
                                           
                                        </div>
                                        <button class="ced-headles-btn-search" onClick={() => { setPriceRangeFilter(); }}>Search</button>
                                        <button class="ced-headles-btn-reset" onClick={() => { ResetPriceFilter() }} >Reset</button>
                
                                    </div>
                                
                                    <PriceFilter />
                                   
                                </div>
                            </div>
                            {/* <!-- end sidebar --> */}



                            <div class="col-lg-9 col-12">
                                <div class="ced-headles-product-grids-head">


                                    <TopFilter  callback = {handleCallback} params = {urlParams} />

                                    <div class="tab-content" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="nav-grid" role="tabpanel" aria-labelledby="nav-grid-tab">
                                            <div class="row">
                                                {
                                                    products.length > 0 ? (

                                                        products.map((product) => {
                                                            return (<ProductCard data={product} />)
                                                            // console.log(product)
                                                        })

                                                    ) : (<h3>Unable to fetch Products. Please Wait!!!... or Try again later</h3>)
                                                }
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="ced-headles-pagination center">
                                                        <div class="ced-headles-pagination-list">
                                                            <button class= "ced-headles-prev-next-btn" onClick={() => {
                                                               console.log(pageNumber)
                                                                if (pageNumber > 1) {
                                                                    console.log("prevoius page data");
                                                                    let currentPage = pageNumber - 1;
                                                                    setPageNumber(currentPage);
                                                                }
                                                            }}><i class="fa fa-angle-left" >{''}</i></button>
                                                            <li> {pageNumber} </li>


                                                            <button class= "ced-headles-prev-next-btn" onClick={() => {
                                                                console.log(totalPages)
                                                                if (totalPages > pageNumber) {
                                                                    // setIsLoadingMore(true);
                                                                    let currentPage = pageNumber + 1;
                                                                    setPageNumber(currentPage);
                                                                    //setIsLoadingMore(false);
                                                                }
                                                            }}><i class="fa fa-angle-right" >{''}</i></button>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </body>
        )
    }

}
export default ProductCategories;