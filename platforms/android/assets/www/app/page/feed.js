define('app/page/feed', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage'),
        BaiduAPI = require('app/module/baiduapi');
    
    var page = new Page({
        id: 'feed',
        title: '动态'
    });
    
    page.actionIndex = function(params, done){
        var Feed = AV.Object.extend('Feed'),
            query = new AV.Query(Feed);
        query.include('user');
        query.limit(10);
        query.find().then(function(rs){
            done({feeds: rs});
        });
    }
    
    page.actionNear = function(params, done){
        navigator.geolocation.getCurrentPosition(function(position){
            var Feed = AV.Object.extend('Feed'),
                query = new AV.Query(Feed);
                query.include('user');
                query.near('location', new AV.GeoPoint(position.coords));
                query.find().then(function(rs){
                    done({feeds: rs});
                });
        }, function(){
            navigator.noticifation.alert('无法获取您的当前位置');    
        });
    }
    
    page.actionNew = function(){
        page.bind('#feedForm', 'submit', function(){
            var time = $('#time').val(),
                city = $('#city').val(),
                desc = $('#desc').val();
            BaiduAPI.get('GEO', {address: city}, function(rs){
                if(rs.status === 0){
                    var geo = rs.result.location,
                        point = new AV.GeoPoint({latitude: geo.lat, longitude: geo.lng}),
                        Feed = AV.Object.extend('Feed'),
                        user = AV.User.current(),
                        feed = new Feed()
                    
                    feed.set('location', point);
                    feed.set('user', user);
                    feed.set('time', time);
                    feed.set('city', city);
                    feed.set('desc', desc);
                    feed.save().then(function(){
                        page.redirect({action: 'my'});
                    }, function(error){
                        navigator.notification.alert("Error: " + error.code + " " + error.message, '错误');    
                    });
                }else{
                    navigator.notification.alert('地址不存在，请填写正确地址', '地址错误'); 
                }
            });
            return false;
        });
        
        var today = new Date().getTime(),
            days = [],
            tmp = new Date();
        for(var i = 0; i < 30; i ++){
            tmp.setTime(today + 86400000 * i);
            days.push([tmp.getFullYear(), tmp.getMonth() + 1, tmp.getDate()].join('-'));
        }
        return {days: days};
    }
    
    return page;
});