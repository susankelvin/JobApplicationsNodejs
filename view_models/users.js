'use strict';

function Base(username, title) {
    this.username = username || '';
    this.title = title || '';
}

function Registration(username) {
    Base.call(this, username, 'Register');
}

Registration.prototype = Object.create(Base.prototype);
Registration.prototype.constructor = Registration;

function Login(username) {
    Base.call(this, username, 'Login');
}

Login.prototype = Object.create(Base.prototype);
Login.prototype.constructor = Login;

module.exports = {
    Registration: Registration,
    Login: Login
};
