require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected')
);
const app = express();

app.use(bodyParser.json())

const routes = {
    login: require('./routes/login'),
    register: require('./routes/registeration'),
    verify: require('./routes/verify')
}

app.use('/register', routes.register);
app.use('/verify', routes.verify);
app.use('/login', routes.login);
app.use('*', (req, res) => {
    res.json({
        status: 'error',
        message: 'landed unauthorised'
    })
})

app.listen(process.env.PORT, () => console.log(process.env.PORT));