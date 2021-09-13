import { home, bag, box, note  } from '@cedcommerce/ounce-ui';

export const Menu = [
    {
        id: "login",
        content: "Login",
        path: "/login",
        icon : home
    },
    {
        id: "signup",
        content: "Signup",
        path: "/signup",
        icon : box
    },
    {
        id: "user-details",
        content: "User Details",
        path: "/userDetails",
        icon : note
    },
    {
        id: "cart",
        content: "Cart",
        path: "/cart",
        icon : bag
    },
    {
        id: "order_status",
        content: "Order Status",
        path: "/orderStatus",
        icon : bag
    },

];