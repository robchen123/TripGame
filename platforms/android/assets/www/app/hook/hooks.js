define('app/hook/hooks', function(require){
    var $ = require('$'),
        runtime = require('spa/core/runtime');
    
    var HooksList = {
        'before_app_init': true,
        'after_app_init': true,
        'user_login': true
    };
    
    for(var hook in HooksList){
        if(!HooksList[hook]){
            return;    
        }
        (function(hook){
            $(runtime).bind(hook, function(){
                setTimeout(function(){
                    require.async('app/hook/hooks/' + hook);
                }, 0);
            });
        })(hook);
    }
});