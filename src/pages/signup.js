import Storage from '../storage/app-storage.js';
import { createInputContainer, renderLayout, createNewUser, signupFormValidation, newOption } from '../use-cases/index.js';


export const SignupPage = (appContainer) => {

    const body = document.querySelector('body');

    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');
    overlayElement.setAttribute('showed', 'false');
    body.appendChild(overlayElement);

    const form = document.createElement('form');
    form.classList.add('form__container');
    form.id = 'signupForm';

    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar__container');
    const avatarAnchor = document.createElement('a');
    avatarAnchor.classList.add('avatar');
    avatarAnchor.type = 'button';
    const avatar = document.createElement('img');
    avatar.src = '/icons/User_01.svg';
    avatar.alt = 'user icon';
    avatar.classList.add('no__avatar');
    avatarAnchor.appendChild(avatar);
    const avatarLabel = document.createElement('label');
    avatarLabel.innerText = 'Avatar';
    avatarContainer.append(avatarAnchor, avatarLabel);

    avatarAnchor.addEventListener('click', selectAvatar);

    const nameContainer = createInputContainer('Nombre', 'text', 'name', 'Ingresa tu nombre', 'true');
    const lastNameContainer = createInputContainer('Apellido', 'text', 'lastName', 'Ingresa tu apellido', 'true');
    const emailContainer = createInputContainer('Correo', 'email', 'email', 'Ingresa tu correo electrónico', 'true');
    const passContainer = createInputContainer('Clave', 'password', 'password', 'Ingresa tu Clave', 'true');
    const repeatPassContainer = createInputContainer('Repetir Clave', 'password', 'repeatPassword', 'Repite tu Clave', 'true');

    const securityQuestions = document.createElement('section');
    securityQuestions.classList.add('security__questions');
    const securityQuestionsTitle = document.createElement('h3');
    securityQuestionsTitle.innerText = 'Preguntas de Seguridad';
    const securityQuestionsSubtitle = document.createElement('span');
    securityQuestionsSubtitle.innerText = 'Debes seleccionar al menos 3 preguntas';
    securityQuestions.append(securityQuestionsTitle, securityQuestionsSubtitle);

    const questionsContainer = document.createElement('div');
    questionsContainer.classList.add('input__container', 'questions__container');

    const questionsSelect = document.createElement('select');
    questionsSelect.classList.add('questions__select');
    questionsSelect.name = 'questions';
    questionsSelect.id = 'questions';

    const questions = Storage.getSecurityQuestionsData();

    for (let i = 0; i < questions.length; i++) {
        const option = newOption(i, questions[i]);
        questionsSelect.appendChild(option);
    }

    const questionsInput = document.createElement('input');
    questionsInput.type = 'text';
    questionsInput.name = 'answer';
    questionsInput.placeholder = 'Tu respuesta';

    const questionMessage = document.createElement('span');
    questionMessage.classList.add('input__message');

    const nextQuestionBtn = document.createElement('button');
    nextQuestionBtn.classList.add('next__question__btn');
    nextQuestionBtn.name = 'nextQuestion';
    nextQuestionBtn.innerText = 'Siguiente';
    nextQuestionBtn.type = 'button';

    questionsContainer.append(questionsSelect, questionsInput, questionMessage, nextQuestionBtn);


    form.append(avatarContainer, nameContainer, lastNameContainer, emailContainer, passContainer, repeatPassContainer, securityQuestions, questionsContainer);

    const footerBtn = document.createElement('button');
    footerBtn.classList.add('layout__footer--btn');
    footerBtn.innerText = 'Registrarme';
    footerBtn.type = 'button';

    renderLayout(appContainer, 'Regístrate', { src: '/icons/Arrow_Undo_Up_Left.svg', alt: 'Volver' }, form, footerBtn);

    const dialog = createDialog();

    body.appendChild(dialog);

    selectAvatar();

    signupFormValidation(footerBtn);

}

const selectAvatar = () => {

    const avatarAnchor = document.querySelector('.avatar');

    const avatarImg = document.createElement('img');

    const body = document.querySelector('body');

    let overlay = document.querySelector('.overlay');

    avatarAnchor.addEventListener('click', () => {
        const dialog = document.querySelector('.avatar__list__container');

        const avatarList = dialog.querySelectorAll('.avatar__list .avatar__list__item');

        avatarList.forEach((avatar) => {
            avatar.addEventListener('click', () => {
                avatarImg.src = avatar.querySelector('img').src;
                avatarImg.alt = avatar.querySelector('img').alt;

                const avatarSelected = document.querySelector('.avatar__container .avatar img');

                avatarSelected.src = avatarImg.src;
                avatarSelected.alt = avatarImg.alt;
                avatarSelected.classList.remove('no__avatar');
                avatarSelected.classList.add('avatar__selected');
                closeAvatarSignupDialog(dialog);
            })
        })

        overlay.setAttribute('showed', 'true');

        overlay.addEventListener('click', () => {
            closeAvatarSignupDialog(dialog);
        })

        body.classList.add('noscroll');
        dialog.show();
    });

    const closeAvatarSignupDialog = (dialog) => {
        dialog.close();
        overlay.setAttribute('showed', 'false');
        body.classList.remove('noscroll');
    }

}

const createDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('avatar__list__container');
    dialog.open = false;

    const title = document.createElement('h3');
    title.innetText = 'Elige tu avatar';

    const avatarList = document.createElement('div');
    avatarList.classList.add('avatar__list');

    for (let i = 1; i <= 12; i++) {
        const a = document.createElement('a');
        const img = document.createElement('img');
        a.classList.add('avatar__list__item');
        img.src = `/avatars/avatar${i}.svg`;
        img.alt = `Avatar ${i}`;
        a.appendChild(img);
        avatarList.appendChild(a);
    }

    dialog.append(title, avatarList);

    return dialog;
}