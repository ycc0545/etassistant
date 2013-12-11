function car_add_edit_select(detail_id)
{
	var timeParam = Math.round(new Date().getTime()/1000);
	var url = 'http://120.31.131.86:8080/gps/form/getListOfHold.action?parentid=&usermd5=12345';
	url += "&timenow="+ timeParam;
	$.getJSON(url, function(data){
		set_hold(data);
	});
	var url = 'http://120.31.131.86:8080/gps/form/getMdtTypeList.action';
	url += "?timenow="+ timeParam;
	$.getJSON(url, function(data){
		set_mdttype(data);
		if (detail_id)
		{
			var detail_url = 'http://120.31.131.86:8080/gps/getActiveListOfPager.action?direction=asc&parentId=&sort=stdobjectinfo.objectname&rptquery.objectname=&rptquery.starttime=&usermd5=12345&pager.pageNo=1&pager.pageSize=30';
			detail_url += '&rptquery.objectid='+ detail_id;
			detail_url += "&timenow="+ timeParam;
			$.getJSON(detail_url, function(data){
				set_edit_page(data);
			});
		}
	});
}

function add_car()
{

	var url = 'http://120.31.131.86:8080/gps/saveObjectinfo.action?isupdate=0&objectinfo.objectid=';
	url += '&objectinfo.objectname='+ $('#objectname').val();
	url += '&objectinfo.stdholdinfo.holdid='+ $('#holdid').val();
	url += '&objectinfo.dmdttype.mdttypeid='+ $('#mdttypeid').val();
	url += '&objectinfo.simid='+ $('#simid').val();
	url += '&objectinfo.mdtid='+ $('#mdtid').val();
	url += '&objectinfo.contacter='+ $('#contacter').val();
	url += '&objectinfo.contactertel='+ $('#contactertel').val();
	url += '&objectinfo.remark='+ $('#remark').val();
	url += '&objectinfo.objecttype=';
	
	var timeParam = Math.round(new Date().getTime()/1000);
	url += '&isencode=1&timenow='+ timeParam;
	url = encodeURI(encodeURI(url));
	$.getJSON(url, function(data){
		if(data.message == 'lg9m.object_box_add_msg+lg9m.form_save_success')
		{
			my_toast ('添加成功', 2500);
			setTimeout(scrollRight, 2500);
			return;
		}
		my_toast ('添加失败', 2500);
	});
}

function save_icon_action(detail_id)
{

	var url = 'http://120.31.131.86:8080/gps/saveObjectinfo.action?isupdate=1'
	url += '&objectinfo.objectid='+ detail_id;
	
	url += '&objectinfo.objectname='+ $('#objectname').val();
	url += '&objectinfo.stdholdinfo.holdid='+ $('#holdid').val();
	url += '&objectinfo.dmdttype.mdttypeid='+ $('#mdttypeid').val();
	url += '&objectinfo.simid='+ $('#simid').val();
	url += '&objectinfo.mdtid='+ $('#mdtid').val();
	url += '&objectinfo.contacter='+ $('#contacter').val();
	url += '&objectinfo.contactertel='+ $('#contactertel').val();
	url += '&objectinfo.remark='+ $('#remark').val();
	url += '&objectinfo.objecttype=';
	
	var timeParam = Math.round(new Date().getTime()/1000);
	url += '&isencode=1&timenow='+ timeParam;
	url = encodeURI(encodeURI(url));
	$.getJSON(url, function(data){
		if(data.message == 'lg9m.object_box_edit_msg+lg9m.form_save_success')
		{
			my_toast ('修改成功', 2500);
			setTimeout(scrollRight, 2500);
			return;
		}
		my_toast ('修改失败', 2500);
	});
}

function edit_icon_action(detail_id)
{
	$('#page4').html(car_edit_html+ p4_footer_html);
	var timeParam = Math.round(new Date().getTime()/1000);
	
	car_add_edit_select(detail_id);
	
	touch_btn ('back_icon4');
	touch_btn ('save_icon4');
	$('#back_icon4').singleTap(scrollRight);
	$('#save_icon4').singleTap(function (){
		save_icon_action(detail_id);
	});
	$('#p4_fmenu_01').addClass('footer_current');
	scrollLeft();
}