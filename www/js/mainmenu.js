function footer_onstyle(i)
{
	$('.footer_item').removeClass('footer_current');
	$('#fmenu_0' + i).addClass('footer_current');
}
function menu_xingchengdan()
{
	$('#page3').html(func_pagecom_html(3, '行程单'));
	$('#scroller3').html('<table class="table01" cellspacing="0"><tr class="table_header"><th>行程名称</th><th>时间</th></tr>\
		<tr><td>行程11</td><td>2013-12-08</td></tr>\
		<tr><td>行程11</td><td>2013-12-08</td></tr>\
		<tr><td>行程11</td><td>2013-12-08</td></tr></table>');
		alert('aabb');
window.open("http://192.168.137.1/aa.pdf", "_system", "location=no");
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

function menu_youkemingdan()
{
	$('#page3').html(func_pagecom_html(3, '游客名单'));
	var url = 'http://itms.yinhebus.com/api/app/Tourguide/TouristList.ashx?GuideCode=PC0000038';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		var len = data.length;
		var h = '';
		for (var i = 0; i < len; i++)
		{    
			h += '<div class="list01_item">\
			<div class="list01_01a">'+ data[i]['游客姓名']+ '</div>\
			<div class="list01_01b">'+ data[i]['类型']+ '</div></div>';
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

function menu_fenfang()
{
	$('#page3').html(func_pagecom_html(3, '分房'));
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
	window.location.href = "sms:13068890545?body=你好你好你好";
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
	$('#quit').singleTap( function ()
	{
		scrollRight();
		scrollRight();
	});
}