const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = express.json();
const {validateUser} = require('./mw/validation.mw');
const UserController = require('./controllers/User.controller');
const getUserInstance = require('./mw/getUserInstance.mw')
const { ValidationError } = require('yup');

const PORT = 4000;

const server = http.createServer(app);

app.post('/users', bodyParser, validateUser, UserController.createUser); 
app.post('/users/:userId', bodyParser, getUserInstance, UserController.loginUser);
app.get('/users', UserController.getAllUsers);
app.get('/users/:userId', getUserInstance, UserController.getOneUser);
app.put('/users/:userId', bodyParser, getUserInstance, UserController.updateUser);
app.delete('/users/:userId', getUserInstance, UserController.deleteUser);

const errorHandler = async (err, req, res, next) => {
    if (err instanceof TypeError) {
        return res.status(400).send('Invalid request')
    }
    if (err instanceof ValidationError) {
        return res.status(401).send(err.message);
    } 
    res.status(404).send();
}

app.use(cors());
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`App is started on port ${PORT}`)
});