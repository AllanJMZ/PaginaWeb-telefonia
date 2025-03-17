
//CARRITO

let cart = [];
let total = 0;

// Función para agregar un producto al carrito
function addToCart(productName, price, image) {
    cart.push({ name: productName, price: price, image: image });
    total += price;
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Limpiar el contenido actual del carrito
    cartItems.innerHTML = '';

    // Agregar cada producto al carrito
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Actualizar el contador y el total
    cartCount.textContent = cart.length;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
}

// Ejemplo de cómo agregar un producto al carrito
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));
        const productImage = product.querySelector('img').src;
        addToCart(productName, productPrice, productImage);
    });
});

document.getElementById('btn-checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        // Guardar el carrito en localStorage para usarlo en la pantalla de pago
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('total', total.toFixed(2));

        // Redirigir a la página de pago
        window.location.href = 'pago.html';
    } else {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
    }
});



//BANNER PROMOS
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Elimina la clase 'active' de todas las slides y dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Añade la clase 'active' a la slide y el punto correspondiente
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Inicializar el primer slide
showSlide(currentSlideIndex);

// Cambiar la slide cada 5 segundos automáticamente
setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}, 5000);


//BANNER INICIO 
const carouselSlide = document.querySelector('.carousel-slide');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 0;
const size = carouselItems[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', () => {
    if (counter >= carouselItems.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselItems[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselItems.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselItems[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselItems.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});


// RESEÑAS

const stars = document.querySelectorAll('.stars-input i');
const ratingInput = document.getElementById('rating');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        ratingInput.value = rating;

        // Cambiar el color de las estrellas
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
    });
});

// Manejar el envío del formulario
document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu reseña!');
    // Aquí puedes agregar la lógica para enviar la reseña al servidor
});


// FORMULARIO 

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    // Aquí puedes agregar la lógica para enviar el formulario al servidor
});

//FAQS

function toggleAnswer(id) {
    const answer = document.getElementById(`answer${id}`);
    const question = answer.previousElementSibling;

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        question.classList.remove('active');
    } else {
        answer.style.display = 'block';
        question.classList.add('active');
    }
}