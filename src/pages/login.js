import { createInputContainer, renderLayout, loginFormValidation } from '../use-cases/index.js';

export const LoginPage = (appContainer) => {

    const form = document.createElement('form');
    form.classList.add('form__container');
    form.id = 'loginForm';

    const emailContainer = createInputContainer('Correo', 'email', 'email', 'Ingresa tu correo electrónico', 'true');

    const passContainer = createInputContainer('Clave', 'password', 'password', 'Ingresa tu Clave', 'true');

    const forgivePass = document.createElement('a');
    forgivePass.classList.add('form__forgive__btn');
    forgivePass.innerText = 'Olvidé mi clave';

    form.appendChild(emailContainer);
    form.appendChild(passContainer);
    form.appendChild(forgivePass);

    const footerBtn = document.createElement('button');
    footerBtn.classList.add('layout__footer--btn');
    footerBtn.innerText = 'Iniciar Sesión';


    renderLayout(appContainer, 'Iniciar Sesión', { src: '/icons/Arrow_Undo_Up_Left.svg', alt: 'Volver' }, form, footerBtn);

    loginFormValidation(footerBtn);

}