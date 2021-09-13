
const path = require('path');
const axios = require('axios').default


exports.createPages = async ({ actions }) => {

  const { createPage } = actions;
  const menuPage = path.resolve('./src/templates/MenuPage.js');
 
  // Fetch your items (blog posts, categories, etc).
  
    try {
        const response =  await axios.get('http://localhost/web4/wordpress/wp-json/wp-rest-api/v1/menu/78'); 
        console.log(response.data);
        response.data.map( (node) => {
            console.log(node.title)
            const page_url = node.url;
            console.log(node.url);
            const path_slug = page_url.split("/");
            console.log(path_slug);
            const path = "/" + path_slug[5] ;
            const page_name = path_slug[5];
            // console.log(menuSlug);
            const id = node.ID;
            console.log(id);

            createPage({
                      path,
                      component: menuPage,
                      context: {
                        /*
                        the value passed in the context will be available for you to use in your page queries as a GraphQL variable, as per the template snippet */
                        pathSlug: path,
                        page_id: id,
                        page_name: page_name, 
                      },
                    });
        })
    } catch (error) {
        console.log("error",error);
        
    }
 

};
  