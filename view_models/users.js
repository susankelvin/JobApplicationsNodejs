'use strict';

function Base(username, antiforgeryToken) {
    this.username = username || '';
    this.antiforgeryToken = antiforgeryToken || '';
}

function Registration(username, antiforgeryToken) {
    Base.call(this, username, antiforgeryToken);
}

Registration.prototype = Object.create(Base.prototype);
Registration.prototype.constructor = Registration;

function Login(username, antiforgeryToken) {
    Base.call(this, username, antiforgeryToken);
}

Login.prototype = Object.create(Base.prototype);
Login.prototype.constructor = Login;

module.exports = {
    Registration: Registration,
    Login: Login
};
