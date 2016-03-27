require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const client = Promise.promisifyAll(require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/incoming', (req, res) => {
  const to = req.body.From;
  sendMessage("Testing", to, process.env.TWILIO_NUMBER);
});

function sendMessage(body, to, from) {
  client.sms.messages.create({
    body: body,
    to: to,
    from: from
  }).then(sms => console.log(sms.body))
    .catch(err => console.log(err))
}

app.listen(4000, () => console.log('Started server'));
