

export const loginFormValidation = (cta) => {

    const form = document.querySelector('#loginForm');

    const email = form.querySelector('input[name="email"]');
    const emailMessage = email.nextElementSibling;

    const password = form.querySelector('input[name="password"]');
    const passwordMessage = password.nextElementSibling;


    email.addEventListener('input', () => {
        if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            email.setCustomValidity('El correo electrónico debe ser válido');
        } else {
            email.setCustomValidity('');
        }
        emailMessage.innerText = email.validationMessage;
    })
    
};