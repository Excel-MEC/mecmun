/* global ScrollMagic, Linear */

(function($){
    "use strict";
    
    var $document = $(document),
        $window = $(window),
        $body = $('body'),
        $navbar = $('.navbar'),
        $navbarCollapse = $('.navbar-collapse'),
        $scrollToTop = $('.scroll-to-top'),
        $pageScrollLink = $('a.page-scroll'),
        $galleryGrid = $('.gallery-grid'),
        navHeight = 80,
        navHeightShrink = 61;
    
    $document.on('ready', function(){
        
        $window.on('scroll', function(){
        
            // Shrink navigation.
            if ($document.scrollTop() > navHeight){
                $navbar.addClass('shrink');
            }
            else{
                $navbar.removeClass('shrink');
            }


            // Scroll to top.
            if ($(this).scrollTop() > 100){
                $scrollToTop.fadeIn();
            } 
            else{
                $scrollToTop.fadeOut();
            }
        });
        
        
        
        $window.smartload(function(){
            
            // Bootstrap scrollspy
            var ww = Math.max($window.width(), window.innerWidth);

            $body.scrollspy({    
                target: '#navigation',
                offset: ww > 992 ? navHeightShrink : navHeight
            });
            
            
            // Page scrolling
            pageScroll();
            
            
            // Gallery grid
            if ($.fn.imagesLoaded && $.fn.isotope){
                $galleryGrid.imagesLoaded(function(){
                    $galleryGrid.isotope({
                        itemSelector: '.item',
                        layoutMode: 'masonry'
                    });
                });
            }
            else{
                console.log('Gallery grid: Plugin "imagesLoaded" is not loaded.');
                console.log('Gallery grid: Plugin "isotope" is not loaded.');
            }            
        });
        
        
        
        $window.smartresize(function(){
            
            // Bootstrap scrollspy
            var dataScrollSpy = $body.data('bs.scrollspy'),
                ww = Math.max($window.width(), window.innerWidth),
                offset = ww > 992 ? navHeightShrink : navHeight;
        
            dataScrollSpy.options.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');
            
            
            // Page scrolling
            pageScroll();
            
            
            // Gallery grid
            if ($.fn.isotope){
                $galleryGrid.isotope('layout');
            }
            else{
                console.log('Gallery grid: Plugin "isotope" is not loaded.');
            }
        });
        
        
        
        /*------------------------------------*\
            Detect mobile device.
        \*------------------------------------*/        
        
        var isMobile = {
            Android: function(){
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function(){
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function(){
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function(){
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function(){
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function(){
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        
        
        
        /*------------------------------------*\
            Page scrolling feature.
        \*------------------------------------*/

        function pageScroll(){
            $pageScrollLink.on('click', function(e){
                var ww = Math.max($window.width(), window.innerWidth),
                    anchor = $(this),
                    href = anchor.attr('href'),
                    offset = ww > 992 ? navHeightShrink : navHeight;
                console.log($(this)," dist ",href," ",$(href).offset().top - (offset - 1))
                $('html, body').stop().animate({
                    scrollTop: $(href).offset().top - (offset - 1)
                }, 1000, 'easeInOutExpo');
                
                // Automatically retract the navigation after clicking on one of the menu items.
                $navbarCollapse.collapse('hide');
                
                e.preventDefault();
            });
        };
          
        
        
        /*------------------------------------*\
            Gallery filtering
        \*------------------------------------*/   
        
        if ($.fn.isotope){
            var $gridSelectors = $('.gallery-filter').find('a');
            $gridSelectors.on('click', function(e){
                $gridSelectors.parent().removeClass('active');
                $(this).parent().addClass('active');

                var selector = $(this).attr('data-filter');
                $galleryGrid.isotope({
                    filter: selector
                });            

                e.preventDefault();
            });
        }
        else{
            console.log('Gallery filtering: Plugin "isotope" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Gallery magnific popup
        \*------------------------------------*/   
        
        if ($.fn.magnificPopup){
            $galleryGrid.magnificPopup({
                delegate: 'a',
                type: 'image',
                fixedContentPos: false,
                mainClass: 'mfp-fade',
                gallery:{
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
            
            var $popupTrigger = $('.popup-trigger'),
                $popupTriggerClose = $('.popup-trigger-close');
        
            $popupTrigger.on('click', function(e){
                $.magnificPopup.open({
                    items: {
                        src: $(this).closest('.popup-container').find('.popup-content')
                    },
                    type: 'inline',
                    fixedContentPos: true,
                    closeOnContentClick: false,
                    callbacks: {
                        open: function () {
                            $('.mfp-wrap').addClass('popup-wrap');
                        },
                        close: function () {
                            $('.mfp-wrap').removeClass('popup-wrap');
                        }
                    }
                });
                
                e.preventDefault();
            });
            
            $popupTriggerClose.on('click', function(e){
                $.magnificPopup.close();
                e.preventDefault();
            });
        }
        else{
            console.log('Gallery magnific popup: Plugin "magnificPopup" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Counter number
        \*------------------------------------*/
        
        if ($.fn.countTo){
            var $timer = $('.timer');
            $timer.one('inview', function(isInView){
                if(isInView){
                    $(this).countTo();
                }
            });
        }
        else{
            console.log('Counter Number: Plugin "countTo" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Features box
        \*------------------------------------*/        
        
        if (isMobile.any()){
            var $featuresBox = $('.features-box');
            
            $featuresBox.addClass('disabled');
            $featuresBox.find('.show-on-hover').addClass('disabled');
            
            $featuresBox.on('click', function(e){
                $(this).toggleClass('active');
                $(this).find('.show-on-hover').toggleClass('active');
                e.preventDefault();
            });
        };
        
        
        
        /*------------------------------------*\
            Home bg parallax
        \*------------------------------------*/
        
        if (typeof ScrollMagic !== 'undefined'){
            var selector = '#home-bg-parallax';
            
            // Init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 'onEnter', duration: '200%'}});
        
            // Build scenes
            new ScrollMagic.Scene({triggerElement: selector})
                    .setTween(selector + ' > .bg-parallax', {y: '80%', ease: Linear.easeNone})
                    .addTo(controller);
        }
        
        
        
        /*------------------------------------*\
            Home bg slideshow
        \*------------------------------------*/
        
        if ($.fn.flexslider){
            var $bgSlideshowWrapper = $('.bg-slideshow-wrapper'),
                controlNav = ($bgSlideshowWrapper.data('controlnav') === true) ? true : false;;
        
            $bgSlideshowWrapper.flexslider({
                selector: '.slides > .bg-cover',
                easing: 'linear',
                slideshowSpeed: 3700,
                controlNav: controlNav,
                directionNav: false,
                keyboard: false,
                pauseOnAction: true,
                touch: false,
                after: function(slider){
                    if (!slider.playing) {
                        slider.play();
                    }
                }
            });
        }
        else{
            console.log('Home bg slideshow: Plugin "flexslider" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Home bg slider
        \*------------------------------------*/
        
        if ($.fn.flickity){
            var $bgSliderWrapper = $('.bg-slider-wrapper'),
                pageDots = ($bgSliderWrapper.data('pagedots') === true) ? true : false;
            
            $bgSliderWrapper.flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: pageDots,
                draggable: false,
                autoPlay: 3700,
                pauseAutoPlayOnHover: false
            });
            
            var flkty = $bgSliderWrapper.data('flickity');
            $bgSliderWrapper.find('.flickity-page-dots').on('mouseleave', function(){ 
                flkty.playPlayer(); 
            });
        }
        else{
            console.log('Home bg slider: Plugin "flickity" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Home bg video - vimeo
        \*------------------------------------*/
        
        if ($.fn.vimeo_player){
            var $bgndVideo = $('#bgndVideoVimeo');
            
            if (! isMobile.any()){
                $bgndVideo.vimeo_player({
                    containment: 'self',
                    autoPlay: true,
                    mute: true,
                    showControls: false,
                    quality: 'medium',
                    opacity: 1,
                    loop: true,
                    startAt: 0
                });
            }
            else{
                $bgndVideo.hide();
                $bgndVideo.parent().css('background-image', 'url("' + $bgndVideo.data('video-poster') + '")');
            }
        }
        else{
            console.log('Home bg video - vimeo: Plugin "vimeo_player" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Home bg video - youtube
        \*------------------------------------*/
        
        if ($.fn.YTPlayer){
            var $bgndVideo = $('#bgndVideoYouTube');
            
            if (! isMobile.any()){
                $bgndVideo.YTPlayer({
                    containment: 'self',
                    autoPlay: true,
                    mute: true,
                    showControls: false,
                    quality: 'medium',
                    opacity: 1,
                    loop: true,
                    startAt: 0
                });
            }
            else{
                $bgndVideo.hide();
                $bgndVideo.parent().css('background-image', 'url("' + $bgndVideo.data('video-poster') + '")');
            }
        }
        else{
            console.log('Home bg video - youtube: Plugin "YTPlayer" is not loaded.');
        }
            
        
        
        /*------------------------------------*\
            Animated typing
        \*------------------------------------*/
        
        if ($.fn.typed){
            var $typedStrings = $('.typed-strings');
            $typedStrings.typed({
                strings: ['Learning', 'Growing and', 'Mingling'],
                typeSpeed: 130,
                loop: true,
                showCursor: false
            });
        }
        else{
            console.log('Animated typing: Plugin "typed" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Countdown
        \*------------------------------------*/
        
        if ($.fn.countdown){
            var $clock = $('#clock'),
                untilDate = $clock.data('until-date');

            $clock.countdown(untilDate, function(e){
                $(this).html(e.strftime(''
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%D</span><span class="display-block text-small">Days</span></div></div></div>'
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%H</span><span class="display-block text-small">Hr</span></div></div></div>'
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%M</span><span class="display-block text-small">Min</span></div></div></div>'
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%S</span><span class="display-block text-small">Sec</span></div></div></div>'));
            });
        }
        else{
            console.log('Countdown: Plugin "countdown" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Section - Schedule
        \*------------------------------------*/
        
        if ($.fn.flickity){
            var $carouselSchedule = $('.carousel-schedule');
            $carouselSchedule.flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                draggable: (isMobile.any()) ? false : true
            });
            
            $('.nav-tabs', '#schedule').children().on('click', function(e){
                $('.carousel-schedule').flickity('select', $(this).index());
            });
            
            if (isMobile.any()){
                var flkty = $carouselSchedule.data('flickity');
                $carouselSchedule.on('select.flickity', function(){
                    $('.nav-tabs', '#schedule').find('li:eq(' + flkty.selectedIndex + ') a').tab('show');
                });
            };
        }
        else{
            console.log('Section - Schedule: Plugin "flickity" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Section - FAQ (Accordions)
        \*------------------------------------*/
        
        $('.panel-group').each(function(){
            var $panelGroupId = $('#' + $(this).attr('id'));
            $(this).find('a').on('click', function(e){
                $panelGroupId.find('.panel').removeClass('active');
                $(this).parent().parent().parent().addClass('active');
            });
        });
        
        
        
        /*------------------------------------*\
            Contact form
        \*------------------------------------*/
        
        // Register form
        var $registerForm = $('#form-register'),
            $btnRegisterForm = $('#btn-form-register');
        
        $btnRegisterForm.on('click', function(e){
            $registerForm.validate();
            if ($registerForm.valid()){
                send_mail($registerForm, $btnRegisterForm);
            }
            e.preventDefault();
        });
        
        // Contact form
        var $contactForm = $('#form-contact'),
            $btnContactForm = $('#btn-form-contact');
        
        $btnContactForm.on('click', function(e){
            $contactForm.validate();
            if ($contactForm.valid()){
                send_mail($contactForm, $btnContactForm);
            }
            e.preventDefault();
        });
        
        // Send mail
        function send_mail($form, $btnForm){
            var defaultMessage = $btnForm.html(),
                sendingMessage = 'Loading...',
                errorMessage = 'Error Sending!',
                okMessage = 'Email Sent!';
            
            $btnForm.html(sendingMessage);
            
            $.ajax({
                url: $form.attr('action'),
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function(data){
                    if (data === true){
                        $btnForm.html(okMessage);
                        $form.find('input[type="text"], textarea').val('');
                    }
                    else{
                        $btnForm.html(errorMessage);
                    }

                    setTimeout(function(){
                        $btnForm.html(defaultMessage);
                    }, 3000);
                },
                error: function(xhr, err){
                    $btnForm.html(errorMessage);

                    setTimeout(function(){
                        $btnForm.html(defaultMessage);
                    }, 3000);
                }
            });
        }
    });
})(jQuery);
