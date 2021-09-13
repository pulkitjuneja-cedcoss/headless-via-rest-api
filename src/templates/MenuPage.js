import React from 'react';
import { useEffect,useState } from 'react';
const axios = require('axios').default

const MenuPage = ({location}) => {
  console.log(location.state)
  
  const [ pageTitle, setPageTitle ] = useState('');
  const [ pageContent, setPageContent ] = useState('');
  const [ pageFeaturedImage, setPageFeaturedImage ] = useState('');

  const fetchData = async () => {

    await axios.get(
      'http://localhost/web4/wordpress/wp-json/wp-rest-api/v1/menu-by-id/' + location.state.pageId 
    ).then( (response) => {
      console.log(response);
      console.log(response.data);
      setPageTitle(response.data[0].post_title);
      setPageContent(response.data[0].post_content);
      setPageFeaturedImage(response.data[1]);

    }).then( (error) => {
      console.log(error);
    })

  }

  useEffect( fetchData(),[])
 // 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
 
  return (
    <div>
      <div className="post-wrapper">
        
        <h1> i am from { pageTitle } page</h1>
        <img src={ pageFeaturedImage } alt="page Image" width="800px" height="400px" />
        <div>
          <p>{pageContent}</p>
        </div>

      </div>
      <div><p>hi, I am from menu page</p></div>
    </div>
  );
};

export default MenuPage



  


