define('app/page/login', function(require){
	var $ = require('$'),
		Page = require('spa/core/basepage'),
        UserModule = require('app/module/user'),
        topnav = require('app/widget/topnav');
	
	var page = new Page({
		id: 'login',
        title: '登陆'
	});
	
	page.actionIndex = function(){
		this.redirect({action: 'login'});
	}
	
	page.actionLogin = function(params){
        topnav.setButton('right', 'save', function(){
            $('#loginForm').submit();    
        });
        page.bind('#loginForm', 'submit', function(){
            var phone = $('#phone').val(),
                pwd = $('#pwd').val();
            UserModule.login({phone: phone, pwd: pwd}, function(){
                if(params.back){
                    page.redirect(params.back);
                }else{
                    page.redirect('feed');
                }
            });
            return false;
        });
    }

    page.actionLogout = function(){
        UserModule.logout();
        this.redirect({action: 'login'});
    }
    
	return page;
});
