const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatKit = new Chatkit.default({
    instanceLocator: 'v1:us1:b18b6343-0325-4d0d-8648-eb9b46dd1cba',
    key: 'b05cfc46-3047-438f-a4f6-02accb02d4e9:LlCfCQoQc/0ohs4m4coSOdtB6KOIEYYMQkQHE/ms+8A='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const username = req.body.username

    chatKit.createUser({
        id: username,
        name: username,
    })
    .then(() => res.status(201).json({res: 'success'}))
    .catch((err) => {
        if (err.error === 'services/chatkit/user_already_exists') {
            //res.sendStatus(200)
            res.status(500).json({res: 'user_already_exists'})
        } else {
            //res.status(err.error_description).json(error)
            res.sendStatus(err.error_description)
        }
    })
})

app.post('/auth', (req, res) => {
    const authData = chatKit.authenticate({
        userId: req.query.user_id
    });

    res.status(authData.status).send(authData.body);
})

const PORT = 3001
app.listen(PORT, err => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})
