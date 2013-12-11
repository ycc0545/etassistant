function qiandao_listen()
{
	$('.list01_item_button').each(function(index)
	{
		$(this).singleTap( function()
		{
			var id = $(this).attr('data-id');
			var t = $(this).attr('data-type');
			var temp_this = this;
			var url = 'http://itms.yinhebus.com/api/app/Tourguide/TouristSign.ashx?';
			url += 'TouristID=' + id + '&SignType=' + t;
			var timeParam = Math.round(new Date().getTime()/1000);
			url += "&timenow="+ timeParam;
			my_toast ('提交中', 0);
			$.getJSON(url, function(data)
			{
				if(data['Type'] == 'Add')
				{
					my_toast ('签到成功', 2500);
					$(temp_this).addClass('label_selected');
					$(temp_this).html('已签到');
					return;
				}
				if(data['Type'] == 'Del')
				{
					my_toast ('取消签到', 2500);
					$(temp_this).removeClass('label_selected');
					$(temp_this).html('未签到');
					return;
				}
				my_toast ('签到出错', 2500);
			});
		});
	});
}