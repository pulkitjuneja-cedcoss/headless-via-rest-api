import React from 'react'
import  { Button } from '@cedcommerce/ounce-ui'
import { navigate } from 'gatsby';

const Signout = () => {

    return(
        <div>
            Do you want to logout? <Button onClick = { () => {
                localStorage.removeItem('user');
                navigate("/login");

            } } >Click Here</Button>
        </div>
    )

}

export default Signout;