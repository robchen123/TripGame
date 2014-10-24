define('app/hook/hooks/after_app_init', function(require){
    var $ = require('$'),
        runtime = require('spa/core/runtime');
    
    var page = runtime.env.page,
        user = AV.User.current();
    
    if(user && user.get('username')){
        $(runtime).trigger('user_login');
    }else{
        page.redirect({id: 'login', action: 'login'});
    }
});