import {renderPage} from '../use-cases/index.js';

const baseURL = 'https://todo-json-server-f999faa0e6a0.herokuapp.com';

const paths = {
    securityQuestions: '/security-questions',
    users: '/users',
    defaultGroups: 'default-groups'
}

const State = {
    page: '',
    user: null,
}

const viewPage = {
    welcome: 'welcome',
    login: 'login',
    signup: 'signup',
    home: 'home',
}

const getFromServer = async (path) => {
    const response = await fetch(`${baseURL}${path}`);
    const data = await response.json();
    return data;
}

const saveUser = async (user) => {
    try {
        const request = await fetch(`${baseURL}${paths.users}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await request.json();
        return data;

    } catch {
        return false;
    }
}

const getUser = async (id) => {
    const request = await fetch(`${baseURL}${paths.users}/${id}`);
    const data = await request.json();
    return data;
}

const deleteUser = async (id) => {
    const request = await fetch(`${baseURL}${paths.users}/${id}`, {
        method: 'DELETE'
    })
    
    const data = await request.json();
}

let securityQuestionsData = '';

const getSecurityQuestionsData = () => {
    return securityQuestionsData;
}

const removeQuestion = (index) => {
    if(index <= 0) return;
    securityQuestionsData.splice(index - 1, 1);
}


const init = () => {
    loadStorage();
}

const loadStorage = async () => {
    const user = getFromSessionStorage('userId');
    if(user) {
        State.page = viewPage.home;
        State.user = user;
    } else {
        State.page = viewPage.welcome;
    }
    securityQuestionsData = await getFromServer(paths.securityQuestions);
}

const getFromSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}

const setToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

const getCurrentPage = () => {
    return State.page;
}

const setCurrentPage = (page) => {
    if(!Object.values(viewPage).includes(page)) {
        console.log('Invalid page name provided');
        return;
    }
    if(State.page !== page) {
        State.page = page;
    }
    renderPage();
}

export default{
    init,
    viewPage,
    getCurrentPage,
    setCurrentPage,
    getSecurityQuestionsData,
    removeQuestion,
    saveUser,
    setToSessionStorage,
    getFromSessionStorage,
    getUser
}