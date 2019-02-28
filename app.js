const inquirer = require('inquirer');
const fetch = require('node-fetch');

const app = {};

app.startQuestion = (closeConnectionCallback) => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'Complete a sentence',
      'List all events',
      'Exit'
    ],
    name:'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'Complete a sentence') app.completeSentence(continueCallback);
    if (res.action === 'List all events') app.getAllEvents(continueCallback);

    if (res.action === 'Exit') {
      closeConnectionCallback();
      return;
    }
  })
}

app.completeSentence = (continueCallback) => {
  //YOUR WORK HERE
  console.log('Please write code for this function');
  //End of your work
  continueCallback();
}

app.getAllEvents = (continueCallback) => {
  console.log('Please write code for this function');
}

module.exports = app;
