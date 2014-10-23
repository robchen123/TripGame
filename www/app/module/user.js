define('app/module/user', function(require){
    var $ = require('$'),
        notification = navigator.notification;
    
    var UserModule = {
        user: null,
        islogin: false,
        init: function(){
            this.getUser();
        },
        setUser: function(user){
            if(!user){
                return;    
            }
            localStorage.user = JSON.stringify(user);
            this.user = user;
            this.islogin = true;
        },
        getUser: function(){
            if(!this.user){
                try{
                    var user = JSON.parse(localStorage.user);
                    this.setUser(user);
                }catch(_){}
            }
            return this.user;
        },
        isLogin: function(){
            return this.islogin;
        },
        register: function(data, success, error){
            var user = new AV.User();
            user.set("username", data.phone);
            user.set("password", data.pwd);
            user.setMobilePhoneNumber(data.phone);
            user.signUp(null, {
                success: function(user){
                    _this.setUser(user);
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
                    _this.setUser(user);
                    console.log(user);
                    success(user);
                }, 
                error: function(user, rs){
                    console.log(rs.code);
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
            this.user = null;
            localStorage.user = null;
            this.islogin = false;
        }
    }
                       
    UserModule.init();
    
    return UserModule;
});