import Storage from '../storage/app-storage.js';

export const HomePage = async (appContainer) => {
    const userId = Storage.getFromSessionStorage('userId');

    const user = await Storage.getUser(userId);

    const name = document.createElement('h1');
    name.innerText = `Bienvenido ${user.name}`;


    const logoutBtn = document.createElement('button');
    logoutBtn.innerText = 'Cerrar Sesión';

    appContainer.innerHTML = '';
    appContainer.append(name, logoutBtn);







    logoutBtn.addEventListener('click', () => {
        Storage.setToSessionStorage('userId', null);
        Storage.setCurrentPage(Storage.viewPage.welcome);
    });

}