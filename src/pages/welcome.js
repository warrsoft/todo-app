import HTMLWelcomePage from '../components/welcome.html?raw';
import Storage from '../storage/app-storage.js';

export const WelcomePage = (appContainer) => {

    appContainer.innerHTML = HTMLWelcomePage;

    const loginButton = appContainer.querySelector('#cta--login__btn');
    const signupButton = appContainer.querySelector('#cta--signup__btn');

    loginButton.addEventListener('click', () => {
        Storage.setCurrentPage(Storage.viewPage.login);
    });

    signupButton.addEventListener('click', () => {
        Storage.setCurrentPage(Storage.viewPage.signup);
    });
}