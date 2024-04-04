import Storage from '../storage/app-storage.js';
import { newOption } from './create-option-select.js';
import {User} from '../models/user-model.js';

export const signupFormValidation = (cta) => {

    const form = document.querySelector('#signupForm');

    const avatar = form.querySelector('.avatar img');

    const name = form.querySelector('input[name="name"]');
    const nameMessage = name.nextElementSibling;
    const lastName = form.querySelector('input[name="lastName"]');
    const lastNameMessage = lastName.nextElementSibling;
    const email = form.querySelector('input[name="email"]');
    const emailMessage = email.nextElementSibling;
    const password = form.querySelector('input[name="password"]');
    const passwordMessage = password.nextElementSibling;
    const repeatPassword = form.querySelector('input[name="repeatPassword"]');
    const repeatPasswordMessage = repeatPassword.nextElementSibling;

    const securityQuestion = form.querySelector('select[name="questions"]');
    let securityQuestionSelectedValue = 0;

    const securityAnswer = form.querySelector('input[name="answer"]');

    const securityMessage = securityAnswer.nextElementSibling;

    const nextQuestionBtn = form.querySelector('button[name="nextQuestion"]');

    const questionsSelected = [];

    name.addEventListener('input', () => {
        if (name.value.length < 3) {
            name.setCustomValidity('El nombre debe tener al menos 3 caracteres');
        } else {
            name.setCustomValidity('');
        }
        nameMessage.innerText = name.validationMessage;
    })

    lastName.addEventListener('input', () => {
        if (lastName.value.length < 3) {
            lastName.setCustomValidity('El apellido debe tener al menos 3 caracteres');
        } else {
            lastName.setCustomValidity('');
        }
        lastNameMessage.innerText = lastName.validationMessage;
    })

    email.addEventListener('input', () => {
        if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            email.setCustomValidity('El correo electrónico debe ser válido');
        } else {
            email.setCustomValidity('');
        }
        emailMessage.innerText = email.validationMessage;
    })

    password.addEventListener('input', () => {
        if (!checkPassword(password.value, repeatPassword.value)) {
            repeatPassword.setCustomValidity('Las claves no coinciden');

            if (password.value.length < 6) {
                password.setCustomValidity('La clave debe tener al menos 6 caracteres');
            } else {
                password.setCustomValidity('');
            }
        }
        passwordMessage.innerText = password.validationMessage;
        repeatPasswordMessage.innerText = repeatPassword.validationMessage;
    })

    repeatPassword.addEventListener('input', () => {
        if (repeatPassword.value !== password.value) {
            repeatPassword.setCustomValidity('Las claves no coinciden');
        } else {
            repeatPassword.setCustomValidity('');
        }
        repeatPasswordMessage.innerText = repeatPassword.validationMessage;
    })

    securityQuestion.addEventListener('change', () => {
        securityQuestionSelectedValue = securityQuestion.value * 1;
        securityAnswer.setCustomValidity('');
        securityMessage.innerText = securityAnswer.validationMessage;
    })

    securityAnswer.addEventListener('input', () => {
        if (securityQuestionSelectedValue === 0) {
            securityAnswer.setCustomValidity('Debe seleccionar una pregunta de seguridad');
        } else {
            securityAnswer.setCustomValidity('');
        }
        securityMessage.innerText = securityAnswer.validationMessage;
    })

    nextQuestionBtn.addEventListener('click', () => {
        if (securityAnswer.validationMessage !== '') return;
        if (securityAnswer.value === '') {
            securityAnswer.setCustomValidity('Debe llenar la respuesta a la pregunta de seguridad');
            securityMessage.innerText = securityAnswer.validationMessage;
            return;
        };
        if (questionsSelected.length >= 3) {
            securityAnswer.setCustomValidity('Ya seleccionó las 3 preguntas de seguridad');
            securityMessage.innerText = securityAnswer.validationMessage;
            return;
        };

        const question = securityQuestion.options[securityQuestionSelectedValue].text;
        const answer = securityAnswer.value;

        const data = {
            'question': question,
            'answer': answer
        }

        questionsSelected.push(data);

        Storage.removeQuestion(securityQuestionSelectedValue);

        securityQuestion.innerHTML = '';

        const questions = Storage.getSecurityQuestionsData();

        for (let i = 0; i < questions.length; i++) {
            const option = newOption(i, questions[i]);
            securityQuestion.appendChild(option);
        }

        securityAnswer.value = '';

    })


    cta.addEventListener('click', async () => {

        const isValid = formValidationBeforeSubmit(form);

        if (!isValid) return;

        const user = new User(avatar.src, name.value, lastName.value, email.value, password.value, questionsSelected);
        
        const userSaved = await Storage.saveUser(user);

        if(userSaved) {
            alert('Usuario creado con éxito');
            form.reset();
            Storage.setToSessionStorage('userId', user.id);
            Storage.setCurrentPage(Storage.viewPage.home);
        } else {
            alert('Error al crear el usuario');
        }
    });


    const formValidationBeforeSubmit = () => {

        let isValid = true;

        if(name.value === ''){
            name.setCustomValidity('El nombre es obligatorio');
            isValid = false;
        } else if (name.validationMessage !== '') {
            isValid = false;
        }

        if(lastName.value === ''){
            lastName.setCustomValidity('El apellido es obligatorio');
            isValid = false;
        } else if (lastName.validationMessage !== '') {
            isValid = false;
        }

        if(email.value === ''){
            email.setCustomValidity('El correo electrónico es obligatorio');
            isValid = false;
        } else if (email.validationMessage !== '') {
            isValid = false;
        }

        if(password.value === ''){
            password.setCustomValidity('La clave es obligatoria');
            isValid = false;
        } else if (password.validationMessage !== '') {
            isValid = false;
        }

        if(repeatPassword.value === ''){
            repeatPassword.setCustomValidity('Debe repetir la clave');
            isValid = false;
        } else if (repeatPassword.validationMessage !== '') {
            isValid = false;
        }

        if(securityQuestionSelectedValue === 0){
            securityAnswer.setCustomValidity('Debe seleccionar 3 preguntas de seguridad');
            isValid = false;
        } else if (securityAnswer.validationMessage !== '') {
            isValid = false;
        }

        if(questionsSelected.length < 3){
            securityAnswer.setCustomValidity('Debe seleccionar 3 preguntas de seguridad');
            isValid = false;
        } else if (securityAnswer.validationMessage !== '') {
            isValid = false;
        }

        if (!isValid) {
            nameMessage.innerText = name.validationMessage;
            lastNameMessage.innerText = lastName.validationMessage;
            emailMessage.innerText = email.validationMessage;
            passwordMessage.innerText = password.validationMessage;
            repeatPasswordMessage.innerText = repeatPassword.validationMessage;
            securityMessage.innerText = securityAnswer.validationMessage;
        }

        return isValid;

    }

}

const checkPassword = (password, repeatPassword) => {
    if (password !== repeatPassword) {
        return false;
    }
    return true;
}