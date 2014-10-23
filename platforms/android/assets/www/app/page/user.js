define('app/page/user', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage'),
        UserModule = require('app/module/user');
    
    var page = new Page({
        id: 'user',
        title: '用户'
    });
    
    page.actionIndex = function(){
        
    };
    
    page.actionLogo = function(){
        navigator.camera.getPicture(function(imageData){
            var file = new AV.File('logo.png', {base64: imageData});
            file.save().then(function(){
                var user = UserModule.getUser();
                user.set('logo', file);
                user.save().then(function(){
                    UserModule.setUser(user);
                    $('.user-logo').attr('src', imageURI);
                });
            }, function(error){
                
            });
        },function(){
            
        }, {
            quality: 75,
            destinationType : 0,
            encodingType: 0
        });
    }
    
    return page;
});