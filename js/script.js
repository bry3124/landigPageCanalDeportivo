// Scroll suave para enlaces de ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contadores animados
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observador de intersección para animaciones de desplazamiento
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            // Trigger contador animado para números de estadísticas
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }

            // Solo animar una vez
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa todos los elementos con el atributo data-aos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// Funcionalidad del carrusel
class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carousel-slide');
        this.dots = container.querySelectorAll('.dot');
        this.prevBtn = container.querySelector('.carousel-btn.prev');
        this.nextBtn = container.querySelector('.carousel-btn.next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        // Event listeners de botones
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Event listeners de puntos
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Auto-play (optional - comentado por defecto)
        // this.startAutoPlay();

        // Soporte táctil/deslizante
        this.addSwipeSupport();
    }

    goToSlide(index) {
        // Eliminar clase activa de la diapositiva y el punto actual
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Actualizar diapositiva actual
        this.currentSlide = index;

        // Añadir clase activa a la nueva diapositiva y al punto
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Cambiar diapositiva cada 5 segundos
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    addSwipeSupport() {
        let startX = 0;
        let endX = 0;

        const carouselContainer = this.container.querySelector('.carousel-container');

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', () => {
            const diff = startX - endX;
            const threshold = 50; // Distancia mínima de deslizamiento

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const guideCarousel = document.querySelector('.guide-carousel');
    if (guideCarousel) {
        new Carousel(guideCarousel);
    }

    const resultsCarousel = document.querySelector('.results-carousel');
    if (resultsCarousel) {
        new Carousel(resultsCarousel);
    }
});

// Indicador de desplazamiento oculto al desplazarse
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// Efecto parallax para el fondo del héroe
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.scrollY;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Seguimiento de clics en botones CTA (Análisis opcional)
document.querySelectorAll('.cta-button, .cta-button-large').forEach(button => {
    button.addEventListener('click', (e) => {
        // Seguimiento de clics en botones CTA (integrar con tu herramienta de análisis)
        console.log('CTA Button Clicked:', e.target.textContent.trim());
    });
});

// Modal de tarjetas de resultados
document.querySelectorAll('.result-card').forEach(card => {
    card.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
            // Crear modal para mostrar la imagen en tamaño completo
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                </div>
            `;

            // Añadir estilos al modal
            const style = document.createElement('style');
            style.textContent = `
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .modal-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 10px;
                    box-shadow: 0 0 50px rgba(0, 255, 136, 0.5);
                }
                .modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: var(--color-loss);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .modal-close:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 20px rgba(255, 0, 85, 0.6);
                }
            `;

            document.head.appendChild(style);
            document.body.appendChild(modal);

            // Cerrar modal al hacer clic
            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');

            closeBtn.addEventListener('click', () => {
                modal.remove();
                style.remove();
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    modal.remove();
                    style.remove();
                }
            });

            // Cerrar con la tecla ESC
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    style.remove();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        }
    });
});

// Optimización de rendimiento
// Carga diferida de imágenes
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Huevo de Pascua en la consola
console.log('%c🔥 BETLEGEND OFICIAL 🔥', 'font-size: 40px; font-weight: bold; color: #00ff88; text-shadow: 0 0 10px #00ff88;');
console.log('%c¿Buscando algo? 👀', 'font-size: 16px; color: #ffd700;');
console.log('%cÚnete al canal: https://t.me/+2qWqXEAjsZxkNTgx', 'font-size: 14px; color: #00d4ff;');
