var page = require('webpage').create(),
    system = require('system'),
    address, output, size;
var backColor="";

page.onConsoleMessage = function (msg) {
    console.log(msg);
};


function printArgs() {
  if(debug){
  var i, ilen;
  for (i = 0, ilen = arguments.length; i < ilen; ++i) {
      console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
  }
  console.log(""); 
  }  
}

phantom.addCookie({
    'name':     'JSESSIONID',   // required property 
    'value':    system.args[system.args.length-3],// required property 
    'domain':   system.args[system.args.length-2],          //  required property 
    'httponly': true,
    'path':system.args[system.args.length-1]
});

for (var intvar = 0; intvar < system.args.length; intvar++) {
	console.log("-------------"+intvar+"----------------")
	console.log(system.args[intvar])
}
	

if (system.args.length < 3) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    console.log('image (png/jpg output) examples: "1920px" entire page, window width 1920px');
    console.log('                                   "800px*600px" window, clipped to 800x600');
    phantom.exit(1);
} else {

    address = system.args[1];
	output = system.args[2];
		
	page.viewportSize = {
			width : 1390,
			height : 768
		};
	page.paperSize = {
			format : 'A4',
			width : 1024,
			orientation: 'landscape',
			margin : 0
		};	
	page.zoomFactor = 1;
    page.open(address, function (status) {
    	if(address.indexOf("clusterIds=") > -1){
    		backColor="#F7CAAD";//"#F49E64";
    	  }else if(address.indexOf("hospitalId=") > -1){
    		backColor="#CAE5F9";//"#85BAE5";
    	  }else{
    		backColor="#C5E0D4";
    	  }
	//  console.log("open color=========",backColor);
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {
			
          page.evaluate(function(backColor) {   	
			document.body.style.backgroundColor = backColor;
			 
			 
	//To remove Ribbon
       var ribbon = document.querySelectorAll("div.ribbon");
         //  console.log("a length--->"+ribbon.length);
           for(var i=0;i< ribbon.length;i++){
             ribbon[i].parentNode.removeChild(ribbon[i]);
           }
           console.log("Ribbon Removed successfully !");
		   
		   
		  //To remove Header
		  var header = document.querySelectorAll("div.row-fluid.navbar-fixed-top");
		  header[0].parentNode.removeChild(header[0]);
		  console.log("Header Removed successfully !");
		 
		  //To remove Menubar
		  var menuBar = document.querySelector("div .navbarWrapper");
		  menuBar.parentNode.removeChild(menuBar);
		  console.log("Menubar Removed successfully !");
		  
		  
		  /*var ratings = document.querySelectorAll("div.ratingTd span.ratings");
		  console.log(ratings);
		  for(var i=0;i< ratings.length;i++){
             ratings[i].parentNode.removeChild(ratings[i]);
           }
		  console.log("ratings Removed successfully !");*/
		
		  //To remove Right Carousel
		  var carousel = document.querySelectorAll("a.carousel-control.right");
		  carousel[0].parentNode.removeChild(carousel[0]);
		  console.log("Right Carousel Removed successfully !");
		  
		  //To remove Left Carousel
		  carousel = document.querySelectorAll("a.carousel-control.left");
		  carousel[0].parentNode.removeChild(carousel[0]);
		  console.log("Left Carousel Removed successfully !");
		  
		  //To remove Footer
		  var footer = document.querySelectorAll("div.row-fluid.footer");
		  footer[0].parentNode.removeChild(footer[0]);
	    console.log("Footer Removed successfully !");	  
	    
		  
	    	
         },backColor);
		  
		 setTimeout(function(){
		   page.render(output);
                phantom.exit();
		 },5000);
              
            }, 4000);
        };
    });
   
	
} ;







































