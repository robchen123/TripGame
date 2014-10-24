define('app/hook/hooks/user_login', function(require){
    var $ = require('$'),
        runtime = require('spa/core/runtime');
    
    var user = AV.User.current(),
        page = runtime.env.page;
    
    if(!user.get('logo') || !user.get('nickname')){
        navigator.notification.alert('请完善您的基本资料');
        page.redirect({id: 'user', action: 'profile'});
    }else{
        $('.user-logo').attr('src', user.get('logo').url());
        if(!user.get('family')){
            page.redirect({id: 'member', action: 'join'});
        }else{
            page.redirect({id: 'feed'});
        }
    }
});