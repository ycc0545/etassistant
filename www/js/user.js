function login()
{
	$('#username').blur();
	$('#pwd').blur();
	window.scrollTo(0, 0);
	var username = $('#username').val();
	var pwd = $('#pwd').val();
	if ( !username || !pwd)
	{
		my_toast ('账号和密码不能为空', 2500);
		return;
	}
	my_toast ('登录中...', 2500);
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_login_reg&dologin=1&jsoncallback=?';
	username = b64.encode(username);
	pwd = b64.encode(pwd);
	url += '&username='+ username+ '&password='+ pwd;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		if(data.status == 3)
		{
			my_toast('登录成功', 2500);
			localStorage.setItem('uid', data.uid);
			localStorage.setItem('username', data.username);
			localStorage.setItem('groupid', data.groupid);
			localStorage.setItem('avatar', data.avatar);
			localStorage.setItem('sh_name', data.sh_name);
			localStorage.setItem('sh_tel', data.sh_tel);
			localStorage.setItem('sh_address', data.sh_address);
			setTimeout(function ()
			{
				if(login_return == 1)
				{
					footer_menu02();
					scrollRight();
					return;
				}
				if(login_return == 2)
				{
					footer_menu03();
					scrollRight();
					return;
				}
				scrollRight();
			}, 2500);
			return;
		}
		my_toast('登录失败', 2500);
	})
}
function reg()
{
	$('#page2').html(user_reg_html);
	pagecom_txa_action('reg_item01', 3);
	pagecom_txa_action('reg_item02', 3, 1);
	scrollLeft();
	touch_btn ('back_icon2');
	touch_bg('#reg_submit', 'ycc_btn01_on');
	$('#back_icon2').singleTap(scrollRight);
	$('#reg_submit').singleTap(reg_submit);
}
function reg_submit()
{
	var username = $('#reg_username .m01_right_in').val();
	var password = $('#reg_pwd .m01_right_in').val();
	var password2 = $('#reg_repwd .m01_right_in').val();
	var email = $('#reg_email .m01_right_in').val();
	username = b64.encode(username);
	password = b64.encode(password);
	password2 = b64.encode(password2);
	email = b64.encode(email);
	my_toast('注册中...');
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_login_reg&doreg=1&jsoncallback=?';
	url += '&username='+ username+ '&password='+ password+ '&password2='+ password2+ '&email='+ email;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		if(data.status == 1)
		{
			my_toast('信息填写有误', 2500);
			return;
		}
		if(data.status == 3)
		{
			my_toast('注册成功', 2500);
			setTimeout(function ()
			{
				localStorage.setItem('uid',data.uid);
				localStorage.setItem('username',data.username);
				localStorage.setItem('groupid',data.groupid);
				localStorage.setItem('avatar','http://www.jcczfood.com/phpsso_server/statics/images/member/nophoto.gif');
				footer_menu02();
				scrollRight();
			}, 2500);
			
			return;
		}
		my_toast('未知错误', 2500);
	});
}
function user_order_list()
{
	$('#page2').html(func_pagecom_html(2, '我的订单'));
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	scrollLeft();
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&jsoncallback=?&a=ycc_api_myorder';
	url += '&uid='+ getLocalStorge('uid');
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		var len = data.length;
		my_toast ('', 'hide');
		var h = '';
		var status = '';
		for (var i = 0; i < len; i++)
		{
			status = '';
			switch ( data[i].status)
			{
				case '1' : status = "<span class='label label-important'>待付款</span>"; break; 
				case '2' : status = "<span class='label label-info'>处理中</span>"; break; 
				case '3' : status = "<span class='label label-success'>已发货</span>"; break; 
				case '4' : status = "<span class='label label-inverse'>已收货</span>"; break; 
				case '5' : status = "<span class='label'>已作废</span>"; break; 
			}
			h += '<div class="order_list_item" data-id="'+ data[i].bizorderid+ '"><div class="order_list_item01">' + status + '</div>\
				<div class="order_list_item02"><div class="order_list_item02_onum">订单号：'+ data[i].order_num +'</div><div class="order_list_item02_date">日期：'+ data[i].addtime+'</div>\
				<div class="order_list_item02_price">金额：￥'+ toDecimal2( data[i].all_price ) + '</div></div>\
				<div class="order_list_item03"><div class="order_list_item03_arrow"></div></div></div>';
		}
		$('#scroller2').html(h);
		$('.order_list_item').each(function(index)
		{
	        touch_bg(this, 'bg_green01');
	        $(this).singleTap(function()
	        {
		        var oid = $(this).attr('data-id');
		        user_order_detail(oid);
	    	});
	    });
		setTimeout(function ()
		{
			myScroll2.refresh();
		}, 1000);
	});
}
function user_order_detail(oid)
{
	$('#page3').html(func_pagecom_html(3, '订单详情'));
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap(scrollRight);
	$('#scroller3').html(order_detail_html);
	myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	scrollLeft();
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&jsoncallback=?&a=ycc_api_order_detail';
	url += '&oid=' + oid;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		if(data.status == '2')
		{
			var status = '';
			switch (data.data.status){
				case '1' : status = "待付款"; break; 
				case '2' : status = "处理中"; break; 
				case '3' : status = "已发货"; break; 
				case '4' : status = "已收货"; break; 
				case '5' : status = "已作废"; break; 
			}
			$('#order_detail_num').html(data.data.order_num);
			$('#order_detail_date').html(data.data.addtime);
			$('#order_detail_status').html(status);
			$('#order_detail_shname').html(data.data.consignee);
			$('#order_detail_tel').html(data.data.mobile);
			$('#order_detail_address').html(data.data.address);
			var h = '';
			for (var i in data.data.detail) {
				var item = data.data.detail[i];
				h += '<li class="menu_item02"><span>'+ item.title+ ' × '+ item.num+ '</span>\
				<span class="m01_right_t">￥'+ toDecimal2( item.total_price ) + '</span></li>';
			}
			h += '<li class="menu_item02"><span>购物小计</span>\
				<span class="m01_right_t">￥'+ toDecimal2( data.data.all_price ) + '</span></li>';
			h += '<li class="menu_item02"><span>运费</span>\
				<span class="m01_right_t">￥00.00</span></li>';
			h += '<li class="menu_item02 menu_item01_b"><span>合计金额</span>\
				<span class="m01_right_t">￥'+ toDecimal2( data.data.all_price ) + '</span></li>';
			$('#order_detail_detail').append( h );
		}
		setTimeout(function ()
		{
			myScroll3.refresh();
		}, 1000);
	});
}
function user_chpwd()
{
	$('#page2').html(func_pagecom_html(2, '修改密码'));
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	scrollLeft();
	$('#scroller2').html( user_chpwd_html );
	setTimeout(function ()
	{
		myScroll2.refresh();
	}, 1000);
	$('#chpwd_submit').singleTap( user_chpwd_submit );
	$('.chpwd_mi01').each(function(index)
	{
		var id = $(this).attr('id');
		$(this).singleTap(function()
		{
			var h = func_pagecom_txa_html(3, id, 1);
			$('#page3').html( h );
			scrollLeft();
			touch_btn ('back_icon3');
			$('#back_icon3').singleTap(scrollRight);
			touch_bg('#' + id + '_submit', 'ycc_btn01_on');
			$('#' + id + '_submit').singleTap(function()
			{
				var temp_v = $('#' + id + '_con').val();
				$('#' + id + ' .m01_right_in').val( temp_v );
				scrollRight();
			});
		});
	});
}
function user_shouhuoxinxi()
{
	$('#page2').html(func_pagecom_html(2, '收货地址'));
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	scrollLeft();
	$('#scroller2').html( user_shouhuoxinxi_html );
	setTimeout(function ()
	{
		myScroll2.refresh();
	}, 1000);
	
	$('#sh_name .m01_right_in').val( getLocalStorge('sh_name') );
	$('#sh_tel .m01_right_in').val( getLocalStorge('sh_tel') );
	$('#sh_address .m01_right_in').val( getLocalStorge('sh_address') );
	/*
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_chreceiptinfo&jsoncallback=?';
	url += '&uid='+ getLocalStorge('uid');
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		$('#sh_name .m01_right_in').val( data.detail.sh_name );
		$('#sh_tel .m01_right_in').val( data.detail.sh_tel );
		$('#sh_address .m01_right_in').val(data.detail.sh_address);
	});
	*/
	$('#shouhuoxinxi_submit').singleTap( user_shouhuoxinxi_submit );
	pagecom_txa_action('shouhuoxinxi_mi01' , 3);
}
function user_pinfo()
{
	$('#page2').html(func_pagecom_html(2, '个人信息'));
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	scrollLeft();
	$('#scroller2').html( user_pinfo_html );
	setTimeout(function ()
	{
		myScroll2.refresh();
	}, 1000);
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_chbaseinfo&jsoncallback=?';
	url += '&uid='+ getLocalStorge('uid');
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		$('#province .m01_right_in').val( data.detail.province );
		$('#city .m01_right_in').val( data.detail.city );
		$('#company .m01_right_in').val(data.detail.company);
		$('#realname .m01_right_in').val(data.detail.realname);
		$('#tel .m01_right_in').val(data.detail.tel);
		$('#qq .m01_right_in').val(data.detail.qq);
		$('#email .m01_right_in').val(data.detail.email);
		$('#address .m01_right_in').val(data.detail.address);
		$('#intro .m01_right_in').val(data.detail.intro);
	});
	$('#province').singleTap( select_province );
	$('#city').singleTap( select_city );
	$('#pinfo_submit').singleTap( user_pinfo_submit );
	pagecom_txa_action('pinfo_mi01' , 3);
}
function user_chpwd_submit()
{
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_chpwd&jsoncallback=?';
	var uid = getLocalStorge('uid');
	var password = $('#password .m01_right_in').val();
	var repassword = $('#repassword .m01_right_in').val();
	if (!password)
	{
		my_toast('密码不能为空', 2500);
		return;
	}
	if (password != repassword)
	{
		my_toast('两次密码不同', 2500);
		return;
	}
	
	password = b64.encode(password);
	repassword = b64.encode(repassword);
	url += '&uid='+ uid+ '&password='+ password+ '&repassword='+ repassword;
	my_toast('修改中...');
	$.getJSON(url, function(data)
	{
		my_toast(data.detail, 2500);
	});
}
function user_shouhuoxinxi_submit()
{
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_chreceiptinfo&jsoncallback=?';
	url += '&dosubmit=1&uid='+ getLocalStorge('uid');
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast('修改中...');
	var sh_name = $('#sh_name .m01_right_in').val();
	var sh_tel = $('#sh_tel .m01_right_in').val();
	var sh_address = $('#sh_address .m01_right_in').val();
	var pdata = { sh_name : sh_name,
				sh_tel : sh_tel,
				sh_address : sh_address
			};
	$.post(url, pdata, function(data)
	{
		if (data == 2)
		{
			my_toast('修改成功', 2500);
			localStorage.setItem("sh_name", sh_name );
			localStorage.setItem("sh_tel", sh_tel );
			localStorage.setItem("sh_address", sh_address );
			return;
		}
		my_toast('修改失败', 2500);
	});
}
function user_pinfo_submit()
{
	var url = 'http://www.jcczfood.com/index.php?m=member&c=index&a=ycc_api_chbaseinfo';
	url += '&dosubmit=1&uid='+ getLocalStorge('uid');
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast('修改中...');
	var pdata = { province : $('#province .m01_right_in').val(),
				city : $('#city .m01_right_in').val(),
				company : $('#company .m01_right_in').val(),
				realname : $('#realname .m01_right_in').val(),
				tel : $('#tel .m01_right_in').val(),
				qq : $('#qq .m01_right_in').val(),
				email : $('#email .m01_right_in').val(),
				address : $('#address .m01_right_in').val(),
				intro : $('#intro .m01_right_in').val()
			};
	$.post(url, pdata, function(data)
	{
		if (data == 2)
		{
			my_toast('修改成功', 2500);
			return;
		}
		my_toast('修改失败', 2500);
	});
}
function user_shoucang_list()
{
	$('#page2').html(func_caichanpin_list_html(4));
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	current_page = 1;
	$('#load_more_wrap').hide();
	scrollLeft();
	caipin_list(1);
}

function jifenchaxun()
{
	$('#page2').html( jifenchaxun_html );
    var tel01 = getLocalStorge('erweima_tel') ? getLocalStorge('erweima_tel') : '未填写';
	$('#jifenchaxun_tel').val( tel01 );
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	scrollLeft();
	touch_bg('#jifenchaxun_submit', 'ycc_btn01_on');
	$('#jifenchaxun_submit').singleTap( function()
	{
		var tel = $('#jifenchaxun_tel').val();
		if ( !(/^1[3|4|5|8][0-9]\d{4,8}$/.test( tel )) )
		{
			my_toast('手机号有误', 2500);
			return;
		}
		my_toast ('查询中...');
		var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=jifenchaxun';
		url += '&tel='+ tel;
		var timeParam = Math.round(new Date().getTime()/1000);
		url += "&timenow="+ timeParam;
		$.getJSON(url, function(data)
		{
			if ( data['message'] )
			{
				my_toast('查询失败', 2500);
				return;
			}
			my_toast('查询成功', 2500);
			$('#dangqianjifen').val( data['dangqian'] );
			$('#dongjiejifen').val( data['dongjie'] );
		});
	});
}