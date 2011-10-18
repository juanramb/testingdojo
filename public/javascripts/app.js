dojo.require("dojo.fx");
dojo.ready(function(){
  dojo.byId("hola").innerHTML += ", desde la "+ dojo.version;
  dojo.fx.slideTo({
	  top: 100,
	  left: 200,
	  node: dojo.byId("hola")
  }).play();
});
