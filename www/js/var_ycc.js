﻿var app_version = 1.47;
var app_platform = 'ios';
var new_version_url = '';

var myScroll1;
var myScroll2;
var myScroll3;
var timer1;

var totalPags = 1;
var totop = 1;
var search_keyword = '';

var chanpin_pop_menu_item_a = 0; //0全部，1自有品牌，2代理品牌
var catid = 0; // 0代表全部
var paixu = 1;
var bycaichanpin = 1;
var xinpin = 0; //0为不推荐, 1为推荐
var current_page = 1;

var login_return = 1; //登录后返回，1为我的，2为购物车,3为产品或菜品详情

var b64 = new Base64();

var cart_delete_id = 0;

var current_city = ''; //当前城市

var menu_page_html = '<div id="header2" class="header" style="background-color:#fff;">\
			<span class="header_title" style="color:#09b0e1;">功能模块</span>\
		</div>\
		<div id="wrapper2" class="wrapper_nofooter bg_blue">\
		<div id="scroller2" class="scroller ">\
			<div class="form_top"></div>\
			<div id="menu_xingchengdan" class="menu_item">\
				<div class="menu_item_img menu_xingchengdan_img"></div>\
				<div class="menu_item_text">行程单</div>\
			</div>\
			<div id="menu_youkemingdan" class="menu_item">\
				<div class="menu_item_img menu_youkemingdan_img"></div>\
				<div class="menu_item_text">游客名单</div>\
			</div>\
			<div id="menu_youkeqiandao" class="menu_item">\
				<div class="menu_item_img menu_youkeqiandao_img"></div>\
				<div class="menu_item_text">游客签到</div>\
			</div>\
			<div id="menu_fenfang" class="menu_item">\
				<div class="menu_item_img menu_fenfang_img"></div>\
				<div class="menu_item_text">分房</div>\
			</div>\
			<div id="menu_daishoukuan" class="menu_item">\
				<div class="menu_item_img menu_daishoukuan_img"></div>\
				<div class="menu_item_text">代收款</div>\
			</div>\
			<div id="menu_duanxinfasong" class="menu_item">\
				<div class="menu_item_img menu_duanxinfasong_img"></div>\
				<div class="menu_item_text">短信发送</div>\
			</div>\
			<div id="menu_set" class="menu_item">\
				<div class="menu_item_img menu_set_img"></div>\
				<div class="menu_item_text">设置</div>\
			</div>\
		</div></div>';

var shouye_header_html = '<span class="header_title">首页</span><span id="search_icon" class="com_icon search_icon"></span>';
var shouye_main_html = '<ul class="menu_list01"><li id="huodongzhuanti" class="menu_item01 menu_item01_t menu_item01_b">\
        <span class="m01_icon m01_icon_huodongzhuanti"></span><span>活动专题</span><span class="m01_right_arrow"></span>\
    </li></ul><ul class="menu_list01">\
    <li id="xincaituijian" class="menu_item01 menu_item01_t">\
        <span class="m01_icon m01_icon_xincaituijian"></span><span>新菜推荐</span><span class="m01_right_arrow"></span>\
    </li><li id="chanpinliebiao" class="menu_item01">\
        <span class="m01_icon m01_icon_chanpinliebiao"></span><span>产品列表</span><span class="m01_right_arrow"></span>\
    </li><li id="caipinzhanshi" class="menu_item01 menu_item01_b">\
        <span class="m01_icon m01_icon_caipinzhanshi"></span><span>菜品展示</span><span class="m01_right_arrow"></span>\
    </li></ul><ul class="menu_list01">\
    <li id="fuwuzhichi" class="menu_item01 menu_item01_t">\
        <span class="m01_icon m01_icon_fuwuzhichi"></span><span>服务支持</span><span class="m01_right_arrow"></span>\
    </li><li id="erweimasaomiao" class="menu_item01 menu_item01_b">\
        <span class="m01_icon m01_icon_erweima"></span><span>二维码扫描</span><span class="m01_right_arrow"></span>\
    </li></ul>';
var wode_header_html = '<span class="header_title">我的</span>';
var wode_main_html = '<div class="user_top01">\
	<div class="user_top01_l"><img id="user_top01_l_img" class="user_top01_l_img" onerror="this.src=\'img/nophoto.gif\'" /></div>\
	<div class="user_top01_r"><div id="user_top01_r01" class="user_top01_r01"></div>\
	<div id="user_top01_r02" class="user_top01_r02"></div></div>\
	</div><div class="user_top02">\
	<div id="user_chpwd" class="user_top0201"><div class="user_top02_icon user_top0201_icon"></div>\
		<div class="user_top02_text">修改密码</div></div>\
	<div id="user_shouhuoxinxi" class="user_top0202"><div class="user_top02_icon user_top0202_icon"></div>\
		<div class="user_top02_text">收货地址</div></div>\
	<div id="user_pinfo" class="user_top0203"><div class="user_top02_icon user_top0203_icon"></div>\
		<div class="user_top02_text">个人信息</div></div>\
	</div><ul class="menu_list01">\
    <li id="wodedingdan" class="ucenter_mi01 menu_item01 menu_item01_t menu_item01_b">\
        <span class="m01_icon m01_icon_huodongzhuanti"></span><span>我的订单</span><span class="m01_right_arrow"></span>\
    </li></ul><ul class="menu_list01">\
    <li id="wodeshoucang" class="ucenter_mi01 menu_item01 menu_item01_t">\
        <span class="m01_icon m01_icon_shoucang"></span><span>我的收藏</span><span class="m01_right_arrow"></span>\
    </li><li id="jifenchaxun" class="ucenter_mi01 menu_item01">\
        <span class="m01_icon m01_icon_jifenchaxun"></span><span>积分查询</span><span class="m01_right_arrow"></span>\
    </li><a href="tel:4008637688"><li id="lianxikefu" class="ucenter_mi01 menu_item01 menu_item01_b">\
        <span class="m01_icon m01_icon_dianhua"></span><span>联系客服</span><span class="m01_right_arrow"></span><span class="m01_right_t">4008637688</span>\
    </li></a></ul><ul class="menu_list01">\
    <li id="tuichuzhanghao" class="ucenter_mi01 menu_item01 menu_item01_t menu_item01_b">\
        <span class="m01_icon m01_icon_logout"></span><span>退出当前账号</span><span class="m01_right_arrow"></span>\
    </li></ul><div class="form_bottom"></div>';
var cart_header_html = '<span class="header_title">购物车</span>';
var more_header_html = '<span class="header_title">更多</span>';
var set_main_html = '<div class="form_top"></div><ul class="menu_list01">\
    <li id="reg" class="more_mi01 menu_item01 menu_item01_t">\
        <span class="m01_icon m01_icon_zhuce"></span><span>关于我们</span><span class="m01_right_arrow"></span>\
    </li><li id="pingfen" class="more_mi01 menu_item01">\
        <span class="m01_icon m01_icon_pingfen"></span><span>版本更新</span><span class="m01_right_arrow"></span>\
    </li></ul><ul class="menu_list01"><li id="quit" class="more_mi01 menu_item01 menu_item01_t menu_item01_b">\
        <span class="m01_icon m01_icon_delete"></span><span>退出登录</span><span class="m01_right_arrow"></span>\
    </li></ul><div class="form_bottom"></div>';
var zhuanti_list_html = '<div id="header2" class="header">\
	<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">活动专题</span>\
	</div><div id="wrapper2" class="wrapper_nofooter">\
	<div id="scroller2" class="scroller bg_wh"><div id="list01"></div>\
	<div id="load_more_wrap"><div id="load_more" class="load_more">点击加载更多</div></div></div></div>';
var chanpin_detail_html = '<div id="header3" class="header">\
	<span id="back_icon3" class="com_icon back_icon"></span><span class="header_title">产品详情</span><span id="cart_icon" class="com_icon cart_icon"></span>\
	</div><div id="wrapper3" class="wrapper_nofooter">\
	<div id="scroller3" class="scroller"></div></div>\
	<div class="chanpin_detail_f"><div class="chanpin_detail_fprice"></div><div class="chanpin_detail_ftocart">加入购物车</div></div>';
/*
<div class="wipe-list"><ul class="wipe-list-ul wipe-list-ulo">\
            <li><img src="img/huodong01.jpg" /></li>\
            <li><img src="img/huodong01.jpg" /></li>\
            <li><img src="img/huodong01.jpg" /></li>\
            <li><img src="img/huodong01.jpg" /></li>\
            <li><img src="img/huodong01.jpg" /></li>\
        </ul></div><div class="gcdt-list-cur gcdt-list-curo">\
        <div class="cur"></div>\
        <div></div>\
        <div></div>\
        <div></div>\
        <div></div>\
    </div>
 */
var erweimasaomiao_html = '<div id="header2" class="header">\
	<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">二维码扫描</span>\
	</div><div id="wrapper2" class="wrapper_nofooter">\
	<div id="scroller2" class="scroller bg_gra"><div id="erweima_scan" class="ycc_btn01">二维码扫描</div>\
	<div class="form_top"></div><ul class="menu_list01">\
	<li class="menu_item02 menu_item01_t">\
		<span class="m01_left">产品码</span>\
		<input id="erweima_pnum" type="text" class="m01_right_in" placeholder="未填写" />\
	</li><li class="menu_item02 menu_item01_b">\
		<span class="m01_left">手机号</span>\
		<input id="erweima_tel" type="text" class="m01_right_in" placeholder="未填写" />\
	</li></ul><div id="erweima_submit" class="ycc_btn01">发送</div><div class="form_tips">提示：产品码可通过扫描二维码输入，也可手工输入；发送成功后请留意手机短信。</div>\
	<div class="form_bottom"></div></div></div>';
var jifenchaxun_html = '<div id="header2" class="header">\
	<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">积分查询</span>\
	</div><div id="wrapper2" class="wrapper_nofooter">\
	<div id="scroller2" class="scroller bg_gra"><div class="form_top"></div>\
	<ul class="menu_list01">\
	<li class="menu_item02 menu_item01_t menu_item01_b">\
		<span class="m01_left">手机号</span>\
		<input id="jifenchaxun_tel" type="text" class="m01_right_in" placeholder="未填写" />\
	</li></ul><div id="jifenchaxun_submit" class="ycc_btn01">查询</div>\
	<div class="form_top"></div><ul class="menu_list01">\
	<li class="menu_item02 menu_item01_t">\
		<span class="m01_left">当前积分</span>\
		<input readOnly="true" id="dangqianjifen" type="text" class="m01_right_in" placeholder="暂无" />\
	</li><li class="menu_item02 menu_item01_b">\
		<span class="m01_left">冻结积分</span>\
		<input readOnly="true" id="dongjiejifen" type="text" class="m01_right_in" placeholder="暂无" />\
	</li></ul><div class="form_tips">提示：该处手机号默认为首页二维码扫描中填写过的手机号。</div>\
	<div class="form_bottom"></div></div></div>';
var user_reg_html = '<div id="header2" class="header">\
	<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">用户注册</span>\
	</div><div id="wrapper2" class="wrapper_nofooter">\
	<div id="scroller2" class="scroller bg_gra"><div class="form_top"></div>\
	<ul class="menu_list01">\
	<li id="reg_username" class="reg_item01 menu_item02 menu_item01_t">\
		<span class="m01_left">用户名</span><span class="m01_right_arrow"></span>\
		<input readOnly="true" type="text" class="m01_right_in" placeholder="未填写" />\
	</li><li id="reg_pwd" class="reg_item02 menu_item02">\
		<span class="m01_left">密码</span><span class="m01_right_arrow"></span>\
		<input readOnly="true" type="password" class="m01_right_in" placeholder="未填写" />\
	</li><li id="reg_repwd" class="reg_item02 menu_item02">\
		<span class="m01_left">重复密码</span><span class="m01_right_arrow"></span>\
		<input readOnly="true" type="password" class="m01_right_in" placeholder="未填写" />\
	</li><li id="reg_email" class="reg_item01 menu_item02 menu_item01_b">\
		<span class="m01_left">邮箱</span><span class="m01_right_arrow"></span>\
		<input readOnly="true" type="text" class="m01_right_in" placeholder="未填写" />\
	</li></ul><div id="reg_submit" class="ycc_btn01">注册</div><div class="form_tips">提示：如提示"信息填写有误"，可能是信息为空、用户名或邮箱已被使用。</div>\
	<div class="form_bottom"></div></div></div>';
var user_chpwd_html = '<ul class="menu_list01">\
	<li id="password" class="chpwd_mi01 menu_item02 menu_item01_t">\
		<span class="m01_left">新密码</span><span class="m01_right_arrow"></span><input type="password" readOnly="true" class="m01_right_in" placeholder="请输入新密码" />\
	</li><li id="repassword" class="chpwd_mi01 menu_item02 menu_item01_b">\
		<span class="m01_left">重复密码</span><span class="m01_right_arrow"></span><input type="password" readOnly="true" class="m01_right_in" placeholder="请重复新密码" />\
	</li></ul><div id="chpwd_submit" class="ycc_btn01">保存</div>\
	<div class="form_tips">提示：密码长度必须大于等于6位</div><div class="form_bottom"></div>';
var user_shouhuoxinxi_html = '<ul class="menu_list01">\
	<li id="sh_name" class="shouhuoxinxi_mi01 menu_item02 menu_item01_t">\
		<span class="m01_left">收货人</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="请输入收货人" />\
	</li><li id="sh_tel" class="shouhuoxinxi_mi01 menu_item02">\
		<span class="m01_left">手机</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="请输入手机" />\
	</li><li id="sh_address" class="shouhuoxinxi_mi01 menu_item02 menu_item01_b">\
		<span class="m01_left">收货地址</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="请输入收货地址" />\
	</li></ul><div id="shouhuoxinxi_submit" class="ycc_btn01">保存</div><div class="form_bottom"></div>';
var user_pinfo_html = '<ul class="menu_list01">\
	<li id="province" class="menu_item02 menu_item01_t">\
		<span class="m01_left">省份</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="请选择省份" />\
	</li><li id="city" class="menu_item02">\
		<span class="m01_left">城市</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="请选择城市" />\
	</li><li id="company" class="pinfo_mi01 menu_item02">\
		<span class="m01_left">企业名称</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li><li id="realname" class="pinfo_mi01 menu_item02">\
		<span class="m01_left">姓名</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li><li id="tel" class="pinfo_mi01 menu_item02">\
		<span class="m01_left">电话</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li><li id="qq" class="pinfo_mi01 menu_item02">\
		<span class="m01_left">QQ</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li><li id="email" class="pinfo_mi01 menu_item02">\
		<span class="m01_left">Email</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li><li id="address" class="pinfo_mi01 menu_item02">\
		<span class="m01_left">地址</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li><li id="intro" class="pinfo_mi01 menu_item02 menu_item01_b">\
		<span class="m01_left">简介</span><span class="m01_right_arrow"></span><input type="text" readOnly="true" class="m01_right_in" placeholder="未填写" />\
	</li></ul><div id="pinfo_submit" class="ycc_btn01">保存</div><div class="form_bottom"></div>';
var order_detail_html = '<ul class="menu_list01">\
    <li class="menu_item02 menu_item01_t">\
        <span>订单号</span><span id="order_detail_num" class="m01_right_t"></span>\
    </li><li class="menu_item02">\
        <span>下单时间</span><span id="order_detail_date" class="m01_right_t"></span>\
    </li><li class="menu_item02 menu_item01_b">\
        <span>订单状态</span><span id="order_detail_status" class="m01_right_t"></span>\
    </li></ul><ul class="menu_list01">\
    <li class="menu_item02 menu_item01_t">\
        <span>收货人</span><span id="order_detail_shname" class="m01_right_t"></span>\
    </li><li class="menu_item02 menu_item01_b">\
        <span>手机</span><span id="order_detail_tel" class="m01_right_t"></span>\
    </li></ul><div class="table_title">收货地址</div><ul class="menu_list01">\
    <li id="order_detail_address" class="menu_item01_mutilline menu_item01_t menu_item01_b">收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址\
    </li></ul><div class="table_title">购物详情</div><ul id="order_detail_detail" class="menu_list01">\
    <li class="menu_item02 menu_item01_t">\
        <span>产品名称</span><span class="m01_right_t">金额</span>\
    </li></ul><div class="form_bottom"></div>';
var search_chanpin_html = '<div id="header2" class="header"><div class="header_h01">\
		<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">搜索产品</span>\
		</div><div class="header_hsearch">\
		<input readOnly="true" placeholder="请输入关键词" id="search_chanpin_in" type="text" class="header_hsearch_in" />\
		</div></div><div id="wrapper2" class="wrapper_nofooter">\
		<div id="scroller2" class="scroller bg_wh"><div id="list01"></div>\
		<div id="load_more_wrap"><div id="load_more" class="load_more">点击加载更多</div></div></div></div>';
function func_user_login_html(p)
{	
	return '<div id="header' + p + '" class="header">\
		<span id="back_icon' + p + '" class="com_icon back_icon"></span><span class="header_title">用户登录</span>\
		</div><div id="wrapper' + p + '" class="wrapper_nofooter">\
		<div id="scroller' + p + '" class="scroller bg_gra"><div class="form_top"></div>\
		<ul class="menu_list01">\
		<li class="menu_item02 menu_item01_t">\
			<span class="m01_left">用户名</span>\
			<input id="username" type="text" class="m01_right_in" placeholder="未填写" />\
		</li><li class="menu_item02 menu_item01_b">\
			<span class="m01_left">密码</span>\
			<input id="pwd" type="password" class="m01_right_in" placeholder="未填写" />\
		</li></ul><div id="login_submit" class="ycc_btn01">登录</div>\
		<div class="form_bottom"></div></div></div>';
}
function func_caipin_detail_html(showshoucang)
{
	var h = '';
	if(showshoucang)
	{
		h = '<span id="shoucang_icon" class="com_icon shoucang_icon"></span>';
	}
	return '<div id="header3" class="header">\
		<span id="back_icon3" class="com_icon back_icon"></span><span class="header_title">菜品制作</span>' + h +
		'</div><div id="wrapper3" class="wrapper_nofooter">\
		<div id="scroller3" class="scroller bg_wh"></div></div>';
}
function func_pagecom_html(page, title)
{
	return '<div id="header' + page + '" class="header">\
		<span id="back_icon' + page + '" class="com_icon back_icon"></span><span class="header_title">' + title + '</span>\
		</div><div id="wrapper' + page + '" class="wrapper_nofooter">\
		<div id="scroller' + page + '" class="scroller bg_gra"></div></div>';
}
var search_txa_html = '<div id="header3" class="header">\
		<span id="back_icon3" class="com_icon back_icon"></span><span class="header_title">输入关键词</span>\
		</div><div id="wrapper3" class="wrapper_nofooter">\
		<div id="scroller3" class="scroller bg_gra"><textarea id="search_txa_text" class="form_txa"></textarea>\
		<div id="search_txa_submit" class="ycc_btn01">搜索</div><div class="form_bottom"></div></div></div>';
function func_pagecom_txa_html(page ,id ,ispwd)
{
	var txin = '<textarea id="' + id + '_con" class="form_txa">' + $('#'+ id +' .m01_right_in').val() + '</textarea>';
	if (ispwd)
	{
		txin = '<input id="' + id + '_con" type="password" class="form_inpwd" value="' + $('#'+ id +' .m01_right_in').val() + '" />'
	}
	return '<div id="header' + page + '" class="header">\
		<span id="back_icon' + page + '" class="com_icon back_icon"></span><span class="header_title">' + $('#'+ id +' .m01_left').html() + '</span>\
		</div><div id="wrapper' + page + '" class="wrapper_nofooter">\
		<div id="scroller' + page + '" class="scroller bg_gra">' + txin +
		'<div id="' + id + '_submit" class="ycc_btn01">保存</div><div class="form_bottom"></div></div></div>';
}
function func_caichanpin_list_html(type)
{
	type = type.toString();
	var t = '';
	var chanpin_h = '';
	switch(type)
	{
		case '1': 
			t= '新菜推荐'; 
			chanpin_h = '<div id="header_h02_i03" class="header_h02_i header_h02_ilast">产品</div>';
			break;
		case '2': t = '产品列表'; break;
		case '3': t = '菜品展示'; break;
		case '4': t = '我的收藏'; break;
	}
	var h02 = '<div class="header_h02">\
		<div id="header_h02_i01" class="header_h02_i">分类</div>\
		<div id="header_h02_i02" class="header_h02_i">排序</div>'+ chanpin_h + '</div>';
	if (type == 4)
	{
		h02 = '';
	}
	return '<div id="header2" class="header"><div class="header_h01">\
		<span id="back_icon2" class="com_icon back_icon"></span><span class="header_title">'+t + '</span>\
		</div>' + h02 + '</div><div id="wrapper2" class="wrapper_nofooter">\
		<div id="scroller2" class="scroller bg_wh"><div id="list01"></div>\
		<div id="load_more_wrap"><div id="load_more" class="load_more">点击加载更多</div></div></div></div>';
}