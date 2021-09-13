import React  from 'react';
import "../css/index.css"
import ProductCard from '../templates/ProductCard';
// import { Link } from 'gatsby';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, RangeSlider } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import 'font-awesome/css/font-awesome.min.css';
import TopFilter from '../templates/TopFilter.js'
import AllCategories from '../templates/AllCategories.js'
// import Header from '../templates/Header.js'
import axios from 'axios';
// import Footer from '../templates/Footer.js'
// import addtocart from '../components/addtocart'
import PriceFilter from '../templates/PriceFilter'


//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
const Shop = () => {

  const [filterByName, setFilterByName] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  // const [ limit, setLimit ] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const [urlParams, setUrlParams] = useState({});
  const [event, setEvent] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500)
  const [tempMinVal, setTempMinVal] = useState(0);
  const [tempMaxVal, setTempMaxVal] = useState(500);


  const fetchData = async () => {

    // console.log(urlParams);
    console.log(minPrice, maxPrice);

    let urlString2 = '';
    let urlString1 = 'per_page=5&page=' + pageNumber + '&';
    let priceString = 'min_price=' + minPrice + '&max_price=' + maxPrice;

    Object.keys(urlParams).map((parameter) => {
      if (urlParams[parameter] !== '') {
        urlString2 = urlString2 + parameter + '=' + urlParams[parameter] + '&';
      }

      return null
    })
    // console.log(urlString);

    setIsLoadingMore(true);

    // await axios.get( 
    //   process.env.REACT_APP_WORDPRESS_STORE_URL + '/wp-json/wc/v3/products?per_page=' + limit + '&page=' + pageNumber 
    // + '?consumer_key=' + process.env.REACT_APP_WC_CONSUMER_KEY + '&consumer_secret=' + process.env.REACT_APP_WC_CONSUMER_SECRET
    // ).then( ( response ) => {
    //   console.log( response );
    // }).then( ( error ) => {
    //   console.log(error)
    // })


    await axios.get(
      'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/products?' + urlString1 + urlString2 + priceString + '&consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
    ).then((response) => {

      setProducts(response.data);
      setTotalPages(parseInt(response.headers['x-wp-totalpages']));

    }).catch((error) => {
      console.log(error)
    })

    setIsLoadingMore(false);

  }


  const SearchByName = () => {
    console.log("filterByName", filterByName);
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


  const handleCallback = (childData) => {
    console.log("parentcall", childData);
    urlParams[childData[0]] = childData[1];
    console.log(urlParams);
    setPageNumber(1);
    setUrlParams(urlParams);
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

  const priceCallback = (data) => {
    console.log(data);
    let price_array = data.split('-');
    let min_val = parseInt(price_array[0]);
    let max_val = parseInt(price_array[1])
    setMinPrice(min_val);
    setMaxPrice(max_val);
    setPageNumber(1);
    setEvent(!event);

  }

  const ResetPriceFilter = () => {
    setMinPrice(0);
    setMaxPrice(500);
  }

  // useEffect(() => {
  //   // console.log(urlParams);
  //   fetchData();
  // }, [event])

  // useEffect(() => {
  //   fetchData();
  // }, [pageNumber])

  // useEffect(() => {
  //   fetchData();
  // }, [minPrice, maxPrice])

    useEffect(() => {
    // console.log(urlParams);
    fetchData();
  }, [event,pageNumber,minPrice,maxPrice])



  if (isLoadingMore) {
    return <Spinner />
  }
  else {
    return (

      <body className="ced-headles-body">
        <section className="ced-headles-product-grids ced-headles-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-12">
                <div className="ced-headles-product-sidebar">
                  <div className="ced-headles-single-widget search">
                    <h3>Search Product</h3>
                    <form>
                      <label>
                        <input type="text" placeholder="Search Here By name..." value={filterByName} onChange={(e) => { setFilterByName(e.target.value) }} />
                        <button type="submit"><i className="fa fa-search">{''}</i></button>
                      </label>

                    </form>
                    {/* <Button icon={filterIcon} type="Plain" onClick={()=>{return null}}/> */}
                    <button className="ced-headles-btn-search" onClick={() => { SearchByName() }} >Search</button>
                    <button className="ced-headles-btn-reset" onClick={() => { ResetNameFilter() }} >Reset </button>

                  </div>

                  <AllCategories />


                  <div className="ced-headles-single-widget range">
                    <h3>Price Range</h3>

                    <RangeSlider alignment="center" minValue={minPrice} maxValue={maxPrice} onChange={(minVal, maxVal) => { console.log(minVal, maxVal); setPriceRange(minVal, maxVal) }} />

                    <div className="range-inner">

                      {/* <label>$0</label>
                      <label>$100</label> */}

                    </div>
                    <button className="ced-headles-btn-search" onClick={() => { setPriceRangeFilter(); }}>Search</button>
                    <button className="ced-headles-btn-reset" onClick={() => { ResetPriceFilter() }} >Reset</button>
                  </div>

                  <PriceFilter callback={priceCallback} range={{ min_val: minPrice, max_val: maxPrice }} />

                  <div className="ced-headles-single-widget condition">
                    <h3>Filter by Brand</h3>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault11">
                        <input className="form-check-input" type="checkbox" value="" />
                        Apple (254)
                      </label>
                    </div>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault22">
                        <input className="form-check-input" type="checkbox" value="" />
                        Bosh (39)
                      </label>
                    </div>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault33">
                        <input className="form-check-input" type="checkbox" value="" />
                        Canon Inc. (128)
                      </label>
                    </div>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault44">
                        <input className="form-check-input" type="checkbox" value="" />
                        Dell (310)
                      </label>
                    </div>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault55">
                        <input className="form-check-input" type="checkbox" value="" />
                        Hewlett-Packard (42)
                      </label>
                    </div>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault66">
                        <input className="form-check-input" type="checkbox" value="" />
                        Hitachi (217)
                      </label>
                    </div>
                    <div className="form-check">

                      <label className="form-check-label" for="flexCheckDefault77">
                        <input className="form-check-input" type="checkbox" value="" />
                        LG Electronics (310)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end sidebar --> */}



              <div className="col-lg-9 col-12">
                <div className="ced-headles-product-grids-head">


                  <TopFilter callback={handleCallback} params={urlParams} />

                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-grid" role="tabpanel" aria-labelledby="nav-grid-tab">
                      <div className="row">
                        {
                          products.length > 0 ? (

                            products.map((product) => {
                              return (<ProductCard data={product} />)
                              // console.log(product)
                            })

                          ) : (<h3>Unable to fetch Products. Please Wait!!!... or Try again later</h3>)
                        }
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="ced-headles-pagination center">
                            <div className="ced-headles-pagination-list">
                              <button className="ced-headles-prev-next-btn" onClick={() => {

                                if (pageNumber > 1) {
                                  console.log("prevoius page data");
                                  let currentPage = pageNumber - 1;
                                  setPageNumber(currentPage);
                                }
                              }}><i className="fa fa-angle-left" >{''}</i></button>
                              <li> {pageNumber} </li>
                              {/* <li> 1 </li> */}

                              <button className="ced-headles-prev-next-btn" onClick={() => {
                                if (totalPages > pageNumber) {
                                  // setIsLoadingMore(true);
                                  let currentPage = pageNumber + 1;
                                  setPageNumber(currentPage);
                                  //setIsLoadingMore(false);
                                }
                              }}><i className="fa fa-angle-right">{''}</i></button>


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


export default Shop;





