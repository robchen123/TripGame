define('app/page/setting', function(require){
	var $ = require('$'),
		Page = require('spa/core/basepage');

	var page = new Page({
		id: 'setting'
	});
	
	page.actionIndex = function(){
		
	}
    
    page.actionExit = function(){
        navigator.app.exitApp();
    }
	
	return page;
});
