define('app/page/login', function(require){
	var $ = require('$'),
		Page = require('spa/core/basepage'),
        UserModule = require('app/module/user');
	
	var page = new Page({
		id: 'login',
        title: '登陆'
	});
	
	page.actionIndex = function(){
		this.redirect({action: 'login'});
	}
	
	page.actionLogin = function(){
        page.bind('#loginForm', 'submit', function(){
            var phone = $('#phone').val(),
                pwd = $('#pwd').val();
            UserModule.login({phone: phone, pwd: pwd}, function(){});
            return false;
        });
    }

    page.actionLogout = function(){
        UserModule.logout();
        this.redirect({action: 'login'});
    }
    
    page.actionExit = function(){
        navigator.app.exitApp();
    }
	
	return page;
});
