module("getPath");

test('Specific selectors', function(){
    equals($(document).getPath(), 'jQueryPath_document', '$(document).getPath()');
    equals($.getPath($(document)), 'jQueryPath_document', '$.getPath($(document))');
    equals($(window).getPath(), 'jQueryPath_window', '$(window).getPath()');
    equals($.getPath($(window)), 'jQueryPath_window', '$.getPath($(window))');
});
	
test('Selectors', function(){
	var $elmts = $('body').add('*')
	  , i = $elmts.length;

	while(i--){
		$elmts.eq(i).attr('data-rel',i);
		
		var path = $elmts.eq(i).getPath()
		  , $el = $(path);

		ok($el && $el.length == 1 && $el.attr('data-rel') == i, path);
	}
});