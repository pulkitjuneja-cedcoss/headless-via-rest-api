import React, { useEffect, useState } from 'react';
import "../css/index.css"
import '@cedcommerce/ounce-ui/dist/index.css'
import axios from 'axios';
import { Link } from 'gatsby'

const AllCategories = () => {
    const [ productCategories, setProductCategories ] = useState([]);

    const fetchAllCategories = async () => {
        await axios.get(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless//wp-json/wc/v3/products/categories?consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
            ).then( (response) => {
                // console.log(response)
                let category_array = [];
                response.data.map( (category) => {
                    let category_obj = { 'name': category.name, 'count': category.count, 'id': category.id };
                    category_array.push(category_obj)

                    return null
                })
                setProductCategories(category_array);

            }).catch( (error) => {
                console.log(error)
               // setProductCategories('Unable to fetch Product Categories right now')
            })

    }

    useEffect( () => {
        fetchAllCategories();
    },[])

    return(
        <div className="ced-headles-single-widget">
                    <h3>All Categories</h3>
                    <ul className="ced-headles-ul list">
                        {/* {console.log(productCategories)} */}
                        {
                           productCategories.length > 0 ? ( 
                                productCategories.map( (cat) => {
                                    return (
                                        <li className="ced-headles-li" >
                                            <Link to='/productCategories' state={{category_name: cat.name, category_id: cat.id }} >{cat.name.toUpperCase()} ({cat.count})</Link>
                                   
                                        </li>
                                         )
                                })
                           ) : (<div>Unable to fetch Product Categories right now</div>)
                        }
                      
                    </ul>
                  </div>
                 
    )

}

export default React.memo(AllCategories)