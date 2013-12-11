Array.prototype.indexOf=function(substr,start)
{
	var ta,rt,d='\0';
	if(start!=null){ta=this.slice(start);rt=start;}else{ta=this;rt=0;}
	var str=d+ta.join(d)+d,t=str.indexOf(d+substr+d);
	if(t==-1)return -1;rt+=str.slice(0,t).replace(/[^\0]/g,'').length;
	return rt;
}
