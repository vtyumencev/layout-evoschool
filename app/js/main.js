$(function () {

    let options =  {
        translation: {
            'Z': {
                pattern: /[+]/, optional: true
            }
        },
        onKeyPress: function(cep, e, field) {
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
        },
        placeholder: '+7 (___) ___ __ __'
    };
    $('input[type="tel"]').mask('Z0 (000) 000-00-00', options);

    /**
     * Окно модальной связи
     */

    const modalEl = document.getElementById('feedback-modal')
    modalEl.addEventListener('show.bs.modal', function (event) {
        const relatedButton = event.relatedTarget
        if(relatedButton.hasAttribute('data-modal-title')) {
            this.querySelector('.feedback-modal__title').innerHTML = relatedButton.getAttribute('data-modal-title')
        }
        else {
            this.querySelector('.feedback-modal__title').innerHTML = relatedButton.innerHTML
        }

        if(relatedButton.hasAttribute('data-modal-submit-caption')) {
            this.querySelector('.feedback-modal__submit-button').innerHTML = relatedButton.getAttribute('data-modal-submit-caption')
        }
        else {
            this.querySelector('.feedback-modal__submit-button').innerHTML = relatedButton.innerHTML
        }

        this.querySelector('input[name="target-button-id"]').value = relatedButton.getAttribute('data-modal-button-id')
        this.querySelector('input[name="form-name"]').value = relatedButton.getAttribute('data-modal-title')
        this.querySelector('input[name="form-description"]').value = relatedButton.getAttribute('data-modal-description')
    })


    /**
     * Отправка формы
     */
    const feedbackFormElements = document.querySelectorAll('.feedback-form')
    for(let feedbackFormEl of feedbackFormElements) {
        feedbackFormEl.addEventListener('submit', function (event) {
            feedbackFormEl.querySelector('.feedback-form__msg').classList.remove('show')
            event.preventDefault()
            if(!feedbackFormEl.classList.contains('disabled')) {
                feedbackFormEl.classList.add('disabled')


                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: new FormData(feedbackFormEl)
                })
                    .then(response => {
                        if(!response.ok) throw Error(response.status.toString())
                        return response
                    })
                    .then(response => response.json())
                    .then(response => {

                        const feedbackFormFields = feedbackFormEl.querySelectorAll('label input, label textarea')
                        for(let feedbackFormFieldEl of feedbackFormFields) {
                            feedbackFormFieldEl.value = ''
                        }

                        feedbackFormEl.querySelector('.feedback-form__msg').classList.add('show')
                        feedbackFormEl.querySelector('.feedback-form__msg').innerHTML = 'Заявка успешно отправлена'

                        feedbackFormEl.classList.remove('disabled')
                    }).catch(error => {
                        alert('Произошла ошибка. Попробуйте ещё раз.')
                    })
            }
        });
    }

    /*
    Слайдеры
     */

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