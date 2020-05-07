const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');
const config_data = require('./config.json')

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('Server is running');
});

app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey(config_data.SENDGRID_API_KEY);
    const msg = {
        to: 'siddharthuncc@gmail.com',
        from: 'siddharthuncc@gmail.com',
        subject: req.body.email + ' sent from Portfolio Website Contact',
        text: req.body.message
    }

    sendGrid.send(msg).then(result => {
        res.status(200).json({
            success: true
        });
    })
    .catch(err => {
        console.log('error: ', err);
        res.status(401).json({
            success: false
        });
    });
});

app.listen(3040);