
dojo.require("dojo.fx");
dojo.addOnLoad(function(){
	var socket = new io.Socket();
	//get simbols from mongo

	//draw table based on symbols
	
	socket.on("message", function(msg) {
		var data = dojo.fromJson(msg);
		var html = dojo.byId("tick-table").innerHTML;
		dojo.byId("ticker-symbols").innerHTML = "<div class='ticker-data'>" +
		"<div class='ticker-symbol'><a class='ticker-symb-link' href='#' data='" + data.symbol + "' title='Ticker Symbol Analysis'>" + data.symbol + "</a></div>" +
		"<div class='ticker-meta ticker-price'>Price: $" + data.price + "</div>" +
		"<div class='ticker-meta ticker-volume'>Volume: " + data.volume + "</div>" +
		"</div>" + html;
		
		dojo.query(".ticker-symb-link").onclick(handleSymbolClick);
		
		var nodes = dojo.query("#ticker-symbols .ticker-data")
		var total = 0;
		var d = dojo;
		var lastWidth = 0;
		
		nodes.forEach(function(node, index, nodes) {
		var style = d.getComputedStyle(node);
		var width = parseInt(style.width.replace(/px/, ""));
		total += width;
		lastWidth = width;
		});
		total += lastWidth;
		
		var newRight = (lastWidth * -1);
		dojo.style("ticker-symbols", {
		width: (total + (total/2)) + "px",
		right: newRight + "px"
		});
		dojo.anim("ticker-symbols", {
		right: {
		start: newRight,
		end: 16,
		unit: "px"
		}
	});
});


});
dojo.ready(function(){
  dojo.byId("hola").innerHTML += ", desde la "+ dojo.version;
  
  dojo.fx.slideTo({
	  top: 100,
	  left: 200,
	  node: dojo.byId("hola")
  }).play();
});
