define('app/module/user', function(require){
    var $ = require('$'),
        runtime = require('spa/core/runtime'),
        notification = navigator.notification;
    
    var UserModule = {
        register: function(data, success, error){
            var user = new AV.User();
            user.set("username", data.phone);
            user.set("password", data.pwd);
            user.setMobilePhoneNumber(data.phone);
            user.signUp(null, {
                success: function(user){
                    success();
                }, 
                error: function(user, rs){
                    switch(rs.code){
                        case 127:
                            notification.alert('电话号码错误,请检查后重新输入', '错误');
                        break;
                    }
                    error(user, rs);
                }
            });
        },
        login: function(data, success, error){
            var _this = this,
                username = data.phone,
                pwd = data.pwd;
            AV.User.logIn(username, pwd, {
                success: function(user){
                    success(user);
                    $(runtime).trigger('user_login');
                }, 
                error: function(user, rs){
                    switch(rs.code){
                        case 210:
                            notification.alert('用户名或密码错误', '登陆失败');
                        break;
                        case 211:
                            _this.register(data, success, error);
                        break;
                        default:
                            error(user, rs);
                    }
                }
            });
        },
        logout: function(){
            AV.User.logOut();
            $(runtime).trigger('user_logout');
        }
    }
    
    return UserModule;
});