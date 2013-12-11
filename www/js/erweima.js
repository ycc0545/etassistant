function erweimasaomiao()
{
	$('#page2').html(erweimasaomiao_html);
	touch_btn ('back_icon2');
	touch_bg('#erweima_scan', 'ycc_btn01_on');
	touch_bg('#erweima_submit', 'ycc_btn01_on');
	$('#back_icon2').singleTap(scrollRight);
	$('#erweima_scan').singleTap( function()
	{
		cordova.plugins.barcodeScanner.scan(
	      function (result) {
	      	$('#erweima_pnum').val( result.text );
	      }, 
	      function (error) {
	          my_toast('扫描失败', 2500);
	      }
	   );
	});
	$('#erweima_submit').singleTap( function()
	{
		var pnum = $('#erweima_pnum').val();
		var tel = $('#erweima_tel').val();
		if(pnum == '' || tel == '')
		{
			my_toast('产品码和手机号不能为空', 2500);
			return;
		}
		if ( !(/^1[3|4|5|8][0-9]\d{4,8}$/.test( tel )) )
		{
			my_toast('手机号有误', 2500);
			return;
		}
		my_toast ('发送中...');
		var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=erweimasaomiao';
		localStorage.setItem('erweima_tel', tel);
		url += '&pnum='+ pnum+ '&tel='+ tel;
		var timeParam = Math.round(new Date().getTime()/1000);
		url += "&timenow="+ timeParam;
		$.getJSON(url, function(data)
		{
			my_toast('发送成功，请留意手机短信。', 2500);
		});
	});
}