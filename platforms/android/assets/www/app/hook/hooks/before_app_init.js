define('app/hook/hooks/before_app_init', function(require){
    var $ = require('$'),
        config = require('config'),
        cache = require('app/module/cache');
    
    $(document).foundation({
        offcanvas : {
            open_method: 'move',
            close_on_click : true
        }
    });
    
    $(document).ready(function(){
        $('#page').height($(window).height() - $('#main-nav').height() - $('#topnav').height());
        FastClick.attach(document.body);
    });
    
    document.addEventListener('deviceready', function(){
        navigator.geolocation.getCurrentPosition(function(position){
            cache.set(cache.KEYS.POSITION, position.coords, 86400000 * 30);
        }, function(){
            navigator.noticifation.alert('无法获取您的当前位置，系统将使用您上次的定位位置', '提示');    
        });
    });
    
});