define('app/page/feed', function(require){
    var $ = require('$'),
        Page = require('spa/core/basepage'),
        BaiduAPI = require('app/module/baiduapi'),
        UserModule = require('app/module/user'),
        topnav = require('app/widget/topnav'),
        cache = require('app/module/cache'),
        iscroll = require('app/widget/iscroll');
    
    var page = new Page({
        id: 'feed',
        title: '泡泡',
        load: function(){
            iscroll.onPullUp = function(){
                page.redirect({refresh: 1, t: new Date().getTime()});
            }
        },
        unload: function(){
            topnav.hideButton('right');
        }
    });
    
    page.actionIndex = function(params, done){
        topnav.setButton('right', 'add', 'feed/new');
        var feeds = cache.get(cache.KEYS.FEEDS);
        if(feeds && !params.refresh){
            done({feeds: feeds});
        }else{
            page.showLoading();
            var Feed = AV.Object.extend('Feed'),
                query = new AV.Query(Feed);
            query.descending('time');
            query.include('user');
            query.limit(100);
            query.find().then(function(rs){
                cache.set(cache.KEYS.FEEDS, rs, 86400000);
                done({feeds: cache.get(cache.KEYS.FEEDS)});
                page.hideLoading();
            });
        }
    }
    
    page.actionNear = function(params, done){
        topnav.setButton('right', 'add', 'feed/new');
        if(!UserModule.checkLogin()){
            return false;
        }
        
        var position = cache.get(cache.KEYS.POSITION);
        if(!position){
            navigator.notification.alert('正在获取您的当前位置，请稍后重试', '提示');
            return false;
        }
        var feeds = cache.get(cache.KEYS.NEAR_FEEDS);
        if(feeds && !params.refresh){
            done({feeds: feeds});    
        }else{
            page.showLoading();
            var Feed = AV.Object.extend('Feed'),
            query = new AV.Query(Feed);
            query.include('user');
            query.near('location', new AV.GeoPoint(position));
            query.find().then(function(rs){
                cache.set(cache.KEYS.NEAR_FEEDS, rs, 86400000);
                done({feeds: cache.get(cache.KEYS.NEAR_FEEDS)});
                page.hideLoading();
            });
        }
    }
    
    page.actionMy = function(params, done){
        topnav.setButton('right', 'add', 'feed/new');
        if(!UserModule.checkLogin()){
            return false;
        }
        var feeds = cache.get(cache.KEYS.MY_FEEDS);
        if(!params.refresh && feeds){
            done({feeds: feeds});
        }else{
            page.showLoading();
            var Feed = AV.Object.extend('Feed'),
                query = new AV.Query(Feed);
            query.descending('createdAt');
            query.equalTo('user', AV.User.current());
            query.include('location');
            query.include('user');
            query.limit(100);
            query.find().then(function(rs){
                cache.set(cache.KEYS.MY_FEEDS, rs, 86400000);
                done({feeds: cache.get(cache.KEYS.MY_FEEDS)});
                page.hideLoading();
            });
        }
    }
    
    page.actionPos = function(params, done){
        topnav.setButton('right', 'add', 'feed/new');
        if(!UserModule.checkLogin()){
            return false;
        }
        if(!params.lat || !params.lng){
            return;
        }
        var Feed = AV.Object.extend('Feed'),
            query = new AV.Query(Feed);
        query.include('user');
        query.near('location', new AV.GeoPoint({latitude: params.lat, longitude: params.lng}));
        query.find().then(function(rs){
            done({feeds: rs});
        }, function(){
            done({feeds: []});    
        });
        page.bind('#searchForm', 'submit', function(){
            var kw = $('#kw').val();
            BaiduAPI.get('GEO', {address: kw}, function(rs){
                if(rs.status === 0){
                    var geo = rs.result.location;
                    page.redirect({action: 'pos', lat: geo.lat, lng: geo.lng});
                }else{
                    navigator.notification.alert('地址不存在，请填写正确地址', '地址错误'); 
                }
            });
            return false;
        });
    }
    
    page.actionNew = function(){
        topnav.setButton('right', 'save', function(){
            $('#feedForm').submit();    
        });
        if(!UserModule.checkLogin()){
            return false;
        }
        page.bind('#feedForm', 'submit', function(){
            page.showLoading();
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
                        cache.clear(cache.KEYS.MY_FEEDS);
                        page.hideLoading();
                        page.redirect({action: 'my'});
                    }, function(error){
                        navigator.notification.alert("Error: " + error.code + " " + error.message, '错误');
                        page.hideLoading();
                    });
                }else{
                    navigator.notification.alert('地址不存在，请填写正确地址', '地址错误'); 
                    page.hideLoading();
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