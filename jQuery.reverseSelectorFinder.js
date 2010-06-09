(function($) {
//Helper (we use jQuery as less as possible)
var next = function(){
	var t = $('<div/>')[0];
	if(typeof t.previousElementSibling == 'undefined')
		return function(el){return $(el).prev()[0]};
	else
        return function(el){return el.previousElementSibling;};
}();

//Retreive the index of an element
var getIndex = function(el){
	if(el.previousElementSibling && el.previousElementSibling == null)
		return 0;
	
    var _el = el, i = 0, elT = el.nodeName;
    while(_el = next(_el)){
    	if(_el.nodeName == elT)
        	i++;
    }
    return i;
};

var findBestSelector = function(el,firstEl){
	var first = firstEl || false;
	var sel = '',
		index = false;
		
	if(el.id && el.id.indexOf('.') == -1){//because $('#my.id') didn't work width jQuery
		sel += '#'+el.id;
	} else {
		sel += el.nodeName.toLowerCase()
		
		indexEl = getIndex(el);
		if(indexEl || (indexEl == 0 && first)){
			sel += ':eq('+indexEl+')';
		}
		else if(el.className){
			var l = el.className.split(' ');
			sel += '.'+(l.length > 0 ? l.join('.') : el.className);
		}
	}
	
	return sel;
}

$.getjQueryPath = function(el){
	if(!el) return false;
	
	var path = findBestSelector(el,true);
	
	while(el.parentNode && el.parentNode.nodeName !== '#document'
	  && (!(el.id &&  el.id.indexOf('.') == -1))){
		el = el.parentNode;
		path = findBestSelector(el)+ '>' + path;
	}
	
	return path;
}

}(jQuery));