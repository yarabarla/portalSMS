require('dotenv').config();
const Nightmare = require('nightmare');
const co = require('co');
const nightmare = Nightmare({ show: true})
const app = require('express')();
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const client = Promise.promisifyAll(require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/incoming', (req, res) => {
  const to = req.body.From;
  var answer;

  if (req.body.Body.split(' ')[0] === 'Ask:') {
//    search.askWolfie(req.body.Body.split(' ').slice(1).join(' ')).then(res => {
      answer = res;
//    })
  }
 // console.log(answer)
  sendMessage(answer, to, process.env.TWILIO_NUMBER);
});

function sendMessage(body, to, from) {
  client.sms.messages.create({
    body: body,
    to: to,
    from: from
  }).then(sms => console.log(sms.body))
    .catch(err => console.log(err))
}

app.listen(4000, () => console.log('Started server'));*/

function askWolfie(question) {
  return co(function* () {

    yield nightmare
      .goto('http://wolframalpha.com')
      .insert('#query', question)
      .type('#query', '\r')
      .wait('#Input > section > div.output.ng-scope.isProduct > div');

    if (yield nightmare.exists('#didyoumean')) {
      yield nightmare.end();
      return 'Error, input not understood';
    }

    var exists = yield nightmare.exists('#Result > section > footer > div > button.plaintext.ng-isolate-scope');

    var result;

    if (exists) {
      result = yield nightmare
        .click('#Result > section > footer > div > button.plaintext.ng-isolate-scope')
        .evaluate(function () {
          return document.querySelector('#plaintext').innerHTML;
        })
    } else {
      result = yield nightmare
        .click('#Input > section > footer > div > button.plaintext.ng-isolate-scope')
        .evaluate(function () {
          return document.querySelector('#moutput').innerHTML;
        })
    }

    yield nightmare.end()
    return result;
  });
}

