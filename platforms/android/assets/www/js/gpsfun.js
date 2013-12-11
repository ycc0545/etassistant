var lg9m={
alarmtype_01:"超速",
alarmtype_02:"断电",
alarmtype_03:"震动",
alarmtype_04:"低电",
alarmtype_05:"救援",
alarmtype_06:"进区域",
alarmtype_07:"出区域",
mdtstatus_01:"启动",
mdtstatus_02:"熄火",
mdtstatus_03:"设防",
mdtstatus_04:"电池供电",
mdtstatus_05:"断油电",
mdtstatus_06:"车门开",
mdtstatus_07:"车门关",
mdtstatus_08:"运动",
mdtstatus_09:"静止",
mdtstatus_10:"基站定位",
monitor_obj_state_run:"行驶",
monitor_obj_state_stop:"停止",
monitor_obj_state_hspeed:"快速",
monitor_obj_state_alarm:"报警",
monitor_obj_state_offline:"离线",
monitor_date_day:"天前",
monitor_date_hour:"小时前",
monitor_date_mm:"分前",
monitor_date_ss:"秒前",
monitor_date_now:"最新"
};

function getStateStr(alarmstate,mdtstatus)
{
  statestr = "";
  if (alarmstate & 1 ) {statestr =   lg9m.alarmtype_05 + "," ;} //sos
  if (alarmstate & 2 ) {statestr =  statestr +   lg9m.alarmtype_01 + "," ;} //超速
  if (alarmstate & 4 ) {statestr =  statestr +    lg9m.alarmtype_06+ "," ;} //进区域
  if (alarmstate & 8 ) {statestr =  statestr +    lg9m.alarmtype_07+ "," ;} //出区域
  if (alarmstate & 16 ){statestr =  statestr +   lg9m.alarmtype_03+ "," ;} //震动
  if (mdtstatus & 1 )  {statestr =  statestr +   lg9m.mdtstatus_01 + "," ;}   //accopen
  if (mdtstatus & 2 )  {statestr =  statestr +   lg9m.mdtstatus_02 + "," ;} //accclose
  if (mdtstatus & 4 )  {statestr =  statestr +    lg9m.mdtstatus_03+ "," ;} //setsafe
  if (mdtstatus & 8 )  {statestr =  statestr +    lg9m.mdtstatus_04+ "," ;} //battery
  if (mdtstatus & 16 ) {statestr =  statestr +   lg9m.mdtstatus_05+ "," ;} //onlocked
  if (mdtstatus & 32 ) {statestr =  statestr +   lg9m.mdtstatus_06+ "," ;} //dooropen
  if (mdtstatus & 64 ) {statestr =  statestr +   lg9m.mdtstatus_07+ "," ;} //doorclose
  if (mdtstatus & 128 ) {statestr =  statestr +   lg9m.mdtstatus_08+ "," ;} //onmove
  if (mdtstatus & 256 ) {statestr =  statestr +   lg9m.mdtstatus_09+ "," ;} //onsleep
  if (mdtstatus & 512 ) {statestr =  statestr +   lg9m.mdtstatus_10+ "," ;} //lbspos
  
  
  if (statestr.length>0) { statestr = statestr.substring(0,statestr.length-1);} 
  return statestr;
}
function strToDate(dateStr){  
  if (dateStr ==null) return "";
  if (dateStr.length < 12) return ""; 
     var year = dateStr.substr(0,4);   
     var month = dateStr.substr(5,2);   
     var day = dateStr.substr(8,2);
     var time = dateStr.substr(11,8);   
     var temDate = month+'/'+day+'/'+year+' '+time;   
     return new Date(temDate);
} 
function GetDateDiffStr(sDate2)
{ 
	 var sDate1 = new Date();
   var idiff = parseInt((sDate1 - sDate2)); 
   var iminute = idiff / 1000 / 60 ;
   if (iminute > 1440)
   { //日
   	var days = iminute / 60 /24 ;
   	return "" + parseInt(days) + lg9m.monitor_date_day;
   }
   
   if (iminute > 60) {
  		var hours = iminute / 60;
   	return "" +parseInt(hours) + lg9m.monitor_date_hour;
   }
   if (iminute > 1) {
  		
   	return "" +parseInt(iminute) + lg9m.monitor_date_mm;
   }
   if (iminute < 1) 
   {  		
   	return "" +  lg9m.monitor_date_now;
   }
   return "" +parseInt(idiff/1000) + lg9m.monitor_date_ss;

}
//获取地图Marker的Info窗口,gpsdata为实时数据，isshowfun是否显示功能(回放，跟踪）
function getCarMarkerInfo(gpsdata,isshowfun)
{
   var iconpath = getMarkerPath(gpsdata.di,gpsdata.ot,gpsdata.tt,gpsdata.sd,gpsdata.as);
   var lat = gpsdata.lt || '';
   var lon = gpsdata.lo || '';
   var objectid = gpsdata.oid || 0;
   var objectname = gpsdata.obn || '';
   var statusstr = getStateStr(gpsdata.as,gpsdata.ms) || '';
   var speed = gpsdata.sd;
   var gpstime = gpsdata.gt || '';
   var recvtime = gpsdata.rt || '';
   var title = "<span style=\"WHITE-SPACE: nowrap; OVERFLOW: hidden; padding-bottom: 1px;\"><font style=\"font-size:12px;color:#244faf;\">名称：</font><span style='FONT-SIZE: 12px; FONT-WEIGHT: bold;'>" + (gpsdata.obn || '') + "</span></span>";
   var content = '<div class="popover">\
	<div class="popover_arrow"></div>\
          <div class="popover_li">速度：' + speed  + '公里/小时</div>\
          <div class="popover_li">里程：' + gpsdata.mi  + '公里</div>\
          <div class="popover_li_s">状态：' + statusstr + '</div>';
   if (isshowfun ==1) //
   {
   //连接功能项
     content += '<div class="popover_btns"><div id="car_current_his" class="label">车辆跟踪</div>\
     	<div id="history_show" class="label">历史回放</div></div>';
   }
   content += '</div>';
   return { objectname: objectname,title: title, content: content ,iconpath:iconpath,isshowfun:isshowfun};

}
function showdate(n) 
{ 
	var uom = new Date(new Date()-0+n*86400000); 
	uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate() + " 00:00:01"; 
	return uom; 
}
//获取车辆图标的图片路径
function getMarkerPath(direct,objectType,transType,speed,isalarm)
{
  var path = "img/gps/"; 
  var directName = '';
  var strD = '';
  var strT = '';
  var strTrans = "";
  //不在线
  if (transType == 0) strTrans = "_Offline_";
  else {               
      if (isalarm >= 1) strTrans = "_Alarm_";
      else if (speed == '0.00' || speed == '0' || speed == 0 || speed == 0.00) strTrans = "_Stop_";
      else strTrans = "_Online_";
  }
  switch (true) {
      case ((direct >= 0 && direct <= 22) || (direct >= 338 && direct <= 360)):strD = 'N';break;
      case (direct >= 23 && direct <= 67):strD = 'NE';break;
      case (direct >= 68 && direct <= 112):strD = 'E';break;
      case (direct >= 113 && direct <= 157):strD = 'SE';break;
      case (direct >= 158 && direct <= 202):strD = 'S';break;
      case (direct >= 203 && direct <= 247):strD = 'SW';break;
      case (direct >= 248 && direct <= 292):strD = 'W';break;
      case (direct >= 293 && direct <= 337):strD = 'NW';break;
      default:strD = 'N';break;
  }
  switch (objectType * 1) {
      case 1:strT = 'Car';break;
      case 2:strT = 'Truck';break;               
      default:strT = 'Car';break;
  }
  return path + strT + strTrans + strD + ".gif";            
}

function getdatestr(secs)
{ 
	var uom = new Date(new Date()-0+secs*1000); 
	uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate() + " " 
		+ uom.getHours() + ":" +uom.getMinutes() + ":" +uom.getSeconds(); 
	return uom;
} 

