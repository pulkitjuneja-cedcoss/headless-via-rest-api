
import axios from 'axios';

export const registerCard = (props) => {

    console.log("data", props);
    console.log( "rfers",props.addressParams);
    const { cardData } = props;
   
    const cardParams = new URLSearchParams()

    const card_number = cardData.cardNumber.replace(' ','');
    cardParams.append('card[number]', card_number)
    cardParams.append('card[exp_month]', cardData.expMonth)
    cardParams.append('card[exp_year]', cardData.expYear)
    cardParams.append('card[cvc]', cardData.cvc)

     
    const result = axios.post('https://api.stripe.com/v1/tokens', cardParams, {
        headers: {
            'Authorization': `Bearer sk_test_51JQ5CVSC2zQiWX5zIjsjYezghz4De6RFR5LSG5jLnHqr4H4EIhrPB28e3k4Ou5KEI2b6bbdZshndkboBgy6pzCWr00bfERyAUf`
        }
    })

    return result;

}

export  const registerCustomer = (data) => {

    console.log(data);
    const billing = data.addressParams.billing;
    const shipping = data.addressParams.shipping;
   

    const customerParams = new URLSearchParams()
    
    customerParams.append('address[line1]', billing.address_1)
    customerParams.append('address[line2]', billing.address_2)
    customerParams.append('address[postal_code]', billing.postcode)
    customerParams.append('address[city]', billing.city)
    customerParams.append('address[state]', billing.state)
    customerParams.append('address[country]', billing.country)
    customerParams.append('email', billing.email)
    customerParams.append('phone', billing.phone)
    customerParams.append('source', data.response.data.id)

    const result = axios.post('https://api.stripe.com/v1/customers', customerParams, {
        headers: {
            'Authorization': `Bearer sk_test_51JQ5CVSC2zQiWX5zIjsjYezghz4De6RFR5LSG5jLnHqr4H4EIhrPB28e3k4Ou5KEI2b6bbdZshndkboBgy6pzCWr00bfERyAUf`
        }
    })
    
    return result;
}




export const  makePayment = (data) => {

    console.log(data)
    const  checkoutPricingTable  = data.checkoutPricingTable.data;
    const paymentParams = new URLSearchParams()
    paymentParams.append('amount', parseInt('55.00') )
    paymentParams.append('description', 'for Orders')
    paymentParams.append('currency', 'inr' )
    paymentParams.append('customer', data.response.data.id )
    // paymentParams.append('customer_name', 'pulkit' )
    // paymentParams.append('address[line1]', '124a')
    // paymentParams.append('address[line2]', '' )
    // paymentParams.append('address[country]', 'india' )
    // paymentParams.append('address[city]', "kanpur" )
    // paymentParams.append('address[state]','up' )
    // paymentParams.append('address[postcode]', '909090' )

    const result = axios.post('https://api.stripe.com/v1/charges', paymentParams, {
        headers: {
            'Authorization': `Bearer sk_test_51JQ5CVSC2zQiWX5zIjsjYezghz4De6RFR5LSG5jLnHqr4H4EIhrPB28e3k4Ou5KEI2b6bbdZshndkboBgy6pzCWr00bfERyAUf`
        }
    })
    return result;

}

   



