define('app/page/user', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage'),
        UserModule = require('app/module/user');
    
    var page = new Page({
        id: 'user',
        title: '个人中心'
    });
    
    page.actionIndex = function(){
        this.redirect({action: 'profile'});
    };
    
    page.actionProfile = function(){
        var user = AV.User.current();
        page.bind('#userlogo', 'click', function(){
            page.setLogo();
        });
        page.bind('#updateForm', 'submit', function(){
            var nick = $('#nick').val();
            if(/^\s*$/.test(nick)){
                navigator.notification.alert('请输入昵称');    
                return false;
            }
            user.set('nickname', nick);
            user.save().then(function(){
                navigator.notification.alert('资料保存成功');
            });
            return false;
        });
        
        return {user: user};
    };
    
    page.setLogo = function(){
        navigator.camera.getPicture(function(imageData){
            var file = new AV.File('logo.jpg', {base64: imageData});
            file.save().then(function(){
                var user = AV.User.current();
                if(user.get('logo')){
                    user.get('logo').destroy();
                }
                user.set('logo', file);
                user.save().then(function(){
                    $('.user-logo').attr('src', file.url());
                }, function(error){
                    navigator.notification.alert("Error: " + error.code + " " + error.message, '错误');
                });
            }, function(error){
                navigator.notification.alert("Error: " + error.code + " " + error.message, '错误');
            });
        },function(){
            
        }, {
            quality: 75,
            destinationType : 0,
            encodingType: 0,
            correctOrientation: true
        });
    }
    
    return page;
});