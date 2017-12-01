'use strict';

const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();


app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(fallback('index.html', { root: 'public' }));
app.use(body.json());
app.use(cookie());

app.post('/signup', function (req, res) {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;
    if (
        !email || !login || !password ||
        !email.match(/@/) ||
        !login.match(/^\S{4,}$/) ||
        !password.match(/^\S{4,}$/)

    ) {
        return res.status(400).json({ error: 'Невалидные данные пользователя' });
    }
    if (users[login]) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const id = uuid();
    ids[id] = login;
    users[login] = { password, email, score: 0 };


    res.cookie('cookie', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.json({ id });
});

app.post('/signin', function (req, res) {
    const login = req.body.login;
    const password = req.body.password;

    if (!password || !login) {
        return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
    }
    if (!users[login] || users[login].password !== password) {
        return res.status(400).json({ error: 'Неверный E-Mail и/или пароль' });
    }

    const id = uuid();
    ids[id] = login;

    res.cookie('cookie', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(201).json({ id });
});

app.get('/currentUser', function (req, res) {
    const id = req.cookies['cookie'];
    const login = ids[id];
    if (!login || !users[login]) {
        return res.status(401).end();
    }

    res.json({ id });
});

app.delete('/signout', function (req, res) {
    res.cookie('cookie', null, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(200).json(null);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});