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
const STORAGE_NAME = 'formData';
const modalForm = new bootstrap.Modal(document.getElementById('formModal'));
const modalImg = new bootstrap.Modal(document.getElementById('imageModal'));
const storage = localStorage.getItem(STORAGE_NAME);

document.addEventListener('DOMContentLoaded', () => {
    const modalImageTrigger = document.querySelectorAll('[data-modal-img]');
    const modalFormTrigger = document.querySelectorAll('button[data-modal-form]');
    const modalContent = document.querySelector('.image-modal__body');

    modalImageTrigger.forEach((triggerElement) => {
        triggerElement.addEventListener('click', () => {
            if (triggerElement.tagName.toLowerCase() === 'img') {
                modalContent.innerHTML = `<img src='${triggerElement.src}' class='img-fluid' alt='Modal Image'>`;
                modalImg.show();
            }
        });
    });

    modalFormTrigger.forEach((triggerElement) => {
        triggerElement.addEventListener('click', () => {
            modalForm.show();
        });
    });

    modalImg._element.addEventListener('hidden.bs.modal', () => {
        modalContent.innerHTML = '';
    });
});

const submitForm = (e) => {
    const store = storage ? JSON.parse(storage) : [];
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const check = document.getElementById('subscribe');

    const item = {
        email: email.value,
        tel: tel.value,
        check: check.value,
    };

    localStorage.setItem(STORAGE_NAME, JSON.stringify([item, ...store]));

    modalForm._element.addEventListener('hidden.bs.modal', () => {
        email.value = '';
        tel.value = '';
        check.value = 'on';
    });

    modalForm.hide();

    e.preventDefault();
};

const subscribeForm = (e) => {
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
};

form.addEventListener('submit', submitForm);
subscribe.addEventListener('submit', subscribeForm);
