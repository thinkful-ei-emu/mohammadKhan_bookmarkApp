'use strict';
/* eslint-disable no-undef */
// main function
/* global bookmarkList, store, api, Bookmark*/

$(document).ready(function(){
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.get_bookmarks()
    .then(res => res.json())
    .then(data => {
      data.forEach(bookmark => store.addBookmark(bookmark));
      bookmarkList.render();
    });
});
