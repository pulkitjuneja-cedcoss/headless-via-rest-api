import * as React from "react"
import "../css/index.css"
import { Link } from 'gatsby'


const PriceFilter = (props) => {

    console.log(props.range, "propssssss")
    
    return (
        <div className="ced-headles-single-widget condition">
        <h3>Filter by Price</h3>
        <div className="ced-headles-form-check">
          <Link to="/productByPrice" state={{'range':'0-20'}}>$0 - $20 </Link>
        </div>
        <div className="ced-headles-form-check">
          <Link to="/productByPrice" state={{'range':'21-40'}}>$21 - $40 </Link>
        </div>
        <div className="ced-headles-form-check">
          <Link to="/productByPrice" state={{'range':'41-60'}}>$41 - $60 </Link>
        </div>
        <div className="ced-headles-form-check">
          <Link to="/productByPrice" state={{'range':'61-80'}}>$61 - $80 </Link>
            

        </div>

      </div>
    )
}

export default React.memo(PriceFilter);