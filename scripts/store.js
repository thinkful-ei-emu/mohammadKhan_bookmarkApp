'use strict';
//function that calls the api
const store = (function(){
  const addBookmark =  function(bookmark){
    this.list.push(bookmark);  
  };
  const deleteBookmark = function(id){
    this.list = this.list.filter(item => item.id !== id);
  };
  const setMinimumRating = function(rating){
    this.minimumRating = rating;
  };
  const findById = function(id){
    return this.list.find(item => item.id === id);
  };
  const findAndUpdate = function(id,newData){    
    return Object.assign(this.findById(id),newData);
  };
  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };

  return{
    list: [],
    adding: false,
    error: null,
    minimumRating: 0,
    addBookmark,
    deleteBookmark,
    setMinimumRating,
    findById,
    findAndUpdate,
    setItemIsEditing,
  };
}());