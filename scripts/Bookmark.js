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

  return {
    create,
  };

}());

