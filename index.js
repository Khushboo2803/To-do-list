require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

const routes = {
    register: require('./routes/registeration')
}

app.use('/register', routes.register);
app.use('*', (req, res) => {
    res.json({
        status: 'error',
        message: 'landed unauthorised'
    })
})

app.listen(process.env.PORT, () => console.log(process.env.PORT));