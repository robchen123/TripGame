define('app/widget/topnav', function(require){
    var $ = require('$'),
        runtime = require('spa/core/runtime');
    
    var Buttons = {
        back: 'arrow-left',
        forward: 'awwor-right',
        save: 'check',
        add: 'plus'
    };
    
    return {
        setButton: function(leftOrRight, buttonType, handler){
            if(!buttonType in Buttons){
                return false;    
            }
            var btn = this.getButton(leftOrRight);
            btn.html(this.wrapButton(buttonType));
            btn.unbind('click');
            if(typeof handler === 'string'){
                btn.attr('href', '#' + handler);    
            }else if(typeof handler === 'function'){
                btn.bind('click', handler);
            }
        },
        getButton: function(leftOrRight){
            var btn;
            if(leftOrRight == 'left'){
                btn = $('#leftBtn');    
            }else{
                btn = $('#rightBtn');
            }
            return btn;
        },
        wrapButton: function(type){
            return '<i class="fi-' + Buttons[type] + '"></i>';    
        },
        hideButton: function(leftOrRight){
            var btn = this.getButton(leftOrRight);
            btn.html('');
        }
    };
});