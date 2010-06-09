# Reverse jQuery Selector Finder

In some specific situations you may want to identify an HTML element with a unique ID in order to retreive it, in another browser with the same page (for example: visitor mouse & keyboard real-time monitoring).


## Usage

	$('body').bind('click.monitoring',function(e){
		//Get the element's jQuery selector
		//It'll return something like this: #example-5>h4:eq(0)
		var sel = $.getjQueryPath(e.target);
		
		//Send to the server what element was clicked
		//(and maybe replicate this event on the administrator screen)
		$.post('/myMonitoringServer.php',{
			evtTarget:sel,
			evtType:'onClick'
		});
	    
		return false;
	});