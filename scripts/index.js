'use strict';
/* eslint-disable no-undef */
// main function
/* global bookmarkList, store, api, Bookmark*/

$(document).ready(function(){
  bookmark_list.bindEventListeners();
  bookmark_list.render();
  api.get_bookmarks()
    .then(res => res.json())
    .then(data => {
      data.forEach(bookmark => store.addBookmark(bookmark));
      bookmark_list.render();
    });
});
