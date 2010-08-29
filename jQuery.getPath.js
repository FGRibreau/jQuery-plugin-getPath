/*
  jQuery-GetPath v0.2, by Francois-Guillaume Ribreau.

  http://blog.geekfg.net/2010/06/trouver-le-selecteur-jquery-dun-element.html

  Copyright (c)2007 Dave Cardwell. All rights reserved.
  Released under the MIT License.


  Usage:
  var path = $('#foo').getPath();
*/
$(function(){(function($) {

$.fn.getPath = function(){
  return $.getPath(this);
};

$.getPath = function(el) {
  if (!el) return false;
  if(el.jquery) el = el[0];

  if(el.nodeName && el.nodeName.toLowerCase() == '#document')
    return 'jQueryPath_document';// == window.document

  if(el.location)
    return 'jQueryPath_window';// == window

  var path = findBestSelector(el, true);

  while (	el.parentNode && el.parentNode.nodeName !== '#document'
      && (!(el.id && el.id.indexOf('.') == -1))) {
    el = el.parentNode;
    path = findBestSelector(el) + '>' + path;
  }

  return path;
}

/*
 * Helpers
 */
 
   //Helper (we use jQuery as less as possible)
var next = (function() {
   var t = $('<div><p></p><p></p></div>')[0].childNodes[1];

   if (t.previousElementSibling && typeof(t.previousElementSibling) === 'object') {
     return function(el) {
     return el.previousElementSibling;
     };
   } else {
     return function(el) {
       return $(el).prev()[0]
     };
   }
   })();

 //Retreive the index of an element
var getIndex = function(el) {
 if (el.previousElementSibling === null)
   return 0;

 var _el = el,
     i = 0,
     elT = el.nodeName;

 while (_el = next(_el)) {
   if (_el.nodeName == elT)
     i++;
 }
 return i;
};

var findBestSelector = function(el, firstEl) {
 var first = firstEl || false,
     sel = '',
     index = false;

 if (el.id && el.id.indexOf('.') == -1) {
   //because $('#my.id') didn't work width jQuery
   sel += '#' + el.id;
 } else {
   sel += el.nodeName.toLowerCase();

   var indexEl = getIndex(el);
   if (indexEl || first) {
     sel += ':eq(' + indexEl + ')';
   }
 }

 return sel;
}

}(jQuery));});