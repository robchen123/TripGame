define('app/page/index', function(require){
	var $ = require('$'),
		Page = require('spa/core/basepage'),
        User = require('app/module/user');
	
	var listview;
	
	var page = new Page({
		id: 'index'
	});
	
	page.actionIndex = function(){
		
	}
	
	return page;
});
