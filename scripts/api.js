'use strict';
//helper functions goes here
const api = (function(){
  //// function here calls the api server
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/mohammad_khan/';
	
  function get_bookmarks(){
    // get the bookmarks and return. NO DOM manipulation here
    return fetch (`${baseUrl}bookmarks`);
  }

  function add_bookmarks(title, url, desc, rating){
    //making a request body so we can call the api
    const body = JSON.stringify({ //create ajax object using the input value that user wil be providing us with, and convert into JSON string
      title: title,
      url: url,
      desc: desc,
      rating: rating,
    });
    
    return fetch(`${baseUrl}bookmarks`, { // provide paramters with POST request 
      method: 'POST', // in this request, the method type, headers & body (user inputs)
      headers: new Headers ({
        'Content-Type': 'application/json', // to make sure that the information we get back is of content type JSON
      }),
      body:body,
    });	
  }

  function delete_bookmark (id){
    return fetch(`${baseUrl}bookmarks/${id}`, {
      method: 'DELETE', // fetch function defaults to GET method, so we need to provide what method type
    });
  }

  function update_bookmark(id, updateData){
    return fetch(`${baseUrl}/bookmarks/${id}`,{
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(updateData)
    });
  }

  return {
    get_bookmarks,
    add_bookmarks,
    delete_bookmark,
    update_bookmark,
  };

}()); // this means function gets invoked immediately