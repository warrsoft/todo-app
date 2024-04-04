import HTMLLayout from '../components/layout.html?raw';
import Storage from '../storage/app-storage.js';
import { renderPage } from './render-page.js';

export const renderLayout = (appContainer, headerTitle, iconObject, mainContent, footerContent) => {
    appContainer.innerHTML = HTMLLayout;

    const layoutHeader = appContainer.querySelector('.layout__header');
    const layoutMain = appContainer.querySelector('.layout__main');
    const layoutFooter = appContainer.querySelector('.layout__footer');

    const Title = layoutHeader.querySelector('.layout__header--title');

    const headerBtnAnchor = layoutHeader.querySelector('.layout__header--btn');
    const headerBtnIcon = headerBtnAnchor.querySelector('.icon');

    Title.innerText = headerTitle;

    headerBtnIcon.src = iconObject.src;
    headerBtnIcon.alt = iconObject.alt;

    headerBtnAnchor.addEventListener('click', () => {
        Storage.setCurrentPage(Storage.viewPage.welcome);
        renderPage();
    })

    layoutMain.appendChild(mainContent);
    layoutFooter.appendChild(footerContent);
}