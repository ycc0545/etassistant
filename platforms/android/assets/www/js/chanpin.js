function chanpin_class01()
{
	$('#zhezhao').show();
	$('.zhezhao_list').html('');
	var h01 = '<div id="chanpin_pop_menu_item_a0" class="chanpin_pop_menu_item_a pop_menu_item">全部</div>\
		<div id="chanpin_pop_menu_item_a1" class="chanpin_pop_menu_item_a pop_menu_item">自有品牌</div>\
		<div id="chanpin_pop_menu_item_a2" class="chanpin_pop_menu_item_a pop_menu_item">代理品牌</div>';
	$('#zhezhao_list01').html(h01);
	$('#' + chanpin_pop_menu_item_a).addClass('pop_menu_item_current');
	if ( chanpin_pop_menu_item_a != 'chanpin_pop_menu_item_a0' )
	{
		chanpin_class02();
	}
	$('.chanpin_pop_menu_item_a').each(function(index)
	{
		$(this).singleTap(function()
		{
			$('.chanpin_pop_menu_item_a').each(function(index)
			{
				$(this).removeClass('pop_menu_item_current');
			});
			$(this).addClass('pop_menu_item_current');
			chanpin_pop_menu_item_a = $(this).attr('id');
			switch (chanpin_pop_menu_item_a)
			{
				case 'chanpin_pop_menu_item_a0' :
					catid = 0;
					current_page = 1;
					$('#load_more_wrap').hide();
					$('#zhezhao').hide();
					chanpin_list();
					break;
				case 'chanpin_pop_menu_item_a1' :
				case 'chanpin_pop_menu_item_a2' :
					chanpin_class02();
					break;
			}
		});
	});
}

function chanpin_class02()
{
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	var pp = chanpin_pop_menu_item_a == 'chanpin_pop_menu_item_a1' ? 1 : 2;
	url += 'product_class&pp=' + pp;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data){
		var len = data.length;
		var h = '';
		var current_html01 = '';
		for (var i = 0; i < len; i++)
		{
			var current_html01 = '';
			current_html01 = '';
			if(catid == data[i].catid)
			{
				current_html01 = ' pop_menu_item_current';
			}
			h += '<div class="chanpin_pop_menu_item_b pop_menu_item'+ current_html01+ '" data-id="'+ data[i].catid +'">'+ data[i].catname+ '</div>';
		}
		$('#zhezhao_list02').html(h);
		$('.chanpin_pop_menu_item_b').each(function(index){
	        touch_bg(this, 'pop_menu_item_current');
	        $(this).singleTap(function(){
		        catid = $(this).attr('data-id');
		        $('#zhezhao').hide();
		        current_page = 1;
		        $('#load_more_wrap').hide();
				chanpin_list();
	    	});
	    });
	});
}

function chanpinliebiao()
{
	$('#page2').html(func_caichanpin_list_html(2) );
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(function (){
		$('#zhezhao').hide();
		scrollRight();
	});
	bycaichanpin = 2;
	catid = 0;
	current_page = 1;
	paixu = 1;
	chanpin_pop_menu_item_a = 'chanpin_pop_menu_item_a0';
	$('#header_h02_i01').singleTap(h02fenlei);
	$('#header_h02_i02').singleTap(h02paixu);
	$('#wrapper2').css('top', '5.3em');
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	$('#load_more_wrap').hide();
	chanpin_list();
}

function chanpin_list()
{
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'product_list';
	if(catid > 0 )
	{
		url += '&catid='+ catid;
	}
	url += '&paixu=' + paixu;
	if (search_keyword)
	{
		url += '&s=' + search_keyword;
	}
	if(xinpin == 1)
    {
        url += '&xinpin=1';
    }
    url += '&page=' + current_page;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
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
		if( current_page == 1 )
		{
			$('#load_more_wrap').show();
			$('#load_more_wrap').html( $('#load_more_wrap').html() );
			touch_bg('#load_more', 'bg_gra01');
	        $('#load_more').singleTap(function()
	        {
	        	chanpin_list();
	        });
		}
		current_page += 1;
		my_toast ('', 'hide');
		var groupid = getLocalStorge('groupid');
		var h = $('#list01').html();
		for (var i = 0; i < len; i++)
		{
            var thumb = 'img/list_default.jpg';
			if (data[i].thumb != '')
			{
				thumb = data[i].thumb+ '_mobile.jpg';
        	}
			var price = '登录后显示价格';
			switch(groupid)
			{
				case '9': price = '￥'+ toDecimal2( data[i].putong_price); break;
				case '10': price = '￥'+ toDecimal2( data[i].daili_price); break;
				case '11': price = '￥'+ toDecimal2( data[i].gongxiao_price); break;
			}
			h += '<div class="list01_item" data-id="'+ data[i].id+ '">\
				<div class="list01_item_l"><img class="list01_item_l_img" src="'+ thumb+ '"></div>\
				<div class="list01_item_r"><div class="list01_item_r_title">'+ data[i].title+ '</div>\
				<div class="list01_item_r_zhaiyao">'+ b64.decode(data[i].description )+ '</div><div class="list01_item_r_other">'+ price+ '</div></div></div>';
		}
		$('#list01').html(h);
		$('.list01_item').each(function(index)
		{
	        touch_bg(this, 'bg_green01');
	        $(this).singleTap(function()
	        {
	        	scrollLeft();
	        	chanpin_detail($(this).attr('data-id') );
	        });
		});
		setTimeout(function ()
		{
			myScroll2.refresh();
			if( current_page == 1 )
			{
				myScroll2.scrollToPage(0, 0, 200);
			}
			if (search_keyword)
			{
				$('#search_chanpin_in').val( search_keyword );
				//chanpin_list();
			}
		}, 1000);
	});
}

function chanpin_detail(pid)
{
	$('#page3').html( chanpin_detail_html );
	$('#wrapper3').css('bottom', '2.7em');
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap(scrollRight);
	touch_btn ('cart_icon');
	$('#cart_icon').singleTap(function()
	{
		scrollRight();
		scrollRight();
		footer_menu03(); 
	});
	my_toast ('加载数据中...');
    var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'product_detail&pid=' + pid;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast ('', 'hide');
		var h = '<div style="background:url('+ data.datu[0]['url']+ '_mobile.jpg);" class="chanpin_detail_img"></div>';
		h += '<div class="detail_wrap"><div class="detail_title">'+ data.title+ '&nbsp;/&nbsp;'+ data.class_1+ '</div>';
		if (data.description) 
		{
			h += '<div class="detail_des fenge01">'+ data.description+ '</div>';
		}
		var baozhiqi = data.baozhiqi ? data.baozhiqi : '暂无';
		h += '<div class="detail_com01 fenge01"><div class="detail_baozhiqi"><span class="detail_com01_icon detail_baozhiqi_icon"></span>保质期'
		+ baozhiqi + '</div><div class="detail_buynum"><span class="detail_com01_icon detail_buynum_icon"></span>'+ data.buy_num+ '人购买</div></div>';
		if (data.chengbenhesuan) 
		{
			h += '<div class="detail_hesuan fenge01">成本核算：'+ data.chengbenhesuan+ '</div>';
		}
		if (data.content) 
		{
			h += '<div class="detail_miaoshu01 fenge01">产品描述</div>\
			<div class="detail_miaoshu02">'+ data.content+ '</div>';
		}
		h += '<div class="table_title">本地供应商</div>\
		<ul id="bendi" class="menu_list01"><li></li></ul>';
		var len = data.xiangguancaipin.length;
		if(len > 0)
		{
			var xiangguan_id = 1;
			h += '<div class="table_title">相关菜品</div><ul class="menu_list01" style="margin-bottom:3em;">';
			for (var i= 0; i< len; i++)
			{
				h += '<li id="xiangguan'+ xiangguan_id+ '" data-id="'+ data.xiangguancaipin[i]['id']+ 
				'" class="chanpin_detail_xiangguan02 menu_item02">'+ data.xiangguancaipin[i]['title']+ '<span class="m01_right_arrow"></span></li>';
				xiangguan_id++;
			}
			h += '</ul>';
		}

		h += '<div class="form_bottom"></div></div>';
        $('#scroller3').append(h);
        $('#xiangguan1').addClass('menu_item01_t');
        $('#xiangguan'+ xiangguan_id).addClass('menu_item01_b');
        $('.chanpin_detail_xiangguan02').each(function(index)
        {
	        touch_bg(this, 'bg_gra01');
	        $(this).singleTap(function(){
		        var pid = $(this).attr('data-id');
		        caipin_detail(pid, 1);
	    	});
		});
		var groupid = getLocalStorge('groupid');
		var price = '登录后显示价格';
		switch(groupid)
		{
			case '9': price = '￥'+ toDecimal2( data.putong_price); break;
			case '10': price = '￥'+ toDecimal2( data.daili_price); break;
			case '11': price = '￥'+ toDecimal2( data.gongxiao_price); break;
		}
		$('.chanpin_detail_f').show();
              
		$('.chanpin_detail_fprice').html(price);
		touch_bg('.chanpin_detail_ftocart', 'bg_tocart_on');
		$('.chanpin_detail_ftocart').singleTap(function()
		{
			addtocart(pid);
	    });
		setTimeout(function () 
		{
			if (current_city)
			{
				get_gongyingshang();
			}
			else
			{
				var bendi_con = '<li id="re_getpos" class="menu_item02 menu_item01_t menu_item01_b">暂时获取不到位置，点击重获。</li>';
				$('#bendi').html(bendi_con);
				$('#re_getpos').singleTap(function()
				{
					$(this).html('正在获取当前位置...');
					getLocation();
			    });
			}
			myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
		}, 1000);
	});
}

function get_gongyingshang()
{
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=bendi_jingxiaoshang';
	url += '&city='+ b64.encode( current_city );
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		var len = data.length;
		var h = '';
		if(len < 1)
		{
			var h = '<li class="menu_item02 menu_item01_t menu_item01_b">'+ current_city +'暂无经销商</li>';
			$('#bendi').html(h);
			return;
		}
		for (var i = 0; i < len ; i++)
		{
			h += '<a href="tel:' + data[i]['tel'] + '"><li id="bendi_' + i + '" class="menu_item01">\
				<span class="m01_icon m01_icon_dianhua"></span><span>' + data[i]['company'] + '</span><span class="m01_right_arrow"></span></li></a>';
		}
		$('#bendi').html(h);
		$('#bendi_0').addClass('menu_item01_t');
		$('#bendi_' + (len-1)).addClass('menu_item01_b');
	});
}

function search_chanpin()
{
	$('#page2').html( search_chanpin_html );
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap( function ()
	{
		search_keyword = '';
		scrollRight();
	});
	touch_bg('#search_chanpin_submit', 'label-success');
	$('#wrapper2').css('top', '6.4em');
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	$('#load_more_wrap').hide();
	$('#search_chanpin_in').singleTap(function()
	{
		$('#page3').html( search_txa_html );
		$('#search_txa_text').val( search_keyword );
		scrollLeft();
		touch_btn ('back_icon3');
		$('#back_icon3').singleTap(scrollRight);
		touch_bg('#search_txa_submit', 'ycc_btn01_on');
		$('#search_txa_submit').singleTap(function()
		{
			search_keyword = $('#search_txa_text').val();
			if (!search_keyword)
			{
				my_toast('关键词不能为空', 2500);
				return;
			}
			$('#search_txa_text').blur();
			window.scrollTo(0, 0);
			catid = 0;
			paixu = 1;
			current_page = 1;
			$('#search_chanpin_in').val( search_keyword );
			scrollRight();
			chanpin_list();
		});
	});
}