import React, { useEffect, useState } from 'react'
import axios from 'axios'


const UserProfile = () => {

    const [userData, setUserData] = useState(null);
    const [editDetails, setEditDetails] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [billing, setBilling] = useState({});
    const [shipping, setShipping] = useState({});

    const user_id = localStorage.getItem('customer_id');

    const getUser = async () => {
        await axios.post('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/getsavedaddress', {
            'customer_id': user_id,
        }, {
            headers: {
                'uid': 'cedcommerce'
            }
        }
        ).then((response) => {
            console.log(response);
            setUserData(true);
            setUserName(response.data.data.user_data.username);
            setFirstName(response.data.data.user_data.first_name);
            setLastName(response.data.data.user_data.last_name);
            setEmail(response.data.data.user_data.email);
            setRole(response.data.data.user_data.role);
            setBilling(response.data.data.user_data.billing);
            setShipping(response.data.data.user_data.shipping);
        }).catch((error) => {
            console.log(error)
            setUserData('Unable to fetch your data now. Please try again later')
        });

    }


    useEffect(() => {
        getUser();
    }, [])

    const saveChanges = async () => {
        
        await axios.post('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/mobiconnect/checkout/saveuseraddress', {
            'customer_id': user_id,
             'first_name': firstName,
             'last_name': lastName,

             'billing_address_1': billing.address_1,
             'billing_address_2': billing.address_2,
             'billing_city': billing.city,
             'billing_state': billing.state,
             'billing_country': billing.country,
             'billing_postcode': billing.postcode,
             'billing_email': billing.email,
             'billing_phone': billing.phone,

             'shipping_address_1': shipping.address_1,
             'shipping_address_2': shipping.address_2,
             'shipping_city': shipping.city,
             'shipping_state': shipping.state,
             'shipping_country': shipping.country,
             'shipping_postcode': shipping.postcode,
             'shipping_email': shipping.email,
             'shipping_phone': shipping.phone,

        }, {
            headers: {
                'uid': 'cedcommerce'
            }
        }
        ).then(() => {

        }).catch(() => {

        })
    }

    console.log(userData)

    const edit = () => {
        console.log("edit")
        setEditDetails(false);
    }

    return (<div>{

        userData === null ? (<div>Wait we are fetching your data</div>) : (

            userData === 'Unable to fetch your data now. Please try again later' ? (<div>
                Unable to fetch your data now. Please try again later
            </div>) : (
                <div>
                    <h2>User Details</h2>
                    <button onClick={() => { edit() }}>Edit</button>

                    <label>User Name<input type="text" value={userName} disabled={true} /></label><br />

                    <label>First Name<input type="text" value={firstName} disabled={editDetails} onChange={(e) => {
                        console.log(e.target.value)
                        setFirstName(e.target.value);
                    }} /></label><br />

                    <label>Last Name<input type="text" value={lastName} disabled={editDetails} onChange={(e) => {
                        setLastName(e.target.value);
                    }} /></label><br />

                    <label>Email<input type="text" value={email} disabled={editDetails} onChange={(e) => {
                        setEmail(e.target.value);
                    }} /></label><br />

                    <label>Role<input type="text" value={role} disabled={true} /></label><br />

                    <h3>Billing Details</h3>

                    <label>Address Line 1<input type="text" value={billing.address_1} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'address_1': e.target.value });
                    }} /></label><br />

                    <label>Address Line 2<input type="text" value={billing.address_2} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'address_2': e.target.value });
                    }} /></label><br />

                    <label>City/Town<input type="text" value={billing.city} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'city': e.target.value });
                    }} /></label><br />

                    <label>State<input type="text" value={billing.state} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'state': e.target.value });
                    }} /></label><br />

                    <label>Country<input type="text" value={billing.country} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'country': e.target.value });
                    }} /></label><br />

                    <label>PostCode/Zip<input type="text" value={billing.postcode} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'postcode': e.target.value });
                    }} /></label><br />

                    <label>Phone<input type="text" value={billing.phone} disabled={editDetails} onChange={(e) => {
                        setBilling({ ...billing, 'phone': e.target.value });
                    }} /></label><br />


                    <h3>Shipping Details</h3>
                  

                    <label>Address Line 1<input type="text" value={shipping.address_1} disabled={editDetails} onChange={(e) => {
                        setShipping({ ...shipping, 'address_1': e.target.value });
                    }} /></label><br />

                    <label>Address Line 2<input type="text" value={shipping.address_2} disabled={editDetails} onChange={(e) => {
                        setShipping({ ...shipping, 'address_2': e.target.value });
                    }} /></label><br />

                    <label>City/Town<input type="text" value={shipping.city} disabled={editDetails} onChange={(e) => {
                        setShipping({ ...shipping, 'city': e.target.value });
                    }} /></label><br />

                    <label>State<input type="text" value={shipping.state} disabled={editDetails} onChange={(e) => {
                        setShipping({ ...shipping, 'state': e.target.value });
                    }} /></label><br />

                    <label>Country<input type="text" value={shipping.country} disabled={editDetails} onChange={(e) => {
                        setShipping({ ...shipping, 'country': e.target.value });
                    }} /></label><br />

                    <label>PostCode/Zip<input type="text" value={shipping.postcode} disabled={editDetails} onChange={(e) => {
                        setShipping({ ...shipping, 'postcode': e.target.value });
                    }} /></label><br />

                    <label>Phone<input type="text" value={shipping.phone} disabled={editDetails} onChange={(e) => {
                                            setShipping({ ...shipping, 'phone': e.target.value });
                                        }} /></label><br />
                    
                    <button onClick={() => {saveChanges()}}>Save Changes</button>

                </div>

            )
        )}

    </div>)

}

export default UserProfile;