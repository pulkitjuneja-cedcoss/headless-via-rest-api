import React from 'react';
import "../css/index.css"
import ProductCard from '../templates/ProductCard';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import 'font-awesome/css/font-awesome.min.css';
import TopFilter from '../templates/TopFilter.js'
import AllCategories from '../templates/AllCategories.js'
// import Header from '../templates/Header.js'
import axios from 'axios';
// import Footer from '../templates/Footer.js'


const ProductByPrice = ({location}) => {
    
  const [ filterByName, setFilterByName] = useState("");
  const [ products, setProducts ] = useState([]);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ pageNumber, setPageNumber ] = useState(1);
  // const [ limit, setLimit ] = useState(2);
  const [ totalPages, setTotalPages ] = useState();
  const [ urlParams, setUrlParams ] = useState( {} );
  const [ event, setEvent ] = useState(false);
//   const [ minPrice, setMinPrice ] = useState(0);
//   const [ maxPrice, setMaxPrice ] = useState(500)
 
  const fetchData = async () => {

    // console.log(urlParams);
    console.log(location.state.range);

    let urlString2 = '';
    let urlString1 = 'per_page=5&page=' + pageNumber + '&' ;
    let range_array = location.state.range.split('-');
    let priceString = 'min_price=' + parseInt(range_array[0]) + '&max_price=' + parseInt(range_array[1]) ;

    Object.keys(urlParams).map( (parameter) => {
      if( urlParams[parameter] !== '' ){
        urlString2 = urlString2 + parameter + '=' + urlParams[parameter] + '&';
      }

      return null
    })
    // console.log(urlString);

    setIsLoadingMore(true);

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


  const handleCallback = ( childData ) => {
    console.log("parentcall",childData);
    urlParams[childData[0]] = childData[1];
    console.log(urlParams);
    setPageNumber(1);
    setUrlParams(urlParams);
    setEvent(!event);

  }

//   useEffect( () => {
//     fetchData();
//   }, [minPrice,maxPrice])

//   useEffect(() => {
//     fetchData();
//   }, [pageNumber])

//   useEffect( () => {
//     // console.log(urlParams);
//     fetchData();
//   },[event])


  useEffect( () => {
    fetchData();
  }, [event,pageNumber])


  if (isLoadingMore) {
    return <Spinner />
  }
  else{  
    return(
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
                         <button type="submit"><i class="fa fa-search">{''}</i></button>
                      </label> 
                     
                    </form>  
                      {/* <Button icon={filterIcon} type="Plain" onClick={()=>{return null}}/> */}
                      <button class="ced-headles-btn-search" onClick = { () => { SearchByName() } } >Search</button>
                      <button class="ced-headles-btn-reset" onClick = { () => { ResetNameFilter() } } >Reset </button>
                    
                  </div>

                  <AllCategories />
               
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
                            
                          ) : ( <h3>Unable to fetch Products. Please Wait!!!... or Try again later</h3>)
                        }
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <div class="ced-headles-pagination center">
                            <div class="ced-headles-pagination-list">
                              <button class="ced-headles-prev-next-btn" onClick={() => {

                                if (pageNumber > 1) {
                                  console.log("prevoius page data");
                                  let currentPage = pageNumber - 1;
                                  setPageNumber(currentPage);
                                }
                              }}><i class="fa fa-angle-left" >{''}</i></button> 

                              <li> {pageNumber} </li>
                              
                              <button class= "ced-headles-prev-next-btn" onClick={() => {
                                if (totalPages > pageNumber) {
                                  // setIsLoadingMore(true);
                                  let currentPage = pageNumber + 1;
                                  setPageNumber(currentPage);
                                  //setIsLoadingMore(false);
                                }
                              }}><i class="fa fa-angle-right">{''}</i></button>


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


export default ProductByPrice;