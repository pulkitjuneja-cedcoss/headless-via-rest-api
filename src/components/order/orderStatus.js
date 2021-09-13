import axios from 'axios';

export const updateStatus = (order_id) => {

    const data = {
        status: "completed"
      };

    const order = axios.put('https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/orders/' + order_id + '?consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314', data  )

    return order;

}