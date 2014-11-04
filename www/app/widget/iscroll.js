define('app/widget/iscroll', function(require){
    
    var emptyFunc = function(){};
    var scroller = new IScroll('#page-wrapper');
    scroller.onPullUp = scroller.onPullDown = emptyFunc;
    scroller.on('scrollEnd', function () {  
        if ((this.y - this.maxScrollY) > 10) {             
            scroller.onPullUp();
        }else if(this.y < -10){
            scroller.onPullDown();
        }
    });
    scroller.clearHandlers = function(){
        this.onPullUp = this.onPullDown = emptyFunc;    
    }
    
    return scroller;
});