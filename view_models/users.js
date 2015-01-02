'use strict';

function Base(username, title, antiforgeryToken) {
    this.username = username || '';
    this.title = title || '';
    this.antiforgeryToken = antiforgeryToken || '';
}

function Registration(username, antiforgeryToken) {
    Base.call(this, username, 'Register', antiforgeryToken);
}

Registration.prototype = Object.create(Base.prototype);
Registration.prototype.constructor = Registration;

function Login(username, antiforgeryToken) {
    Base.call(this, username, 'Login', antiforgeryToken);
}

Login.prototype = Object.create(Base.prototype);
Login.prototype.constructor = Login;

module.exports = {
    Registration: Registration,
    Login: Login
};
