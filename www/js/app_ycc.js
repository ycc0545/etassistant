function initPushwoosh() {
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
    
    pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"PUSHWOOSH_APP_ID", appname:"APP_NAME"},
                                    function(status) {
                                    var deviceToken = status['deviceToken'];
                                    console.warn('registerDevice: ' + deviceToken);
                                    },
                                    function(status) {
                                    console.warn('failed to register : ' + JSON.stringify(status));
                                    navigator.notification.alert(JSON.stringify(['failed to register ', status]));
                                    }
                                    );
    
    pushNotification.setApplicationIconBadgeNumber(0);
    
    document.addEventListener('push-notification', function(event) {
                              var notification = event.notification;
                              navigator.notification.alert(notification.aps.alert);
                              pushNotification.setApplicationIconBadgeNumber(0);
                              });
}

function cb_update_tips( buttonIndex )
{
	if (buttonIndex == 2)
    {
		window.open(new_version_url, '_system');
    }
}

function app_update()
{

	var url = 'http://www.jcczfood.com/chupdate.php?jsoncallback=?';
	url += '&phonegap=1&version=' + app_version + '&platform=' + app_platform;
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	my_toast('加载数据中...');
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		if (data['new_version'] == 0)
		{
			my_toast('该版本已是最新', 2500);
			return;
		}
		if (data['new_version'] == 1)
		{
			new_version_url = data['new_version_url'];
			navigator.notification.confirm(
		        '新版本特性：' + data['new_version_feature'],
		         cb_update_tips, 
		        '升级提示提示',
		        '下次再说,立即更新'
		    );
			return;
		}
	});
}

function cb_clear_cache(buttonIndex)
{
    if (buttonIndex == 2)
    {
    	my_toast('清除缓存成功', 2500);
    }
}
function clear_cache()
{
	navigator.notification.confirm(
        '确定清除缓存？',
         cb_clear_cache, 
        '提示',
        '取消,确定'
    );
}
function myFun(result){
    var cityName = result.name;
    map.setCenter(cityName);
    alert(cityName);
}

function onDeviceReady()
{
    //initPushwoosh();
    if ( parseInt( window.device.version ) == 7)
    {
        $('.page_container').css('top', '20px');
    }
    //getLocation();
	//localStorage.setItem("cart", '{}' );
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	currentIndex = 0;
	pages = [$('#page1'), $('#page2'), $('#page3'), $('#page4')];
	touch_bg ('#login_submit', 'ycc_btn01_on');
    $('#login_submit').singleTap( function ()
	{
		scrollLeft();
		$('#page2').html(menu_page_html);
		$('.menu_item').each(function(index)
		{
			var mid = $(this).attr('id');
			touch_bg (this, 'bg_blue02');
			$(this).singleTap(function()
			{
				scrollLeft();
				switch (mid)
				{
					case 'menu_xingchengdan' :
						menu_xingchengdan();
						break;
					case 'menu_youkemingdan' :
						menu_youkemingdan();
						break;
					case 'menu_youkeqiandao' :
						menu_youkeqiandao();
						break;
					case 'menu_fenfang' :
						menu_fenfang();
						break;
					case 'menu_daishoukuan' :
						menu_daishoukuan();
						break;
					case 'menu_duanxinfasong' :
						menu_duanxinfasong();
						break;
					case 'menu_set' :
						menu_set();
						break;
				}
			});
		});
	});
}
function onLoad()
{
    document.addEventListener("deviceready", onDeviceReady, false);
}