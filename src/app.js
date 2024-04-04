import Storage from './storage/app-storage.js';
import {renderPage} from './use-cases/index.js';

export const App = (selector) => {

    const app = document.querySelector(selector);

    (() => {
        Storage.init();
        renderPage(app);
    })();
}