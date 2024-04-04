import Storage from '../storage/app-storage.js';
import {LoginPage, SignupPage, WelcomePage, HomePage} from '../pages/index.js';

let appContainer = null;

export const renderPage = (HTMLContainer) => {
    if(!appContainer) {
        appContainer = HTMLContainer;
    }
    if(!appContainer) {
        throw new Error('The selector provided does not match any DOM element');
    }

    const currentPage = Storage.getCurrentPage();

    switch(currentPage) {
        case Storage.viewPage.welcome: 
            WelcomePage(appContainer);
            document.title = 'Make It - Bienvenido';
        break;
        case Storage.viewPage.login: 
            LoginPage(appContainer);
            document.title = 'Make It - Inicia Sesión';
        break;
        case Storage.viewPage.signup: 
            SignupPage(appContainer);
            document.title = 'Make It - Regístrate';
        break;
        case Storage.viewPage.home: 
            HomePage(appContainer);
            document.title = 'Make It - Inicio';
        break;
        default: 
            appContainer.innerHTML = '404';
            document.title = 'Make It - 404';
        break;
    }

}