$(document).ready(function() {
	$(".wp1").waypoint(function() {
		$(".wp1").addClass("animated fadeInLeft")
	}, {
		offset : "75%"
	});
	$(".wp2").waypoint(function() {
		$(".wp2").addClass("animated fadeInDown")
	}, {
		offset : "75%"
	});
	$(".wp3").waypoint(function() {
		$(".wp3").addClass("animated bounceInDown")
	}, {
		offset : "75%"
	});
	$(".wp4").waypoint(function() {
		$(".wp4").addClass("animated fadeInDown")
	}, {
		offset : "75%"
	});
	$(".wp5").waypoint(function() {
		$(".wp5").addClass("animated bounceInRight")
	}, {
		offset : "75%"
	});
	$("#featuresSlider").flickity({
		cellAlign : "left",
		contain : true,
		prevNextButtons : false
	});
	$("#showcaseSlider").flickity({
		cellAlign : "left",
		contain : true,
		prevNextButtons : false,
		imagesLoaded : true
	});
	$(".youtube-media").on("click", function(e) {
		var t = $(window).width();
		if (t <= 768) {
			return
		}
		$.fancybox({
			href : this.href,
			padding : 4,
			type : "iframe",
			href : this.href.replace(new RegExp("watch\\?v=", "i"), "v/")
		});
		return false
	})
});
$(document).ready(function() {
	$("a.single_image").fancybox({
		padding : 4
	})
});
$(".nav-toggle").click(function() {
	$(this).toggleClass("active");
	$(".overlay-boxify").toggleClass("open")
});
$(".overlay ul li a").click(function() {
	$(".nav-toggle").toggleClass("active");
	$(".overlay-boxify").toggleClass("open")
});
$(".overlay").click(function() {
	$(".nav-toggle").toggleClass("active");
	$(".overlay-boxify").toggleClass("open")
});
$("a[href*=#]:not([href=#])").click(
		function() {
			if (location.pathname.replace(/^\//, "") === this.pathname.replace(
					/^\//, "")
					&& location.hostname === this.hostname) {
				var e = $(this.hash);
				e = e.length ? e : $("[name=" + this.hash.slice(1) + "]");
				if (e.length) {
					$("html,body").animate({
						scrollTop : e.offset().top
					}, 2e3);
					return false
				}
			}
		})
