function toggleForm() {
    const container = document.querySelector('.container');
    container.classList.toggle('register-mode');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    if (email && password) {
        this.querySelector('.success-message').style.display = 'block';
        setTimeout(() => {
            this.querySelector('.success-message').style.display = 'none';
            this.reset();
        }, 2000);
    } else {
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 500);
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) isValid = false;
    });

    if (isValid) {
        this.querySelector('.success-message').style.display = 'block';
        setTimeout(() => {
            this.querySelector('.success-message').style.display = 'none';
            this.reset();
        }, 2000);
    } else {
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 500);
    }
});