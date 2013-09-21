# jQuery getPath [![Gittip](http://badgr.co/gittip/fgribreau.png)](https://www.gittip.com/fgribreau/)

In some specific situations you may want to identify an HTML element in an unique way - with a jQuery Selector or XPath - in order to select it in another browser - different DOM - (for example: visitor mouse & keyboard real-time monitoring).


## Usage

	$('body').bind('click.monitoring',function(e){
		//Get the element's jQuery selector
		//It'll return something like this: #example-5>h4:eq(0)
		var sel = $.getPath(e.target); //is the same as $(e.target).getPath();
		
		//Send to the server what element was clicked
		//(and maybe replicate this event on the administrator screen)
		$.post('/myMonitoringServer.php',{
			evtTarget:sel,
			evtType:'onClick'
		});
	    
		return false;
	});
	
$.getPath(el); may return jQueryPath_document or jQueryPath_window. 
They just are equivalents for window.document and window object because jQuery doesn't have any selector for them.

## Workaround

	var $el, path = $.getPath(window);

	if(path === 'jQueryPath_document')
		$el = $(document);
	else if(path === 'jQueryPath_window')
		$el = $(window);
	else
		$el = $(path);
		
	//So here, $el == window
