import * as React from "react"
import { useState, useEffect } from 'react'
import { Link } from "gatsby"
import "../css/index.css"
import axios from 'axios'

const Header = () => {
    const [menu, setMenu] = useState([]);

    const fetchData = async () => {
        await axios.get(
            'http://localhost/web4/wordpress/wp-json/wp-rest-api/v1/menu/78'
        ).then(response => {
            let menu_array = [];
            response.data.map((page) => {
                // console.log(page);
                let arr = page.url.split('/')
                let slug = "/" + arr[5];
                let menu_object = { 'slug': slug, 'title': page.title, 'page_id': page.object_id };
                menu_array.push(menu_object);
                // console.log(menu_array)
                // return <Link to={slug} >{page.post_title}</Link>
                return null
            })
            setMenu(menu_array);

        }).then((error) => {
            console.log(error)
        });

    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>

            <div className="navbar">
                {
                    menu.map((nav) => {
                        console.log(nav)
                        return <Link to={nav.slug} state={{ pageId: nav.page_id }}>{nav.title}</Link>
                    })
                }
                <Link to="/shop">Shop</Link>

                {/* {
                localStorage.getItem('user')  ?   <Link to="/signout">Sign Out</Link> :  <Link to="/signup">Sign In</Link>
            } */}

            </div>
        </div>
    )
}

export default Header;