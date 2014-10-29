define('app/page/user', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage'),
        UserModule = require('app/module/user'),
        topnav = require('app/widget/topnav');
    
    var page = new Page({
        id: 'user',
        title: '个人中心'
    });
    
    page.actionIndex = function(){
        this.redirect({action: 'profile'});
        return false;
    };
    
    page.actionProfile = function(params, done){
        if(!UserModule.checkLogin()){
            return false;    
        }
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
        page.bind('#addPhotoBtn', 'click', function(){
            page.addPhoto();
            return false;
        });
        topnav.setButton('right', 'save', function(){
            $('#updateForm').submit();
            return false;
        });
        
        var datas = {user: user};
        
        var Photo = AV.Object.extend('Photo'),
            query = new AV.Query(Photo);
        query.equalTo('user', user);
        query.descending('createdAt');
        query.limit(20);
        query.find().then(function(rs){
            datas.photos = rs;
            done(datas);
        }, function(){
            datas.photos = [];
            done(datas);
        });
    };
    
    page.actionInfo = function(params, done){
        var username = params.username;
        if(!username){
            return false;   
        }
        var query = new AV.Query(AV.User);
        query.equalTo('username', username);
        query.find().then(function(users){
            var Photo = AV.Object.extend('Photo'),
                query = new AV.Query(Photo),
                user = users[0];
            query.equalTo('user', user);
            query.limit(100);
            query.find().then(function(rs){
                done({user: user, photos: rs});
            });
        });
    }
    
    page.addPhoto = function(){
       if(!UserModule.checkLogin()){
            return false;    
        }
        navigator.camera.getPicture(function(imgdata){
            var file = new AV.File('pic.jpg', {base64: imgdata});
            file.save().then(function(){
                $('#photolist').append('<li><img class="th" src="' + file.url() + '"></li>');
                var user = AV.User.current();
                var Photo = AV.Object.extend('Photo');
                var photo = new Photo();
                photo.set('user', user);
                photo.set('img', file);
                photo.save();
            }, function(error){
                navigator.notification.alert("Error: " + error.code + " " + error.message, '错误');
            });
        },function(message){
            navigator.notification.alert(message, '错误');
        }, {
            quality: 50,
            destinationType : 0,
            encodingType: 0,
            correctOrientation: true,
            targetWidth: 300,
            targetieght: 300
        });
    }
    
    page.setLogo = function(){
        if(!UserModule.checkLogin()){
            return false;    
        }
        navigator.camera.getPicture(function(imgdata){
            var file = new AV.File('logo.jpg', {base64: imgdata});
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
        },function(message){
            navigator.notification.alert(message, '错误');
        }, {
            quality: 50,
            destinationType : 0,
            encodingType: 0,
            correctOrientation: true,
            targetWidth: 200,
            targetieght: 200
        });
    }
    
    return page;
});