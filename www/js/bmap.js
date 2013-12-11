
function ComplexCustomOverlay(map, point, text, mouseoverText){
	this._map = map;
  this._point = point;
  this._text = text;
  this._overText = mouseoverText;
  this._div = '';
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
      div.className='bmap_overlay';
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      var div_my = this._span = document.createElement("div");
      div_my.className = 'my_map_pop';
      div.appendChild(div_my);

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "red";
      arrow.style.position = "absolute";
      arrow.style.width = "0";
      arrow.style.height = "0";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
  this._map.getPanes().labelPane.appendChild(div);
  return div;
}

ComplexCustomOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
  this._div.style.top  = pixel.y - 30 + "px";
}

ComplexCustomOverlay.prototype.setP = function(p){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(p);
  this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
  this._div.style.top  = pixel.y - 30 + "px";
}
