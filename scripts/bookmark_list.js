/* eslint-disable no-console */
'use strict';
/*global $, api, store*/

//// this function will generate the html element version of the provided bookmark in a string
const bookmark_list = (function (){
  //```````````````````````````````````````````generate functions````````````````````````````````````` 
  function generate_menu(){
    // this function generates the add bookmark button and dropdown. Returns html in a string
    if (store.adding){ // when user presses add button
      return  `
        <form class="js-add-bookmark-form">          
            <div class= "col-6">
            <label for="title">Title:</label>
            <input id="title" name="title">
            </div>

            <div class= "col-6">
            <label for="url">URL:</label>
            <input id="url" name="url">
            </div>            
         
            <div class="col-12">
                <div class= "col-6">
                    <label for="description"></label>
                    <textarea id="description" name="description" placeholder="Enter Description here"></textarea>
                </div>
                <div class= "col-6">              
                <label class="float-left block" for="1star">1 star <input id="1star" class="float-left" type="radio" name="star" value="1star"></label>              
                <label class="float-left block" for="2star">2 star <input id="2star" class="float-left" type="radio" name="star" value="2star"></label>              
                <label class="float-left block" for="3star">3 star <input id="3star" class="float-left" type="radio" name="star" value="3star"></label>              
                <label class="float-left block" for="4star">4 star <input id="4star" class="float-left" type="radio" name="star" value="4star"></label>             
                <label class="float-left block" for="5star">5 star <input id="5star" class="float-left" type="radio" name="star" value="5star" checked></label>              
                </div>
            </div>   
            <div class="centering-text">       
                <input type="submit" value="Submit">
                <button class="js-cancel-button">Cancel</button>
            </div>
        </form>`;
    }
    // when add button is not pressed this will be the display
    return (`<div class= "col-12 centering-text"> 
                <button id="js-add-bookmark-btn">Add</button>
                <label for="min-rating" value="Minimum Rating"></label>
                <select id="min-rating" name="min-rating" class= "js-select-rating">
                    <option value="0">Select a Minimum Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                </select>
            </div>`);
  }

  function generate_star(val){
    let value= '';
    for(let i = 0; i <= val; i ++){
      value += ('<i class="fa fa-star" aria-hidden="true"></i>');
    }
    return value;
  }

  function generate_bookmark_element(bookmark) { // the element gets displayed as one bookmark list inside UL
    if(bookmark.extended){
      return (`
            <div data-id= "${bookmark.id}" class="bookmark extended col-12">
                <ul class= "col-12">
                    <li class="bold col-6" >
                        ${bookmark.title}
                    </li>
                    <li class= "col-3" >
                        <a href="${bookmark.url}" target="_blank">Visit Site</a>
                    </li>
                    <div class= "description-box col-6">          
                        <p>${bookmark.desc}
                    </div>                    
                    <li class= "col-3">       
                        ${bookmark.rating > 1 ? generate_star(bookmark.rating) : '<i class="fa fa-star" aria-hidden="true"></i>'}
                    </li>                  
                </ul>
                <div class="col-12 centering-text">
                    <button class= "js-delete-button">Delete</button>
                </div>      
            </div>
        `);
    }
    return (`
            <div data-id= "${bookmark.id}" class="bookmark">
                <ul>
                    <li class="bold">
                        ${bookmark.title}
                    </li>
                    <li>          
                        ${bookmark.rating > 1 ? generate_star(bookmark.rating) : '<i class="fa fa-star" aria-hidden="true"></i>'}
                    </li>
                </ul>
            </div>
    `);
  }

  function genereate_bookmark_list(list) {
    const lists = list.map(item => generate_bookmark_element(item));
    return lists.join('');
  }

  function generate_error(){
    return`<p class="error">${store.error.message}</p>`;
  }

  //```````````````````````````````````````````Render functions```````````````````````````````````````
  function render() {
    if (store.error){
      $('.error-display').html(generate_error());
    }
    else{
      $('.error-display').html('');
    }
    console.log('render ran');
    let list = [...store.list];
    list = list.filter(bookmark => bookmark.rating >= store.minimumRating);//filter out all the bookmark that is more than the minimum rating
    const bookmark_list_string = genereate_bookmark_list(list);
    $('.bookmark-list').html(bookmark_list_string);
    $('.list-controls').html(generate_menu());
  }

  function handle_add_bookmark_click(){
    $('.list-controls').on('click', '#js-add-bookmark-btn', function (){
      store.adding = true;
      render();
    });
  }
  function handle_submit_bookmark(){
    // this function gets the user data and creates a bookmark and then add it to bookmark list
    $('.list-controls').on('submit','.js-add-bookmark-form',function(event){
      event.preventDefault();
      // get values
      // create using our api
      // add to store
      // change state of store
      // render
      const title = $('#title').val();
      const url = $('#url').val();
      const desc = $('#description').val();
      const rating = $('input[name=star]:checked').val();
      $('#title').val('');
      $('#url').val('');
      $('#description').val('');
      $('input[name=star]:checked').val('');
      api.add_bookmarks(title,url,desc,rating)
        .then(handleError)
        .then(data => {
          if (store.error){
            store.error.message = data.message;
            // save error to store.error.message
          }
          else{
            store.addBookmark(data);
            store.adding = false;
          }
          render();
          store.error=null;
        });
    });
  }

  function handle_cancel_click(){
    // this function changes the state of the store so that it is not adding anything
    // when render is run again the submit form will be removed
    $('.list-controls').on('click','.js-cancel-button',function(){
      store.adding = false;
      render();
    });
  }

  function capture_id(element){   
    // this function gets the data id from the parameter element
    // data id was added in the generate bookmark function
    // returns id
    return $(element).data('id');
  }

  function handle_toggle_bookmark_view(){
    // this function toggles the detailed view of a bookmark
    // toggles the bookmarks extended attribute
    $('.bookmark-list').on('click','.bookmark', function(event){
      const id= capture_id(event.currentTarget);
      const bookmark= store.findById(id);
      bookmark.extended = !bookmark.extended; // Changed the store
      render();
    });
  }

  function handleError(res){
    // this function checks the response from the thinkful api for any errors
    // returns a promise
    if (!res.ok) {
      store.error = {code: res.status};
    }
    if (!res.headers.get('content-type').includes('json')) {
      store.error.message = res.statusText;
      return Promise.reject(store.error);
    }
    return res.json();
  }

  //   function get_item_id_from_element(item) {
  //     return $(item)
  //       .closest('.js-item-element')
  //       .data('item-id');
  //   }

  function handle_delete_bookmark_click(){ //event delegation
    // this function will delete a bookmark
    // find the id associated with the bookmark to be deleted
    // call the api to delete it
    // from the response, make sure no errors occured
    // delete the bookmark from store
    // re render
    // clear the error in the store
    $('.bookmark-list').on('click', '.js-delete-button', function(event){      
      const id = capture_id($(event.currentTarget).closest('div[class^="bookmark"]'));
      api.delete_bookmark(id)
        .then(handleError)
        .then(() => {
          if(store.error){
            store.error.message= 'Cannot delete an item';
          } // due to asyn nature, api needs to send a OK status before deleting from the store.
          store.deleteBookmark(id);
          render();
          store.error = null;
        });
    });
  }

  function handle_minimum_rating_change(){ // event delegation
    // this function keeps track of the minimum rating change
    $('.list-controls').on('change', 'select', function(){
      store.setMinimumRating( $(this).val());
      render();      
    });
  }


  //``````````````````````````````````````````Handle functions````````````````````````````````````````
  function bindEventListeners(){
    handle_add_bookmark_click();
    handle_submit_bookmark();
    handle_cancel_click();
    handle_toggle_bookmark_view();
    handle_delete_bookmark_click();
    handle_minimum_rating_change();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  }; 

}());