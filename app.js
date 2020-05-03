const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');

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
    sendGrid.setApiKey('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');
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

app.listen(3040, '0.0.0.0');