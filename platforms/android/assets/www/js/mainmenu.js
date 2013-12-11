function footer_onstyle(i)
{
	$('.footer_item').removeClass('footer_current');
	$('#fmenu_0' + i).addClass('footer_current');
}
function menu_xingchengdan()
{
	$('#page3').html(func_pagecom_html(3, '行程单'));
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
	var url = 'http://itms.yinhebus.com/api/app/Tourguide/TravelList.ashx?';
	url += 'GuideCode=' + getLocalStorge('GuideCode') + '&StartDate=2013-11-10';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast ('加载中', 0);
	$.getJSON(url, function(data)
	{
		my_toast ('加载中', 1);
		var len = data.length;
		var h = '<table class="table01" cellspacing="0"><tr class="table_header"><th>行程名称</th>\
		<th style="width:5.6em;">时间</th><th style="width:3em;">操作</th></tr>';
		for (var i = 0; i < len; i++)
		{ 
			h += '<tr><td>' + data[i]['行程名称'] + 
				'</td><td>' + data[i]['出发日期'] + 
				'</td><td><div class="list01_item_btn label label_btn" data-url="' + data[i]['PDFUrl'] + '">下载</div></td></tr>';
		}
		h += '</table>';
		$('#scroller3').html(h);
		$('.list01_item_btn').each(function(index)
		{
			touch_bg (this, 'label_btn_on');
			$(this).singleTap( function()
			{
				var url = $(this).attr('data-url');
				if (!url)
				{
					my_toast ('暂无链接', 2500);
					return;
				}
				window.open(url, "_system", "location=no");
			});
		});
		setTimeout(function ()
	    {
	        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	    }, 1000);
	});
}

function menu_youkemingdan()
{
	$('#page3').html(func_pagecom_html(3, '游客名单'));
	var url = 'http://itms.yinhebus.com/api/app/Tourguide/TouristList.ashx?';
	url += 'GuideCode=' + getLocalStorge('GuideCode') + '&StartDate=2013-11-10';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast ('加载中', 0);
	$.getJSON(url, function(data)
	{
		my_toast ('加载中', 1);
		var len = data.length;
		var h = '';
		for (var i = 0; i < len; i++)
		{   
			var tel = '暂无';
			if (data[i]['联系电话'])
			{
				tel = data[i]['联系电话'];
			}
			h += '<div class="list01_item">\
			<div class="list01_item_header"><span class="list01_01a">'+ data[i]['游客姓名']+ '</span>\
			<span class="list01_01b">'+ data[i]['类型']+ '</span><span class="list01_01b">'+ data[i]['性别']+ '</span></div>\
			<div class="list01_item_other">手机号：'+ tel +'</div>\
			</div>';
		}
		$('#scroller3').append(h);
		setTimeout(function ()
	    {
	        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	    }, 1000);
	});
    
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
}

function menu_youkeqiandao()
{
	$('#page3').html(func_pagecom_html(3, '游客签到'));
    var url = 'http://itms.yinhebus.com/api/app/Tourguide/TouristList.ashx?';
	url += 'GuideCode=' + getLocalStorge('GuideCode') + '&StartDate=2013-11-10';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast ('加载中', 0);
	$.getJSON(url, function(data)
	{
		my_toast ('加载中', 1);
		var len = data.length;
		var h = '';
		for (var i = 0; i < len; i++)
		{    
			var s1 = '';
			var s2 = '';
			var s3 = '';
			var st1 = '未签到';
			var st2 = '未签到';
			var st3 = '未签到';
			if (data[i]['上车签到'] == 'True')
			{
				s1 = 'label_selected';
				st1 = '已签到';
			}
			if (data[i]['返程签到'] == 'True')
			{
				s2 = 'label_selected';
				st2 = '已签到';
			}
			if (data[i]['收款状态'] == 'True')
			{
				s3 = 'label_selected';
				st3 = '已签到';
			}
			h += '<div class="list01_item">\
			<div class="list01_item_header"><span>'+ data[i]['游客姓名']+ '</span>\
			<span>'+ data[i]['类型']+ '</span></div>\
			<table class="table01" cellspacing="0"><tr><td style="width:6em;">上车签到</td><td><div class="list01_item_button label ' + s1 + '" data-id="' + data[i]['id'] + '" data-type="StartSign">' + st1 + '</div></td></tr>\
			<tr><td>返程签到</td><td><div class="list01_item_button label ' + s2 + '" data-id="' + data[i]['id'] + '" data-type="BackSign">' + st2 + '</div></td></tr>\
			<tr><td>收款签到</td><td><div class="list01_item_button label ' + s3 + '" data-id="' + data[i]['id'] + '" data-type="PaySign">' + st3 + '</div></td></tr>\
			</table></div>';
		}
		$('#scroller3').append(h);
		qiandao_listen();
		setTimeout(function ()
	    {
	        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	    }, 1000);
	});
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
}

function menu_fenfang()
{
	$('#page3').html(func_pagecom_html(3, '分房'));
    var url = 'http://itms.yinhebus.com/api/app/Tourguide/TouristList.ashx?';
	url += 'GuideCode=' + getLocalStorge('GuideCode') + '&StartDate=2013-11-10';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast ('加载中', 0);
	$.getJSON(url, function(data)
	{
		my_toast ('加载中', 1);
		var len = data.length;
		var h = '<div class="list01_item">\
			<div class="list01_item_ffbtn label label_btn">分房</div>\
			<div><div>房间名单：</div>\
			<div id="fenfang_temp">暂无</div>\
			</div></div>';
		for (var i = 0; i < len; i++)
		{    
			var tel = '暂无';
			if (data[i]['联系电话'])
			{
				tel = data[i]['联系电话'];
			}
			h += '<div class="list01_item">\
			<div class="list01_item_trbtn label label_btn" data-id="list_item_' + data[i]['id'] + '" data-tel="' + tel + '">加入房间</div>\
			<div class="list01_item_header"><span class="list01_01a">'+ data[i]['游客姓名']+ '</span>\
			<span class="list01_01b">'+ data[i]['类型']+ '</span></div>\
			<div class="list01_item_other">手机号:' + tel + '</div>\
			</div>';
		}
		$('#scroller3').append(h);
		$('.list01_item_trbtn').each(function(index)
		{
			touch_bg (this, 'label_btn_on');
			$(this).singleTap( function()
			{
				var id = $(this).attr('data-id');
				if ($('#fenfang_temp').html() == '暂无')
				{
					$('#fenfang_temp').html('');
				}
				$('#fenfang_temp').append( '<div>' + id + '</div>');
				my_toast('加入房间成功', 2500);
			});
		});
		setTimeout(function ()
	    {
	        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	    }, 1000);
	});
    
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
}

function menu_daishoukuan()
{
	$('#page3').html(func_pagecom_html(3, '代收款'));
    setTimeout(function ()
    {
        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
    }, 1000);
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
}

function menu_duanxinfasong()
{
	$('#page3').html(func_pagecom_html(3, '短信发送'));
    var url = 'http://itms.yinhebus.com/api/app/Tourguide/TouristList.ashx?';
	url += 'GuideCode=' + getLocalStorge('GuideCode') + '&StartDate=2013-11-10';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast ('加载中', 0);
	$.getJSON(url, function(data)
	{
		my_toast ('加载中', 1);
		var len = data.length;
		var h = '';
		for (var i = 0; i < len; i++)
		{   
			var tel = '暂无';
			if (data[i]['联系电话'])
			{
				tel = data[i]['联系电话'];
			}
			h += '<div class="list01_item">\
			<div class="list01_item_trbtn label label_btn" data-id="list_item_' + data[i]['id'] + '" data-tel="' + tel + '">发短信</div>\
			<div class="list01_item_header"><span class="list01_01a">'+ data[i]['游客姓名']+ '</span>\
			<span class="list01_01b">'+ data[i]['类型']+ '</span></div>\
			<div class="list01_item_other">手机号:' + tel + '</div>\
			</div>';
		}
		$('#scroller3').append(h);
		$('.list01_item_trbtn').each(function(index)
		{
			touch_bg (this, 'label_btn_on');
			$(this).singleTap( function()
			{
				var tel = $(this).attr('data-tel');
				window.location.href = 'sms:'+ tel +'?body=你好你好你好';
			});
		});
		setTimeout(function ()
	    {
	        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	    }, 1000);
	});
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
}

function menu_set()
{
	$('#page3').html(func_pagecom_html(3, '设置'));
	$('#scroller3').html(set_main_html);
    setTimeout(function ()
    {
        myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
    }, 1000);
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap( function ()
	{
		scrollRight();
	});
	$('#aboutus').singleTap( function ()
	{
		scrollLeft();
		$('#page4').html(func_pagecom_html(4, '关于我们'));
		$('#scroller4').html('关于我们关于我们');
		touch_btn ('back_icon4');
		$('#back_icon4').singleTap( function ()
		{
			scrollRight();
		});
	});
	$('#quit').singleTap( function ()
	{
		scrollRight();
		scrollRight();
	});
}