/**
 * 应用入口
 **/
define('app/app', function (require) {
    var $ = require('$'),
        runtime = require('spa/core/runtime'),
        config = require('config'),
        dispatcher = require('spa/core/dispatcher');
    require('app/hook/hooks');
    
    AV.initialize(config.APPID, config.APPKEY);
    console.log(123);
    dispatcher.init(config);
    console.log(223);
    
});