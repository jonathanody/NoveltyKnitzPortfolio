/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

( function( $, toastr ) {
	// Enable non-Skrollr functionality
	enableHeader();
	enableSmoothScrolling();
	enableHighlightedNavigation();
	enableResponsiveNavigation();

	// Enable Skrollr
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	
	//FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
			  
			// Resize sections
			adjustWindow();
			  
			// Fade in sections
			$body.removeClass('loading').addClass('loaded');
			  
			showToast();
		}, 800);
	});

	function enableHeader() {
		// Navigation header
		// Set options
		var options = {
			offset: '#showFromHere',
			classes: {
				clone:   'banner--clone',
				stick:   'banner--stick',
				unstick: 'banner--unstick'
			}
		};

		// Initialise with options
		var banner = new Headhesive('.banner', options);

		// Headhesive destroy
		// banner.destroy();
	}
	
	function enableSmoothScrolling() {
		// Smooth scrolling		
		var navContainer = $('.nav-container');
		navContainer.find('a').on('click', function(event){
			event.preventDefault();
			var target= $(this.hash);
			$('body,html').animate({
				'scrollTop': target.offset().top - navContainer.height() + 1
				}, 2000		        
			); 		        
		 });

		var navMobileContainer = $('#cd-main-nav');
		navMobileContainer.find('a').on('click', function(event){
			event.preventDefault();
			var target= $(this.hash);
			$('body,html').animate({
				'scrollTop': target.offset().top - navContainer.height() + 1
				}, 2000		        
			); 		        
		 });
	}

	function enableHighlightedNavigation() {
		// Highlight selected area
		var aChildren = $("nav li").children(); // find the a children of the list items
		var aArray = []; // create the empty aArray
		for (var i=0; i < aChildren.length; i++) {    
			var aChild = aChildren[i];
			var ahref = $(aChild).attr('href');
			aArray.push(ahref);		        
		} // this for loop fills the aArray with attribute href values

		$(window).scroll(function(){
			updateHighlightedNavigation();
		});

		function updateHighlightedNavigation() {
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();

			for (var i=0; i < aArray.length; i++) {
				var theID = aArray[i];
				var divPos = $(theID).offset().top; // get the offset of the div from the top of page
				var divHeight = $(theID).height(); // get the height of the div in question
				if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
					$("a[href='" + theID + "']").addClass("nav-active");
				} else {
					$("a[href='" + theID + "']").removeClass("nav-active");
				}
			}

			if(windowPos + windowHeight == docHeight) {
				if (!$("nav li:last-child a").hasClass("nav-active")) {	            	
					var navActiveCurrent = $(".nav-active").attr("href");
					$("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
					// $("nav li:last-child a").addClass("nav-active");
				}
			}
		}
	}

	function enableResponsiveNavigation() {
		// Responsive navigation
		var navigationContainer = $('#cd-nav'),
			mainNavigation = navigationContainer.find('#cd-main-nav ul');

		//open or close the menu clicking on the bottom "menu" link
		$('.cd-nav-trigger').on('click', function(){
			$(this).toggleClass('menu-is-open');
			//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
			// mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
			mainNavigation.toggleClass('is-visible');

		});	
	}

	function adjustWindow(){
		
		// Init Skrollr
		var s = skrollr.init({
			render: function(data) {
			
				//Debugging - Log the current scroll position.
				//console.log(data.curTop);
			}
		});
		
		// Get window size
		winH = $window.height();
		
		// Keep minimum height 550
		if(winH <= 550) {
			winH = 550;
		} 
		
		// Resize our slides
		$slide.height(winH);
		$slideTall.height(winH*2);
		$slideTall2.height(winH*3);
		
		// Refresh Skrollr after resizing our sections
		s.refresh($('.homeSlide'));	    
	}

	function showToast() {
		toastr.options = {
			"closeButton": false,
			"debug": false,
			"positionClass": "toast-bottom-right",
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		};

		toastr.info("Lots more to see - Scroll down");
	}
} )(jQuery, toastr);