define('app/page/feed', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage');
    
    var page = new Page({
        id: 'feed',
        title: '动态'
    });
    
    page.actionIndex = function(){
        console.log('123');    
    }
    
    return page;
});