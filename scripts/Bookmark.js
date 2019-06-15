'use strict';
/* global cuid*/
//what does a bookmark consist of
//similar to Item.js from shopping list

const Bookmark = (function(){
  const create = function(title, url, desc, rating){
    return   {
      id: cuid(),
      title,
      url,
      desc,
      rating,
      extended: false,
    };
  };

  const validate_bookmark =  function(title, url, desc, rating){// error checking
    if(title === null || title === ' '){
      throw new TypeError('Title cannot be empty');
    }
    if(url === null || url === ' '){
      throw new TypeError('URL cannot be empty');
    }    
  };
  return {
    create,
    validate_bookmark,
  };
}());

