const QUOTES_API_URL = 'https://api.quotable.io/random';

document.addEventListener('DOMContentLoaded', function () {
    fetchQuote();
});

async function fetchQuote() {
    try {
        const response = await fetch(QUOTES_API_URL);
        const data = await response.json();

        document.getElementById('quoteText').textContent = `"${data.content}"`;
        document.getElementById('quoteAuthor').textContent = `— ${data.author}`;

        const quoteCard = document.querySelector('.quote-card');
        quoteCard.style.animation = 'none';
        setTimeout(() => {
            quoteCard.style.animation = 'fadeIn 0.5s ease-out';
        }, 10);
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quoteText').textContent = '"Every day is a new opportunity to fight and win." — Unknown';
        document.getElementById('quoteAuthor').textContent = '— Unknown';
    }
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    showMessage('Thank you for reaching out! We will contact you soon.', 'success');

    document.getElementById('contactForm').reset();

    console.log('Form submitted:', { name, email, message });

    setTimeout(() => {
        document.getElementById('formMessage').style.display = 'none';
    }, 5000);
});

function showMessage(text, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});