$(
    function(){
        $('.loop').owlCarousel({
            center: true,
            items:1,
            loop:true,
            margin:50,
            responsive:{
                600:{
                    items:2
                }
            },
            autoplay:true,
            autoplayTimeout:4000,
            autoplayHoverPause:true
        });
    }
)