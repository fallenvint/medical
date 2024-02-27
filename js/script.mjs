import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

const form = document.getElementById('checkEyes');
const subscribe = document.getElementById('subs');
const modalForm = new bootstrap.Modal(document.getElementById('formModal'));
const modalImg = new bootstrap.Modal(document.getElementById('imageModal'));

document.addEventListener('DOMContentLoaded', function () {
    const modalImageTrigger = document.querySelectorAll('[data-modal-img]');
    const modalFormTrigger = document.querySelectorAll('button[data-modal-form]');
    const modalContent = document.querySelector('.image-modal__body');

    modalImageTrigger.forEach(function (triggerElement) {
        triggerElement.addEventListener('click', function () {
            if (this.tagName.toLowerCase() === 'img') {
                modalContent.innerHTML = `<img src='${this.src}' class='img-fluid' alt='Modal Image'>`;
                modalImg.show();
            }
        });
    });

    modalFormTrigger.forEach(function (triggerElement) {
        triggerElement.addEventListener('click', function () {
            modalForm.show();
        });
    });

    modalImg._element.addEventListener('hidden.bs.modal', function () {
        modalContent.innerHTML = '';
    });
});

const submitForm = (e) => {
    let storage = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : [];
    let email = document.getElementById('email');
    let tel = document.getElementById('tel');
    let check = document.getElementById('subscribe');

    const form = {
        email: email.value,
        tel: tel.value,
        check: check.value,
    }

    localStorage.setItem('formData', JSON.stringify([form, ...storage]));

    modalForm._element.addEventListener('hidden.bs.modal', function () {
        email.value = '';
        tel.value = '';
        check.value = 'on';
    });

    modalForm.hide();

    e.preventDefault();
}

form.addEventListener('submit', submitForm);

subscribe.addEventListener('submit', (e) => {
    const email = document.getElementById('emailSubs');
    const button = document.getElementById('btnSubs');

    if (email.value) {
        fetch('subscribe.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email.value})
        })
            .then(response => response.json())
            .then(data => {
                button.textContent = data.answer;
                button.classList.add(data.btnClass);
                email.value = '';
                email.disabled = true;
                button.disabled = true;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    e.preventDefault();
});

