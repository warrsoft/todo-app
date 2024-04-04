import { v4 as uuidv4 } from 'uuid';

export class User {

    /**
     * 
     * @param {String} name 
     * @param {String} lastName 
     * @param {String} email 
     * @param {String} password 
     * @param {Object} securityQuestion 
     */

    constructor(avatar, name, lastName, email, password, securityQuestions) {
        this.id = uuidv4();
        this.avatar = avatar;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.securityQuestions = securityQuestions;
    }
}