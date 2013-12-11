function fuwuzhichi()
{
	$('#page2').html(fuwu_list_html);
	touch_btn ('back_icon2');
	$('#back_icon2').singleTap(scrollRight);
	myScroll2 = new iScroll('wrapper2', { checkDOMChanges: false});
	$('.fuwu_mi01').each(function(index){
        touch_bg(this, 'bg_gra01');
        $(this).singleTap(function(){
        	scrollLeft();
	        var mid = $(this).attr('id');
	        if (mid == 'yonghuliuyan')
	        {
				yonghuliuyan();
				return;
			}
	        switch (mid)
	        {
	        	case 'qiyewenhua':
	        		$('#page3').html( func_pagecom_html(3, '企业文化') );
	                $('#scroller3').html(qiyewenhua_html);
	                break;
	            case 'qiyexuanyan':
	            	$('#page3').html( func_pagecom_html(3, '企业宣言') );
	                $('#scroller3').html(qiyexuanyan_html);
	                break;
	            case 'zhici':
	            	$('#page3').html( func_pagecom_html(3, '董事长致辞') );
	                $('#scroller3').html(zhici_html);
	                break;
	            case 'logobiaozhi':
	            	$('#page3').html( func_pagecom_html(3, 'LOGO标志') );
	                $('#scroller3').html(logobiaozhi_html);
	                break;
	            case 'lianxifangshi':
	            	$('#page3').html( func_pagecom_html(3, '联系方式') );
	                $('#scroller3').html(lianxifangshi_html);
	                break;
	        }
	        touch_btn ('back_icon3');
			$('#back_icon3').singleTap(scrollRight);
			myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
			setTimeout(function () {
		        myScroll3.refresh();
		    }, 1300);
    	});
	});
}

function yonghuliuyan()
{
	$('#page3').html( yonghuliuyan_html );
	touch_btn ('back_icon3');
	$('#back_icon3').singleTap(scrollRight);
	touch_btn ('list_icon3');
	$('#list_icon3').singleTap( liuyan_list );
	myScroll3 = new iScroll('wrapper3', { checkDOMChanges: false});
	pagecom_txa_action('liuyan_item01' , 4);
	touch_bg('liuyan_submit', 'ycc_btn01_on');
	$('#liuyan_submit').singleTap(function()
	{
		var url = 'http://www.jcczfood.com/index.php?m=content&c=index&a=lists&catid=32&from=mobile';
		var timeParam = Math.round(new Date().getTime()/1000);
		url += "&timenow="+ timeParam;
		my_toast('修改中...');
		var pdata = { dosubmit : 1,
				username : $('#username .m01_right_in').val(),
				email : $('#email .m01_right_in').val(),
				content : $('#content .m01_right_in').val()
			};
		$.post(url, pdata, function(data)
		{
			if(data == 'data_null')
			{
				my_toast("姓名、邮箱和内容不能为空", 2500);
				return;
			}
			if(data == 'fail')
			{
				my_toast("留言失败", 2500);
				return;
			}
			if(data == 'ok')
			{
				my_toast("留言成功", 2500);
			}
		});
	});
	setTimeout(function () {
        myScroll3.refresh();
    }, 1300);
}
function liuyan_list()
{
	$('#page4').html(func_pagecom_html(4, '留言列表'));
	touch_btn ('back_icon4');
	$('#back_icon4').singleTap(scrollRight);
	myScroll4 = new iScroll('wrapper4', { checkDOMChanges: false});
	scrollLeft();
	my_toast('加载数据中...');
	var url = 'http://www.jcczfood.com/index.php?m=content&c=ycc_api&jsoncallback=?&a=liuyan_list';
	var timeParam = Math.round(new Date().getTime()/1000);
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data)
	{
		my_toast('', 'hide');
		var len = data.length;
		var h = '';
		for(var i = 0 ; i < len ; i++)
		{
			h +=  '<div class="liuyanliebiao_item"><div><span class="liuyanliebiao_uname">'+ data[i].username+ '</span><span class="liuyanliebiao_date">'+ data[i].addtime+ '</span></div><div class="liuyanliebiao_content">' + data[i].content + '</div></div>';
			if(data[i].admin_content)
			{
				h +=  '<div class="liuyanliebiao_item_admin"><div><span class="liuyanliebiao_uname">管理员</span><span class="liuyanliebiao_date">' + data[i].admin_addtime + '</span></div><div class="liuyanliebiao_content">' + data[i].admin_content + '</div></div>';
			}
		}
		$('#scroller4').html(h);
		setTimeout(function ()
		{
			myScroll4.refresh();
		}, 1000);
	});
}