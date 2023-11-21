const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'secret123';

app.use(cors());

app.use(bodyParser.json());

const users = []

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log(user)
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Неверные учетные данные' });
    }
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (users.some(u => u.email === email)) {
        res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    } else {
        users.push({ email, password });
        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
