define('app/module/cache', function(){
    var Cache = {
        set: function(key, value, expires){
            var tmp = {};
            switch(key){
                case Cache.KEYS.FEEDS:
                case Cache.KEYS.NEAR_FEEDS:
                case Cache.KEYS.MY_FEEDS:
                    for(var i = 0, l = value.length, user; i < l; i ++){
                        user = value[i].get('user');
                        tmp[user.id] = user;
                    }
                break;
            }
            var data = {
                value: value,
                expires: new Date().getTime() + expires || 86400000
            };
            localStorage.setItem(key, JSON.stringify(data, function(k, v){
                if(k === 'user' && v.objectId && tmp[v.objectId]){
                    var user = tmp[v.objectId];
                    v.logo = user.get('logo');
                    v.username = user.get('username');
                    v.nickname = user.get('nickname');
                }
                return v;
            }));
        },
        get: function(key){
            var data = JSON.parse(localStorage.getItem(key));
            if(!data){
                return null;
            }
            var expires = data.expires;
            if(expires < new Date().getTime()){
                return null;
            }
            return data.value;
        },
        clear: function(key){
            localStorage.removeItem(key);
        }
    };
    
    Cache.KEYS = {
        POSITION:   'cache_position',
        FEEDS:      'cache_feeds',
        NEAR_FEEDS: 'cache_near_feeds',
        MY_FEEDS:   'cache_my_feeds'
    }
    
    return Cache;
});