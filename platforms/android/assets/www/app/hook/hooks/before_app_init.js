define('app/hook/hooks/before_app_init', function(require){
    var $ = require('$'),
        config = require('config');
    
    $(document).foundation({
        offcanvas : {
            open_method: 'move',
            close_on_click : true
        }
    });
});