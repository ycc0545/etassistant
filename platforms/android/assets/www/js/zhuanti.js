function huodongzhuanti()
{
	$('#page2').html(zhuanti_list_html);
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	current_page = 1;
	zhuanti_list();
	/*
	var tabins = $('.wipe-list-ulo').tabwipe({
        done_process : 0.4, //移动超过40%则跳转
        ani_time : 300, //动画切换时间
        max_speed:800, //滑屏速度超过800dip跳转
        is_circle : true, //循环滚动
        callback : function(index){ //切换回调
            $('.gcdt-list-curo div').removeClass('cur').eq(index).addClass('cur');
        }
    }).interval(3000);
    
    //支持点击切换图片
    $('.gcdt-list-cur div').click(function(){
        tabins.move($(this).index());
    });
     */
}

function zhuanti_list()
{
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'huodong_list';
	url += '&page=' + current_page;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast ('', 'hide');
		var len = data.length;
		if( current_page == 1 )
		{
			$('#list01').html('');
		}
		if (len == 0)
		{
			my_toast('没有返回数据', 2500);
			return;
		}
		var h = $('#list01').html();
		for (var i = 0; i < len; i++)
		{
	        var thumb = 'img/list_default.jpg';
			if (data[i].thumb != '')
			{
				thumb = data[i].thumb+ '_mobile.jpg';
	    	}
			h += '<div class="list01_item" data-id="'+ data[i].id+ '">\
				<div class="list01_item_l"><img class="list01_item_l_img" src="'+thumb+'"></div>\
				<div class="list01_item_r"><div class="list01_item_r_title">'+ data[i].title+ '</div>\
				<div class="list01_item_r_zhaiyao">'+data[i].description+'</div></div></div>';
		}
		$('#list01').html(h);
		if( current_page == 1 )
		{
			$('#load_more_wrap').show();
			$('#load_more_wrap').html( $('#load_more_wrap').html() ); //重置html，防止事件重复定义
			touch_bg('#load_more', 'bg_gra01');
			$('#load_more').singleTap(function()
	        {
	        	zhuanti_list();
	        });
		}
		$('.list01_item').each(function(index)
		{
	        touch_bg(this, 'bg_green01');
	        $(this).singleTap(function()
	        {
	        	huodong_detail( $(this).attr('data-id') );
	        });
		});
		setTimeout(function ()
		{
			myScroll2.refresh();
		}, 1000);
		current_page += 1;
	});
}

function huodong_detail(id)
{
	$('#page3').html( func_pagecom_html(3, '活动详情') );
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap(scrollRight);
	myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	scrollLeft();
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'huodong_detail';
	url += '&id=' + id;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast ('', 'hide');
		var h = '<div class="table_title">' + data.title + '</div>\
			<div class="page_con">' + data.content + '</div>';
		$('#scroller3').html( h );
		setTimeout(function ()
		{
			myScroll3.refresh();
		}, 1000);
	});
}