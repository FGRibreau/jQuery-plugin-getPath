module("getPath");
	
test('Selectors', function(){
	var $elmts = $('body').add('*').add(document).add(window)
	  , i = $elmts.length;

	while(i--){
		$elmts.eq(i).attr('data-rel',i);
		
		var path = $elmts.eq(i).getPath(), $el;

		if(path === 'jQueryPath_document')
			$el = $(document);
		else if(path === 'jQueryPath_window')
			$el = $(window);
		else
			$el = $(path);

		ok($el && $el.length == 1 && $el.attr('data-rel') == i, path);
	}
});