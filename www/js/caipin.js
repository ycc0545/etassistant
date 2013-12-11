function caipin_class ()
{
	my_toast ('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'dishes_class';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		$('#zhezhao').show();
		$('.zhezhao_list').html('');
		var len = data.length;
		my_toast ('', 'hide');
		var is_all = 1;
		var h = '';
		var current_html01 = '';
		for (var i = 0; i < len; i++)
		{
			var current_html01 = '';
			current_html01 = '';
			if(catid == data[i].catid)
			{
				is_all = 0;
				current_html01 = ' pop_menu_item_current';
			}
			h += '<div class="caipin_pop_menu_item pop_menu_item'+ current_html01+ '" data-id="'+ data[i].catid +'">'+ data[i].catname+ '</div>';
		}
		current_html01 = '';
		if(is_all)
		{
			
			current_html01 = ' pop_menu_item_current';
		}
		var all_html = '<div class="caipin_pop_menu_item pop_menu_item'+ current_html01+ '" data-id="0">全部</div>';
		$('#zhezhao_list01').html(all_html + h);
		$('.caipin_pop_menu_item').each(function(index){
	        touch_bg(this, 'pop_menu_item_current');
	        $(this).singleTap(function(){
		        catid = $(this).attr('data-id');
		        $('#zhezhao').hide();
		        current_page = 1;
		        $('#load_more_wrap').hide();
				caipin_list(0);
	    	});
	    });
	});
}

function h02fenlei()
{
	if (bycaichanpin == 1)
	{
		caipin_class();
		return;
	}
	chanpin_class01();
}

function h02paixu()
{
	$('#zhezhao').show();
	$('.zhezhao_list').html('');
	var current_html01 = ' pop_menu_item_current';
	var current_html02 = '';
	if(paixu == 2)
	{
		current_html01 = '';
		current_html02 = ' pop_menu_item_current';
	}
	var h = '<div data-id="1" class="paixu_pop_menu_item pop_menu_item' + current_html01 + '">按推荐排序</div>\
		<div data-id="2" class="paixu_pop_menu_item pop_menu_item'+ current_html02+ '">按人气排序</div>';
	$('#zhezhao_list02').html(h);
	$('.paixu_pop_menu_item').each(function(index)
	{
		touch_bg(this, 'pop_menu_item_current');
		$(this).singleTap(function()
		{
	        paixu = $(this).attr('data-id');
	        $('#zhezhao').hide();
	        current_page = 1;
	        $('#load_more_wrap').hide();
	        if (bycaichanpin == 1)
			{
				caipin_list(0);
				return;
			}
			chanpin_list();
		});
	});
}

function h02chanpin()
{
	$('#zhezhao').show();
	$('.zhezhao_list').html('');
	var current_html01 = ' pop_menu_item_current';
	var current_html02 = '';
	if(bycaichanpin == 2)
	{
		current_html01 = '';
		current_html02 = ' pop_menu_item_current';
	}
	var h = '<div data-id="1" class="bycaichanpin_pop_menu_item pop_menu_item' + current_html01 + '">按菜品查看</div>\
		<div data-id="2" class="bycaichanpin_pop_menu_item pop_menu_item' + current_html02 + '">按产品查看</div>';
	$('#zhezhao_list03').html(h);
	$('.bycaichanpin_pop_menu_item').each(function(index)
	{
		touch_bg(this, 'pop_menu_item_current');
		$(this).singleTap(function()
		{
	        bycaichanpin = $(this).attr('data-id');
	        $('#zhezhao').hide();
	        current_page = 1;
	        catid = 0;
	        $('#load_more_wrap').hide();
	        if (bycaichanpin == 1)
			{
				caipin_list(0);
				return;
			}
			chanpin_pop_menu_item_a = 'chanpin_pop_menu_item_a0';
			chanpin_list();
		});
	});
}

function xincaituijian()
{
	$('#page2').html(func_caichanpin_list_html(1) );
	touch_btn ('back_icon2');
	xinpin = 1;
	$('#back_icon2').singleTap(function (){
		xinpin = 0;
		$('#zhezhao').hide();
		scrollRight();
	});
	catid = 0;
	current_page = 1;
	paixu = 1;
	bycaichanpin = 1;
	$('#header_h02_i01').singleTap(h02fenlei);
	$('#header_h02_i02').singleTap(h02paixu);
	$('#header_h02_i03').singleTap(h02chanpin);
	$('#wrapper2').css('top', '5.3em');
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	$('#load_more_wrap').hide();
	caipin_list(0);
}

function caipinzhanshi()
{
	$('#page2').html(func_caichanpin_list_html(3) );
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(function (){
		$('#zhezhao').hide();
		scrollRight();
	});
	bycaichanpin = 1;
	catid = 0;
	current_page = 1;
	paixu = 1;
	$('#header_h02_i01').singleTap(h02fenlei);
	$('#header_h02_i02').singleTap(h02paixu);
	$('#wrapper2').css('top', '5.3em');
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	$('#load_more_wrap').hide();
	caipin_list(0);
}

function caipin_list(isshoucang)
{
	my_toast ('加载数据中...');
	if (isshoucang)
	{
		var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
		url += 'shoucang_list' + '&uid=' + getLocalStorge('uid');
		url += '&page=' + current_page;
		var timeParam = Math.round(new Date().getTime()/1000);
		url += "&timenow="+ timeParam;
		$.getJSON(url, function(data)
		{
			my_toast ('', 'hide');
			parse_caipin_jsonlist(data);
			if( current_page == 1 )
			{
				$('#load_more_wrap').show();
				$('#load_more_wrap').html( $('#load_more_wrap').html() ); //重置html，防止事件重复定义
				touch_bg('#load_more', 'bg_gra01');
				
		        $('#load_more').singleTap(function()
		        {
		        	caipin_list(1);
		        });
			}
			$('.list01_item').each(function(index)
			{
		        touch_bg(this, 'bg_green01');
		        $(this).singleTap(function()
		        {
		        	scrollLeft();
		        	caipin_detail($(this).attr('data-id') , 0);
		        });
			});
			setTimeout(function ()
			{
				myScroll2.refresh();
				if( current_page == 1 )
				{
					myScroll2.scrollToPage(0, 0, 200);
				}
			}, 1000);
			current_page += 1;
		});
		return;
	}
    var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
    url += 'dishes_list';
    if(catid > 0 )
    {
        url += '&catid='+ catid;
    }
    url += '&paixu=' + paixu;
    if(xinpin == 1)
    {
        url += '&xinpin=1';
    }
    url += '&page=' + current_page;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast ('', 'hide');
		parse_caipin_jsonlist(data);
		if( current_page == 1 )
		{
			$('#load_more_wrap').show();
			$('#load_more_wrap').html( $('#load_more_wrap').html() ); //重置html，防止事件重复定义
			touch_bg('#load_more', 'bg_gra01');
			$('#load_more').singleTap(function()
	        {
	        	caipin_list(0);
	        });
		}
		$('.list01_item').each(function(index)
		{
	        touch_bg(this, 'bg_green01');
	        $(this).singleTap(function()
	        {
	        	scrollLeft();
	        	caipin_detail($(this).attr('data-id') , 1);
	        });
		});
		setTimeout(function ()
		{
			myScroll2.refresh();
		}, 1000);
		current_page += 1;
	});
}

function parse_caipin_jsonlist(data)
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
			<div class="list01_item_r_zhaiyao">'+data[i].description+'</div><div class="list01_item_r_other">收藏：'+data[i].shoucang_num+' 阅读：'+data[i].yuedu_num+'</div></div></div>';
	}
	$('#list01').html(h);
}

function shoucang(pid)
{
	var uid = getLocalStorge('uid');
	if (!uid)
	{
		login_return = 3;
		login_confirm_p4();
		return;
	}
	my_toast('收藏中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=shoucang_add';
	url += '&uid='+ uid+ '&caipinid='+ pid;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		if (data == 'ok') 
		{
			my_toast('收藏成功', 2500);
			return;
		}
		if (data == 'existed')
		{
			my_toast('已收藏过', 2500);
			return;
		}
		my_toast('收藏失败', 2500);
	});
}
function caipin_detail(pid ,showshoucang)
{
	$('#page3').html( func_caipin_detail_html(showshoucang) );
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap(scrollRight);
	if (showshoucang)
	{
		touch_btn ('shoucang_icon');
		$('#shoucang_icon').singleTap(function(){ shoucang(pid); });
	}
	my_toast ('加载数据中...');
    var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'dishes_detail&pid=' + pid;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data){
		my_toast ('', 'hide');
		var h = '<div style="background:url('+ data.datu[0]['url']+ '_mobile.jpg);" class="caipin_detail_img"></div>';
		h += '<div class="detail_wrap"><div class="detail_title">'+data.title+'</div>';
		if (data.description != '') 
		{
			h += '<div class="detail_des fenge01">' + data.description + '</div>';
		}
		h += '<div class="detail_com01 fenge01"><div class="detail_shoucang"><span class="detail_com01_icon detail_shoucang_icon"></span>'
		+data.shoucang_num+ '人收藏</div><div class="detail_liulan"><span class="detail_com01_icon detail_liulan_icon"></span>'+ data.yuedu_num+'人浏览</div></div>';
		if (data.zhuliao)
		{
			h += '<div class="detail_zhuliao fenge01"><span class="detail_zhuliao01">主料：</span>\
				<span class="detail_zhuliao02">'+data.zhuliao+'</span></div>';
		}
		if (data.peiliao)
		{
			h += '<div class="detail_peiliao"><span class="detail_peiliao01">配料：</span>\
				<span class="detail_peiliao02">'+ data.peiliao+ '</span></div>';
		}
		if (data.zhizuofangfa)
		{
			h += '<div class="detail_zhizuo01">制作方法：</div>\
				<div class="detail_zhizuo02">' + data.zhizuofangfa + '</div>';
		}
		
		h += '<div class="table_title">相关产品</div><ul class="menu_list01">\
			<li data-id="'+ data.xiangguanchanpin[0]['id']+ '" class="caipin_detail_xiangguan02 menu_item02 menu_item01_t menu_item01_b">'
			+ data.xiangguanchanpin[0]['title']+ '<span class="m01_right_arrow"></span></li></ul><div class="form_bottom"></div></div>';
        $('#scroller3').append(h);
        $('.caipin_detail_xiangguan02').each(function(index)
        {
	        touch_bg(this, 'bg_gra01');
	        $(this).singleTap(function(){
		        var pid = $(this).attr('data-id');
		        chanpin_detail(pid);
	    	});
		});
		setTimeout(function () {
			myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
		}, 1500);
	});
}