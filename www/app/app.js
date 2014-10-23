/**
 * 应用入口
 **/
define('app/app', function (require) {
    var $ = require('$'),
        config = require('config'),
        dispatcher = require('spa/core/dispatcher');
    
    AV.initialize(config.APPID, config.APPKEY);
    
    $(document).foundation({
        offcanvas : {
            open_method: 'move',
            close_on_click : true
        }
    });
    
    dispatcher.init(config);
});