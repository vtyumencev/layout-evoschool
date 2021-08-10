$(function () {

    let options =  {
        translation: {
            'Z': {
                pattern: /[+]/, optional: true
            }
        },
        onKeyPress: function(cep, e, field, options) {
            if(cep.length === 1 && cep[0] === '9') {
                field.val('+7 (9');
            }
            else if(cep.length === 1 && cep[0] === '3') {
                field.val('+7 (3');
            }
            else if(cep.length === 1 && cep[0] === '7') {
                field.val('+7 (');
            }
            else if(cep.length === 2 && cep[0] === '+' && cep[1] !== '7') {
                field.val('+');
            }
            else if(cep.length === 1 && cep[0] !== '8' && cep[0] !== '+') {
                field.val('');
            }
        }
    };
    $('input[type="tel"]').mask('Z0 (000) 000-00-00', options);




    // https://stackoverflow.com/a/36389263
    let getTimeout = function() {
        let e = setTimeout, b = { };
        setTimeout = function(a,c) {
            let d = e(a, c);
            b[d]=[Date.now(),c];
            return d
        };
        return function(a){
            return(a=b[a])?Math.max(a[1]-Date.now()+a[0],0):NaN
        }
    } ();


    let teachers_swiper_timeout;
    let teachers_swiper_timer_value = 6000;
    let teachers_swiper = new Swiper(".teachers-screen", {
        spaceBetween: 5,
        autoplay: {
            delay: teachers_swiper_timer_value
        },
        on: {
            init: function () {
                sliderInit();
            }
        },
        navigation: {
            nextEl: ".teachers-screen__controller-button--next",
            prevEl: ".teachers-screen__controller-button--prev",
        },
    });


    function sliderInit() {
        teachers_swiper_timeout = setInterval(function () {
            let timeLeft = getTimeout(teachers_swiper.autoplay.timeout);

            if (teachers_swiper.autoplay.running && !teachers_swiper.autoplay.paused) {
                document.querySelector('.teachers-screen__progress-fill').style.transform = "scaleX(" + (1 - timeLeft / teachers_swiper_timer_value) + ")";
            }
            if (teachers_swiper.autoplay.paused) {
                document.querySelector('.teachers-screen__progress-fill').style.transform = "scaleX(0)";
            }
        }, 50)
    }

    teachers_swiper.on('autoplay', function () {
        clearInterval(teachers_swiper_timeout);
        sliderInit();
    });
    teachers_swiper.on('autoplayStop', function () {
        document.querySelector('.teachers-screen__progress-fill').style.transform = "scaleX(0)";
        clearInterval(teachers_swiper_timeout);
    });




    // $("textarea").each(function () {
    //     this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    // }).on("input", function () {
    //     this.style.height = "auto";
    //     this.style.height = (this.scrollHeight) + "px";
    // });

    // $('.mobile-bar__menu-button').on('click', function () {
    //     $('header.header').toggleClass('show-mobile-menu')
    // });

    // $('.ajax-form').on('submit', function (e) {
    //    e.preventDefault();
    //    let formEl = $(this);
    //
    //    $.ajax({
    //        type: formEl.attr('method'),
    //        url: formEl.attr('action'),
    //        data: formEl.serialize(),
    //        complete: function (response) {
    //            formEl.find('input').val('');
    //            $('.modal').modal('hide');
    //            $('#modal-inform').modal('show');
    //        }
    //    });
    //
    // });
    //
    // if($(document).outerWidth() <= 1000) {
    //
    //     $('.main-menu li.has-sub-menu > .main-menu__item-link').on('click', function (e) {
    //         e.preventDefault();
    //
    //         let el = $(this).parent();
    //         el.toggleClass('show');
    //
    //         if(el.hasClass('show')) {
    //             el.find('.sub-menu').slideDown(200);
    //         }
    //         else {
    //             el.find('.sub-menu').slideUp(200);
    //         }
    //     });
    //
    // }
})