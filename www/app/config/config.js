/**
 * 发布配置
 */
define('app/config/config', function () {

    var config = {};

    config.defaultPage = 'channel';

    config.styleCombine = false; // 目前没有css测试，正式发布时需要设置为true

    return config;

});