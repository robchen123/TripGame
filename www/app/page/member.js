define('app/page/member', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage');
    
    var page = new Page({
        id: 'member',
        title: '成员'
    });
    
    page.actionIndex = function(){
        var user = AV.User.current();
        this.redirect({action: 'join'});
    }
    
    page.actionJoin = function(params, done){
        var key = params.key || null,
            Family = AV.Object.extend('Family'),
            query = 'select * from Family';
        
//        var user = AV.User.current();
//        user.fetchWhenSave(true);
//        var family = new Family();
//        family.fetchWhenSave(true);
//        family.set('name', '萝卜家园');
//        family.set('password', '123123');
//        family.set('logos', [user.get('logo').url()]);
//        family.save().then(function(){
//            user.set('family', family);
//            user.save();
//        });
//        
//        
//        return;
        
        if(key){
            query += " where name like '%" + key + "%'";
        }
        AV.Query.doCloudQuery(query).then(function(rs){
            done({list: rs.results});
        }, function(error){
            done({list:[]});
        });
    }
    
    return page;
});