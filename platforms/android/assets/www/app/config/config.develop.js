/**
 * 开发配置
 */
define('app/config/config.develop', function () {

    var config = {};
    //使用HTML模板
    config.templateMode = 1;
    //默认入口设置为channel
    config.defaultPage = 'index';
    //不合并样式
    config.styleCombine = false;
    
    config.HTMLTemplatePath = 'app/templates/';
    
    config.APPID = "j8sx9gilnae53sv1oky0q97yyrqq2qmh75eedfhazjpw0vqt";
    
    config.APPKEY = "swpvz5zsco9fp39wszxttj8g99ss28i6do5cm67uyk4srmz0";

    return config;

});