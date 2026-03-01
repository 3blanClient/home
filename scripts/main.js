document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initScrollEvents();
    initShowcaseSlider();
    initFaqAccordion();
    initDownloadButtons();
    initMobileMenu();
    initPaymentModal();
});

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
    
    const links = document.querySelectorAll('a, button, .feature-card, .faq-question, .download-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '0px';
            cursor.style.height = '0px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderColor = 'var(--accent-color)';
            cursorFollower.style.backgroundColor = 'rgba(0, 204, 255, 0.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderColor = 'var(--accent-color)';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
}

function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    particle.style.left = `${xPos}%`;
    particle.style.top = `${yPos}%`;
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    const hue = Math.random() * 40 + 200;
    particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.8)`;
    particle.style.boxShadow = `0 0 ${size * 2}px hsla(${hue}, 100%, 70%, 0.8)`;
    
    container.appendChild(particle);
    
    const keyframes = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 180}deg);
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 180}deg);
        }
    }`;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
}

function initScrollEvents() {
    const header = document.querySelector('header');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    if (featureCards.length) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        document.addEventListener('scroll', () => {
            featureCards.forEach(card => {
                if (isElementInViewport(card) && !card.classList.contains('visible')) {
                    card.classList.add('visible');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function initShowcaseSlider() {
    const showcaseWrapper = document.querySelector('.showcase-wrapper');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const prevBtn = document.querySelector('.showcase-nav-btn.prev');
    const nextBtn = document.querySelector('.showcase-nav-btn.next');
    const dotsContainer = document.querySelector('.showcase-dots');
    
    if (!showcaseWrapper || !showcaseItems.length) return;
    
    let currentIndex = 0;
    
    showcaseItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('showcase-dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.showcase-dot');
    
    function goToSlide(index) {
        currentIndex = index;
        showcaseWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? showcaseItems.length - 1 : currentIndex - 1;
            goToSlide(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === showcaseItems.length - 1) ? 0 : currentIndex + 1;
            goToSlide(currentIndex);
        });
    }
    
    setInterval(() => {
        currentIndex = (currentIndex === showcaseItems.length - 1) ? 0 : currentIndex + 1;
        goToSlide(currentIndex);
    }, 5000);
    
    showcaseWrapper.addEventListener('touchstart', handleTouchStart, false);
    showcaseWrapper.addEventListener('touchmove', handleTouchMove, false);
    
    let xDown = null;
    
    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
    }
    
    function handleTouchMove(evt) {
        if (!xDown) return;
        
        const xUp = evt.touches[0].clientX;
        const xDiff = xDown - xUp;
        
        if (xDiff > 50) {
            currentIndex = (currentIndex === showcaseItems.length - 1) ? 0 : currentIndex + 1;
            goToSlide(currentIndex);
        } else if (xDiff < -50) {
            currentIndex = (currentIndex === 0) ? showcaseItems.length - 1 : currentIndex - 1;
            goToSlide(currentIndex);
        }
        
        xDown = null;
    }
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
    
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
    }
}

function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-button');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const version = button.getAttribute('data-version');
            
            // Только для VIP (Release) показываем модальное окно
            if (version === 'vip') {
                // Модальное окно уже открывается через initPaymentModal
                return;
            }
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Файл загружается';
                
                setTimeout(() => {
                    button.innerHTML = version === 'free' ? 
                        '<i class="fas fa-download"></i> Скачать бесплатно' : 
                        version === 'premium' ? 
                        '<i class="fas fa-download"></i> Скачать Premium' : 
                        '<i class="fas fa-shopping-cart"></i> Купить за 600 ₽';
                }, 2000);
            }, 2000);
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const socialLinks = document.querySelector('.social-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', () => {
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (!mobileNav) {
            const mobileNavElement = document.createElement('div');
            mobileNavElement.classList.add('mobile-nav');
            
            const navLinksClone = navLinks.cloneNode(true);
            mobileNavElement.appendChild(navLinksClone);
            
            if (socialLinks) {
                const socialLinksClone = socialLinks.cloneNode(true);
                mobileNavElement.appendChild(socialLinksClone);
            }
            
            const closeButton = document.createElement('button');
            closeButton.classList.add('mobile-nav-close');
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            mobileNavElement.appendChild(closeButton);
            
            document.body.appendChild(mobileNavElement);
            
            setTimeout(() => {
                mobileNavElement.classList.add('active');
            }, 10);
            
            closeButton.addEventListener('click', () => {
                mobileNavElement.classList.remove('active');
                
                setTimeout(() => {
                    document.body.removeChild(mobileNavElement);
                }, 300);
            });
            
            const mobileNavLinks = mobileNavElement.querySelectorAll('a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNavElement.classList.remove('active');
                    
                    setTimeout(() => {
                        document.body.removeChild(mobileNavElement);
                    }, 300);
                });
            });
        } else {
            mobileNav.classList.toggle('active');
        }
    });
}

function initPaymentModal() {
    // Создаем модальное окно
    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal';
    paymentModal.innerHTML = `
        <div class="payment-modal-content">
            <button class="payment-modal-close"><i class="fas fa-times"></i></button>
            <h2 class="section-title" style="margin-bottom: 20px;">Оформление заказа</h2>
            <div class="version-name">Release</div>
            <div class="price">119 ₽</div>
            
            <div class="payment-cards">
                <div class="payment-card" data-payment="funpay">
                    <input type="radio" name="payment" id="funpay" value="funpay">
                    <div class="payment-card-content">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyxhLGG0jsNrVvwRdangZBwOkGHSPbRamb8A&s" alt="FunPay" class="payment-logo">
                        <span class="payment-name">FunPay</span>
                    </div>
                </div>
                <div class="payment-card" data-payment="starvell">
                    <input type="radio" name="payment" id="starvell" value="starvell">
                    <div class="payment-card-content">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKBCz8BE-aJ31eZzLNooe5bZNePsTinOLtQA&s" alt="Starvell" class="payment-logo">
                        <span class="payment-name">Starvell</span>
                    </div>
                </div>
            </div>
            
            <div class="selected-payment-info" id="selected-payment-info" style="opacity: 0.5; filter: grayscale(0.5);">
                <div class="selected-payment-logo">
                    <i class="fas fa-credit-card" style="font-size: 32px; color: var(--text-secondary);"></i>
                </div>
                <div class="selected-payment-text">
                    <span class="info-message" style="color: var(--text-secondary);">Выберите способ оплаты</span>
                </div>
            </div>
            
            <div class="checkbox-wrapper">
                <input type="checkbox" id="agree">
                <label for="agree">Я согласен с условиями покупки</label>
            </div>
            
            <button class="payment-submit" id="payment-submit" disabled style="opacity: 0.5; pointer-events: none;">
                <i class="fas fa-external-link-alt"></i>
                <span>Выберите способ оплаты</span>
            </button>
        </div>
    `;

    document.body.appendChild(paymentModal);

    // Обработчики для модального окна
    const modal = document.querySelector('.payment-modal');
    const modalClose = document.querySelector('.payment-modal-close');
    const paymentCards = document.querySelectorAll('.payment-card');
    const selectedPaymentInfo = document.getElementById('selected-payment-info');
    const paymentSubmit = document.getElementById('payment-submit');
    const agreeCheckbox = document.getElementById('agree');
    
    // Переменная для отслеживания выбранного способа оплаты
    let selectedPayment = null;

    // Функция для обновления состояния кнопки
    function updateSubmitButton() {
        if (selectedPayment && agreeCheckbox.checked) {
            paymentSubmit.disabled = false;
            paymentSubmit.style.opacity = '1';
            paymentSubmit.style.pointerEvents = 'auto';
        } else {
            paymentSubmit.disabled = true;
            paymentSubmit.style.opacity = '0.5';
            paymentSubmit.style.pointerEvents = 'none';
        }
    }

    // Функция для обновления информации о выбранном способе оплаты
    function updatePaymentInfo(paymentValue, paymentName, logoUrl) {
        selectedPaymentInfo.style.opacity = '1';
        selectedPaymentInfo.style.filter = 'none';
        
        selectedPaymentInfo.innerHTML = `
            <div class="selected-payment-logo">
                <img src="${logoUrl}" alt="${paymentName}" class="info-logo">
            </div>
            <div class="selected-payment-text">
                <span class="info-message">Вы будете перенаправлены на <strong>${paymentName}</strong> для завершения покупки</span>
            </div>
        `;
        
        paymentSubmit.innerHTML = `<i class="fas fa-external-link-alt"></i><span>Перейти на ${paymentName}</span>`;
    }

    // Обработка изменения чекбокса
    agreeCheckbox.addEventListener('change', updateSubmitButton);

    // Обработка выбора способа оплаты
    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Убираем выделение со всех карточек
            paymentCards.forEach(c => {
                c.classList.remove('selected');
                const radio = c.querySelector('input[type="radio"]');
                radio.checked = false;
            });
            
            // Выделяем выбранную карточку
            card.classList.add('selected');
            const radio = card.querySelector('input[type="radio"]');
            radio.checked = true;
            
            const paymentValue = radio.value;
            const paymentName = paymentValue === 'funpay' ? 'FunPay' : 'Starvell';
            const logoUrl = paymentValue === 'funpay' 
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyxhLGG0jsNrVvwRdangZBwOkGHSPbRamb8A&s'
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKBCz8BE-aJ31eZzLNooe5bZNePsTinOLtQA&s';
            
            // Сохраняем выбранный способ оплаты
            selectedPayment = paymentValue;
            
            // Обновляем информацию
            updatePaymentInfo(paymentValue, paymentName, logoUrl);
            
            // Обновляем состояние кнопки
            updateSubmitButton();
        });
    });

    // Закрытие модального окна
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Клик вне модального окна для закрытия
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Обработка отправки формы
    paymentSubmit.addEventListener('click', () => {
        if (!selectedPayment || !agreeCheckbox.checked) {
            return;
        }
        
        const button = paymentSubmit;
        const originalContent = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Перенаправление...</span>';
        button.disabled = true;
        
        setTimeout(() => {
            if (selectedPayment === 'funpay') {
                window.open('https://funpay.com/users/16154242/', '_blank');
            } else {
                window.open('https://starvell.com/users/69778', '_blank');
            }
            
            button.innerHTML = originalContent;
            updateSubmitButton();
        }, 1500);
    });

    // Открытие модального окна при клике на кнопку купить
    document.querySelectorAll('.download-button[data-version="vip"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Сбрасываем все состояния при открытии
            selectedPayment = null;
            
            // Снимаем выделение со всех карточек
            paymentCards.forEach(card => {
                card.classList.remove('selected');
                const radio = card.querySelector('input[type="radio"]');
                radio.checked = false;
            });
            
            // Сбрасываем чекбокс
            agreeCheckbox.checked = false;
            
            // Возвращаем информационное поле в исходное состояние
            selectedPaymentInfo.style.opacity = '0.5';
            selectedPaymentInfo.style.filter = 'grayscale(0.5)';
            selectedPaymentInfo.innerHTML = `
                <div class="selected-payment-logo">
                    <i class="fas fa-credit-card" style="font-size: 32px; color: var(--text-secondary);"></i>
                </div>
                <div class="selected-payment-text">
                    <span class="info-message" style="color: var(--text-secondary);">Выберите способ оплаты</span>
                </div>
            `;
            
            // Сбрасываем текст кнопки
            paymentSubmit.innerHTML = '<i class="fas fa-external-link-alt"></i><span>Выберите способ оплаты</span>';
            
            // Обновляем состояние кнопки
            updateSubmitButton();
            
            // Открываем модальное окно
            modal.classList.add('active');
        });
    });
}

document.head.appendChild(style);
