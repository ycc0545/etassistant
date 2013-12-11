var currentIndex;
var pages;

function scrollRight()
{

    if (currentIndex === 0) return;
    pages[currentIndex].removeClass('stage_center');
    pages[currentIndex].addClass('stage_right');

    pages[currentIndex - 1].removeClass('stage_left');
    pages[currentIndex - 1].addClass('stage_center');

    currentIndex = currentIndex - 1;

	my_toast('', 'hide');
}

function scrollLeft() {

    if (currentIndex === pages.length - 1) return;

    pages[currentIndex].removeClass('stage_center');
    pages[currentIndex].addClass('stage_left');

    pages[currentIndex + 1].removeClass('stage_right');
    pages[currentIndex + 1].addClass('stage_center');

    currentIndex = currentIndex + 1;
    
    
}

function touch_btn (name)
{
	$('#' + name).bind('touchstart', function(e){
		$(this).css('background-image', 'url(img/'+ name+ '02.png)');
	});
	
	$('#' + name).bind('touchend', function(e){
		$(this).css('background-image', 'url(img/'+ name+ '01.png)');
	});
}


function touch_bg (t, c)
{
	$(t).bind('touchstart', function(e)
	{
		console.log("ccccccccc: " + c);
		$(this).addClass(c);
	});
	$(t).bind('touchend', function(e){
		$(this).removeClass(c);
	});
}

function get_datetime( ss )
{
	var n = new Date();
	ss = ss ? ss : 0;
    var da = new Date( parseInt(n.valueOf()) + (ss * 1000));
    var y = da.getFullYear();
	var m1= (da.getMonth() + 1) < 10 ? '0' : '';
	m1 += (da.getMonth() + 1);
	var d= da.getDate() < 10 ? '0' : '';
	d += da.getDate();
	var h= da.getHours() < 10 ? '0' : '';
	h += da.getHours();
	var m2= da.getMinutes() < 10 ? '0' : '';
	m2 += da.getMinutes();
	var s= da.getSeconds() < 10 ? '0' : '';
	s += da.getSeconds();
	return y+ '-'+ m1+ '-'+ d+ ' '+ h+ ':'+ m2+ ':'+ s;
}
function getLocalStorge(key)
{
	var item = localStorage.getItem(key);
	if(item=='' || item=='0' || item==null || typeof(item)=="undefined"){
		return false;
	}else{
		return item;
	}
}
//保留2位小数
function toDecimal2(x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}

function pagecom_txa_action(c , txa_page ,ispwd)
{
	$('.' + c).each(function(index)
	{
		var id = $(this).attr('id');
		$(this).singleTap(function()
		{
			var h = func_pagecom_txa_html(txa_page, id, ispwd);
			$('#page' + txa_page).html( h );
			scrollLeft();
			touch_btn ('back_icon' + txa_page);
			$('#back_icon' + txa_page).singleTap(scrollRight);
			touch_bg('#' + id + '_submit', 'ycc_btn01_on');
			$('#' + id + '_submit').singleTap(function()
			{
				$('#' + id + '_con').blur();
				window.scrollTo(0, 0);
				var temp_v = $('#' + id + '_con').val();
				$('#' + id + ' .m01_right_in').val( temp_v );
				scrollRight();
			});
		});
	});
}

function getLocation()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}

function showPosition(position)
{
	//var gpsPoint = new BMap.Point(-119.70089,42.066462);
	var gpsPoint = new BMap.Point(position.coords.longitude, position.coords.latitude);
    BMap.Convertor.translate(gpsPoint,0, function (point)
    {
	    var p = new BMap.Point(point.lng, point.lat);
	    var gc = new BMap.Geocoder();
	    gc.getLocation(p, function(rs)
	    {
	        var addComp = rs.addressComponents;
	        current_city = addComp.city ? addComp.city : '非中国地区';
	        if( $('#bendi'))
	        {
	        	get_gongyingshang();
	        }
	    });  
	}); 
}