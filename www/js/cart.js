function addtocart(pid)
{
	var cart_str = getLocalStorge('cart');
	var cart_arr = JSON.parse(cart_str);
	if(cart_arr[pid])
	{
		my_toast('购物车已有该产品', 2500);
		return;
	}
	my_toast('加入购物车成功', 2500);
	cart_arr[pid] = 1;
	localStorage.setItem("cart", JSON.stringify(cart_arr) );
}

function show_cart_list()
{
	var cart_str = getLocalStorge('cart');
	if(cart_str == '{}')
	{
		$('#scroller1').html('<div class="alert alert_warning">购物车为空</div><div class="form_bottom"></div>');
		setTimeout(function ()
		{
			myScroll1.refresh();
		}, 1000);
		return;
	}
	var cart_arr = JSON.parse(cart_str);
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=';
	url += 'api_cart_detail&cart='+ cart_str.replace(/"/g,"'");
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		var len = data.length;
		var groupid = getLocalStorge('groupid');
		var h = '';
		var all_price = 0.00;
		for (var i = 0; i < len; i++)
		{
            var thumb = 'img/list_default.jpg';
			if (data[i].thumb != '')
			{
				thumb = data[i].thumb+ '_mobile.jpg';
        	}
			var price = 0;
			switch(groupid)
			{
				case '9': price = data[i].putong_price; break;
				case '10': price = data[i].daili_price; break;
				case '11': price = data[i].gongxiao_price; break;
			}
			all_price += price * cart_arr[data[i].id];
			price = toDecimal2(price);
			
			h += '<div id="cart_list_item' + data[i].id + '" class="list01_item bg_wh">\
				<div class="list01_item_l"><img class="list01_item_l_img" src="'+ thumb+ '"></div>\
				<div class="list01_item_r"><div class="list01_item_r_title">品名：'+ data[i].title+ '</div>\
				<div class="list01_item_r_other mt_07">价格：￥'+ price+ '</div>\
				<div class="list01_item_r_other mt_07" style="position:relative;">数量：\
				<input data-price="'+ price+ '" data-id="' + data[i].id + '" class="cart_list_num_in" type="text" value="' + cart_arr[data[i].id] + '" />\
				<span class="cart_list_delete" data-id="' + data[i].id + '"></span></div></div></div>';
		}
		all_price = toDecimal2( all_price );
		h += '<div class="cart_list_allprice">总价：￥<span id="cart_list_allprice_text">' + all_price + '</span></div>\
			<div class="cart_list_btns"><div id="cart_list_update" class="ycc_btn01">刷新购物车</div>\
			<div id="cart_list_next" class="ycc_btn01">下一步</div></div><div class="form_bottom"></div></div>';
		$('#scroller1').html(h);
		$('.cart_list_delete').each(function(index)
		{
			$(this).singleTap(function()
			{
				cart_delete_id = $(this).attr('data-id');
				cart_list_delete();
			});
		});
		touch_bg('#cart_list_update', 'ycc_btn01_on');
		$('#cart_list_update').singleTap(function()
		{
			var ddallprice = 0.00;
			$('.cart_list_num_in').each(function(index)
			{
				var ddid = $(this).attr('data-id');
				var ddprice = $(this).attr('data-price');
				var ddnum = $(this).val();
				if (ddnum < 0 || ddnum != parseInt( ddnum ) )
				{
					ddnum = 1;
				}
				$(this).val(ddnum);
				var cart_str = getLocalStorge('cart');
				var cart_arr = JSON.parse(cart_str);
				cart_arr[ddid] = ddnum;
				localStorage.setItem("cart", JSON.stringify(cart_arr) );
				ddallprice += ddnum * ddprice;
			});
			$('#cart_list_allprice_text').html(toDecimal2( ddallprice ));
			my_toast('刷新成功', 2500);
		});
		touch_bg('#cart_list_next', 'ycc_btn01_on');
		$('#cart_list_next').singleTap(function(){ cart_uinfo(2); });
		setTimeout(function ()
		{
			myScroll1 = new iScroll('wrapper1', { checkDOMChanges: false});
        }, 1000);
	});
}
function cart_uinfo(p)
{
	var cart_uinfo_html = '<div id="header2" class="header">\
		<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">收货信息</span>\
		</div><div id="wrapper2" class="wrapper_nofooter">\
		<div id="scroller2" class="scroller bg_gra"><ul class="menu_list01">\
		<li id="cart_uinfo_shouhuoren" class="cart_uinfo_item menu_item02 menu_item01_t">\
			<span class="m01_left">收货人</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
		</li><li id="cart_uinfo_shouhuotel" class="cart_uinfo_item menu_item02">\
			<span class="m01_left">手机</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
		</li><li id="cart_uinfo_shouhuodizhi" class="cart_uinfo_item menu_item02 menu_item01_b">\
			<span class="m01_left">收货地址</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
		</li></ul><div id="cart_uinfo_submit" class="ycc_btn01">提交订单</div><div class="form_bottom"></div></div></div>';
	$('#page2').html(cart_uinfo_html);
	$('#cart_uinfo_shouhuoren .m01_right_in').val( getLocalStorge('sh_name') );
	$('#cart_uinfo_shouhuotel .m01_right_in').val( getLocalStorge('sh_tel') );
	$('#cart_uinfo_shouhuodizhi .m01_right_in').val( getLocalStorge('sh_address') );
	pagecom_txa_action('cart_uinfo_item' , 3);
	scrollLeft();
	touch_btn ('back_icon2');
	touch_bg('#cart_uinfo_submit', 'ycc_btn01_on');
	$('#back_icon2').singleTap(scrollRight);
	$('#cart_uinfo_submit').singleTap(submit_order);
}
function submit_order()
{
	var sh_name = $('#cart_uinfo_shouhuoren .m01_right_in').val();
	var sh_tel = $('#cart_uinfo_shouhuotel .m01_right_in').val();
	var sh_address = $('#cart_uinfo_shouhuodizhi .m01_right_in').val();
	if (!sh_name || !sh_tel || !sh_address)
	{
		my_toast('收货人、手机和收货地址不能为空', 2500);
		return;
	}
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&a=api_add_order';
	var uid = getLocalStorge('uid');
	var groupid = getLocalStorge('groupid');
	var username = getLocalStorge('username');
	var cart_str = getLocalStorge('cart');
	cart_str = cart_str.replace(/"/g,"'");
	my_toast('提交中...');
	url += '&uid=' + uid + '&groupid=' + groupid;
	$.post(url, { username: username, cart: cart_str, sh_name: sh_name, sh_tel: sh_tel, sh_address: sh_address }, function(data)
	{
		if (data == 3) 
		{
			my_toast('订单成功' , 2500);
			setTimeout(function()
			{
				scrollRight();
				footer_menu02();
			}, 2500);
			localStorage.setItem("cart", '{}');
			return;
		}
		my_toast('订单失败' , 2500);
	})
}