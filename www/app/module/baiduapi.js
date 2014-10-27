define('app/module/baiduapi', function(require){
    var $ = require('$');
    
    var APP_KEY = '36635f56d8ad8283d53988f8b1b46976';
    var API = {
        GEO: 'http://api.map.baidu.com/geocoder/v2/?address=%address&output=json&ak=' + APP_KEY
    }
    
    return {
        get: function(apiType, params, callback){
            if(!apiType in API){
                return false;
            }
            var api = API[apiType];
            if(params){
                for(var key in params){
                    api = api.replace('%' + key, params[key]);
                }
            }
            $.ajax({
                url: api,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: callback
            });
        }
    }
});