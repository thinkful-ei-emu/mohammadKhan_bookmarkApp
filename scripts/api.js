'use strict';
//helper functions goes here
const api = (function(){
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/mohammad_khan/';
	
  function get_bookmarks(){
    return fetch (`${baseUrl}bookmarks`);
  }

  function add_bookmarks(title, url, description, rating){
    //create request body
    const body = JSON.stringify({
      title: title,
      url: url,
      description: description,
      rating: rating,
    });
    
    return fetch(`${baseUrl}bookmarks`, {
      method: 'POST',
      headers: new Headers ({
        'Content-Type': 'application/json',
      }),
      body:body,
    });	
  }

  function delete_bookmark (id){
    return fetch(`${baseUrl}bookmarks/${id}`, {
      method: 'DELETE',
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