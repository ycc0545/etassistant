function my_toast (tex,t)
{
	$('#my_toast_text').text(tex);
	$('#my_toast').show();
	if (t == 'hide')
	{
		$('#my_toast').hide();
		return;
	}
	if (t == 0)
	{
		$('#my_toast_loading').show();
		return;
	}
	$('#my_toast_loading').hide();
	setTimeout(function(){ $('#my_toast').hide(); }, t);
}
function onConfirm(button)
{
	if(button==1) navigator.app.exitApp(); //选择了确定才执行退出
}
function onBackKeyDown()
{
    navigator.notification.confirm(
        '按确定退出程序!',  // message
        onConfirm,              // callback to invoke with index of button pressed
        '确定要退出程序吗?',            // title
        '确定,取消'          // buttonLabels
    );
}
function cb_login_confirm_p2(buttonIndex)
{
    if (buttonIndex == 2)
    {
    	$('#page2').html( func_user_login_html(2) );
    	scrollLeft();
    	touch_btn ('back_icon2');
    	touch_bg('#login_submit', 'ycc_btn01_on');
		$('#back_icon2').singleTap(scrollRight);
		$('#login_submit').singleTap(login);
    }
}
function cb_login_confirm_p4(buttonIndex)
{
    if (buttonIndex == 2)
    {
    	$('#page4').html( func_user_login_html(4) );
    	scrollLeft();
    	touch_btn ('back_icon4');
    	touch_bg('#login_submit', 'ycc_btn01_on');
		$('#back_icon4').singleTap(scrollRight);
		$('#login_submit').singleTap(login);
    }
}
function login_confirm_p2()
{
    navigator.notification.confirm(
        '请先登录，再进行操作！',
         cb_login_confirm_p2, 
        '提示',
        '返回,确定'
    );
}
function login_confirm_p4()
{
    navigator.notification.confirm(
        '请先登录，再进行操作！',
         cb_login_confirm_p4, 
        '提示',
        '返回,确定'
    );
}
function cb_cart_list_delete(buttonIndex)
{
    if (buttonIndex == 2)
    {
    	var cart_str = getLocalStorge('cart');
    	var cart_arr = JSON.parse(cart_str);
    	var ddprice = $('#cart_list_item' + cart_delete_id + ' .cart_list_num_in' ).attr('data-price');
    	var ddnum = $('#cart_list_item' + cart_delete_id + ' .cart_list_num_in' ).val();
		var all_price = $('#cart_list_allprice_text').html();
		delete cart_arr[cart_delete_id];
		
		localStorage.setItem("cart", JSON.stringify(cart_arr) );
		cart_str = getLocalStorge('cart');
		if(cart_str == '{}')
		{
			$('#scroller1').html('<div class="alert alert_warning">购物车为空</div><div class="form_bottom"></div>');
			setTimeout(function ()
			{
				myScroll1.refresh();
			}, 1000);
			return;
		}
		all_price -= ddprice * ddnum;
		all_price = toDecimal2( all_price );
		$('#cart_list_allprice_text').html( all_price );
		$('#cart_list_item' + cart_delete_id ).hide();
		my_toast('删除成功', 2500);
    }
}
function cart_list_delete()
{
    navigator.notification.confirm(
        '确定删除？',
         cb_cart_list_delete, 
        '提示',
        '取消,确定'
    );
}