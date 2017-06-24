var logoVariants = [
        'Воплощения Мечтаний и Мегавозможностей',
        'Выявляющая Менеджеров и Маркетологов'
    ],
    currentLogoIndex = 1,
    changeLogoTimeout = 1500;
;(function ($) {
    $.fn.microcarousel = function (options) {
        var settings = $.extend({
            timer_latency: 80
        }, options);

        return this.each(function () {
            var timer, $wrapper = $(this);

            $wrapper.children().addClass("slide");

            timer = setTimeout(switch_slide, $wrapper.find(".slide:eq(0)").text().length * settings.timer_latency);

            function switch_slide() {
                var r=Math.random();
                if(r>0.5) {
                    var nextLogo=logoVariants[Math.floor(Math.random()*logoVariants.length)];
                    $('<li>'+nextLogo+'</li>').appendTo($wrapper);
                    $wrapper.find(".slide:eq(0)").animate({"margin-top": -$wrapper.height()}, function () {
                        $(this).css({"margin-top": 0}).appendTo($wrapper);
                        clearTimeout(timer);
                        timer = setTimeout(switch_slide, $(this).text().length * settings.timer_latency);
                    });
                }
                else{
                    $wrapper.find(".slide:eq(0)").animate({"margin-top": -$wrapper.height()}, function () {
                        $('.header-right').html('<li>Вычислительной Математики и Механики</li>');
                        clearTimeout(timer);
                        timer = setTimeout(switch_slide, $(this).text().length * settings.timer_latency);
                    });
                }
            }
        });
    };
})(jQuery);
$(function () {
    //$(".header-right").microcarousel();
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                console.log(target.offset().top);
                $('html, body').animate({
                    scrollTop: target.offset().top+2
                }, 1000);
                return false;
            }
        }
    });
    var breakpoints=['#about', '#ist', '#contact'];
    breakpoints=breakpoints.map((i)=>$(i).offset().top);
    var dur=window.innerHeight+20;
    var lastIndex=0;
    $(document).on('scroll', function (e) {
        var currentPoint;
        var scroll=$(document).scrollTop()
        for(var k=0; k<breakpoints.length-1; k++){
            if(parseInt(scroll)>=parseInt(breakpoints[k]) && parseInt(scroll)<=parseInt(breakpoints[k+1])){
                currentPoint=k;
            }
        }
        if(parseInt(scroll)>=parseInt(breakpoints[breakpoints.length-1])){
            currentPoint=breakpoints.length-1;
        }
        $('.timeline ul li').removeClass('active');
        if(currentPoint!==undefined) {
            $($('.timeline ul li')[currentPoint]).addClass('active');
        }
    })
    var controller=new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement:'#about'
    })
        .setClassToggle('.timeline', 'visible')
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement:'#about',
        duration:dur
    })
        .setClassToggle('.about-roller', 'active')
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement:'#ist',
        duration:dur
    })
        .setClassToggle('.ist-roller', 'active')
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement:'#contact',
        duration:dur
    })
        .setClassToggle('.contact-roller', 'active')
        .addTo(controller);
})