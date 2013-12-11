/*****************************************************
example:
------------------------------------------------------
$('#test').tabwipe({
    callback : function(index){
        $('.list-style').removeClass('cur').eq(index).addClass('cur');
    }
});

version:1.0
copyright: http://www.mjix.com，测试页面：http://test.mjix.com
*******************************************************/

(function($) { 
    $.fn.tabwipe = function(settings){
        var config = {
            done_process : 0.4, //超过0.4则跳转
            ani_time : 300, //动画时间
            max_speed:800, //超过速度跳转
            is_circle : true, //循环滚动
            callback : function(){}
        };
        if (settings) $.extend(config, settings);
        var that = $(this).eq(0);
        
        var main_box = that, box_width, tauching = false, tauch_stop = 0;
        var index=0, lis=main_box.children(), li_len = lis.length;
        
        var init = function(){
            if(!config.is_circle) return ;
            main_box.append(lis.eq(0).clone());
        };
        
        var _move = function(_index){
            var o_index = index, dis; index = _index;
            if(_index<0){
                if(config.is_circle){
                    _index = li_len-1;
                    index = li_len-1;
                }else{
                    index = _index = 0;
                }
            }else if(_index>=li_len){
                if(config.is_circle){
                    _index = li_len;
                    index = 0;
                }else{
                    index = _index = li_len-1;
                }
            }
            dis = -box_width*_index;
            $(main_box).animate({left:dis}, config.ani_time, 'linear', function(){
                if(o_index == index%li_len) return ;
                config.callback.call(this, index%li_len);
            });
        };
        
        var add_listen = function(){
            box_width = main_box.parent().width();
            main_box.children().css({'width':box_width});
            main_box.css({'left':0}).show();
            config.callback.call(this, 0);
            
            var change_env = function(obj, data){
                if(index == li_len && data.dx>0 && config.is_circle){
                    index = 0;
                }else if(index == 0 && data.dx<0 && config.is_circle){
                    index = li_len;
                }
                
                var dis = -index*box_width-data.dx;
                $(obj).css({'left':dis});
            };
            
            var clear_env = function(obj, data){
                var dis = 0, adx=Math.abs(data.dx);
                var mspeed = data.speed > config.max_speed;
                if(mspeed || adx/box_width > config.done_process){
                    var flag = data.dx > 0 ? 1 : -1;
                    var dex = index + flag;
                    _move(dex);
                }else{
                    _move(index);
                }
            };
            
            main_box.touchwipe({
                listen:'x',
                start : function(){
                    tauching = true;
                },
                
                stop : function(data){
                    tauching = false;
                    tauch_stop = new Date().getTime();
                    clear_env(this, data);
                    return ;
                },
                
                move : function(data){
                    //改变当前状态
                    return change_env(this, data);
                }
            });
        };
        
        init.call(that);
        add_listen.call(that);
        
        $(window).bind('resize', function(){
             add_listen.call(that);
        });
        
        return {
            move : function(_indx){
                _indx = _indx<0 ? (_indx%li_len)+li_len : _indx;
                _move(_indx);
            },
            
            next : function(){
                if(config.is_circle){
                    index==0 && main_box.css({'left':0});
                }else{  
                    index = index+1>=li_len ? -1 : index;
                }
                
                _move(index+1);
            },
            
            prev : function(){
                _move(index-1);
            },
            
            interval : function(time, touch_delay_loop){
                time = time || 3000;
                touch_delay_loop = touch_delay_loop || 2000;
                var that = this;
                setInterval(function(){
                    if(tauching) return ;
                    if(new Date().getTime()-tauch_stop<touch_delay_loop) return ;
                    
                    that.next();
                }, time);
            }
        };
    };
 
})($);