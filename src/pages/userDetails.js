import React from 'react';
 import { useEffect } from 'react'
// import  { Spinner, Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
// import { navigate } from 'gatsby'
import Header from '../templates/Header'
// const axios = require('axios').default


const  UserDetails = () => {

    // const fetData = async () => {

    // }
    useEffect( () => {
           console.log("useeehk")
    }, [] )

    return (
        <div>
            <Header />
            <p>i am from user details</p>
        </div>
    )

}

export default UserDetails;