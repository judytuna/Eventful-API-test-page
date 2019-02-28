const inquirer = require('inquirer');
const fetch = require('node-fetch');

const eventfulClient = require('./eventfulAPI');

const app = {};

app.startQuestion = (closeConnectionCallback) => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'Complete a sentence',
      'List all events',
      'Input a new event',
      'Call out to Eventful',
      'Call out to Eventful then save the top event locally',
      'Exit'
    ],
    name:'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion(closeConnectionCallback);

    if (res.action === 'Complete a sentence') app.completeSentence(continueCallback);
    if (res.action === 'List all events') app.getAllEvents(continueCallback);
    if (res.action === 'Input a new event') app.inputNewEvent(continueCallback);
    if (res.action === 'Call out to Eventful') app.callOutToEventful(continueCallback);
    if (res.action === 'Call out to Eventful then save the top event locally') app.callOutToEventfulAndSave(continueCallback);

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
  fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(json => console.log(json));
}

app.inputNewEvent = (continueCallback) => {
  const questions = [{
    type: 'input',
    name: 'title',
    message: 'what is this event called?',
    default: 'dance party'
  }, {
    type: 'input',
    name: 'city',
    message: 'what city?',
    default: 'Pawtucket'
  }];

  inquirer.prompt(questions).then(answers => {
    const postBody = {
      title: answers.title,
      city: answers.city
    };
    console.log(postBody);

    fetch('http://localhost:3000/events', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => console.log(json));
  });
}

app.callOutToEventful = (continueCallback) => {
  eventfulClient.searchEvents({
    keywords: 'tango',
    location: 'San Francisco',
    date: "Next Week"
  }, function(err, data){
     if(err){
       return console.error(err);
     }
     let resultEvents = data.search.events.event;
     console.log('Received ' + data.search.total_items + ' events');
     console.log('Event listings: ');
     for ( let i =0 ; i < resultEvents.length; i++){
       console.log("===========================================================")
       console.log('title: ',resultEvents[i].title);
       console.log('start_time: ',resultEvents[i].start_time);
       console.log('venue_name: ',resultEvents[i].venue_name);
       console.log('venue_address: ',resultEvents[i].venue_address);
     }
  });
}

app.callOutToEventfulAndSave = (continueCallback) => {
  eventfulClient.searchEvents({
    keywords: 'comedy',
    location: 'San Francisco',
    date: "Next Week"
  }, function(err, data){
     if(err){
       return console.error(err);
     }
     let resultEvents = data.search.events.event;
     console.log(resultEvents);
     let oneEvent = resultEvents[0];
     let postBody = JSON.stringify({
      title: oneEvent.title,
      city: oneEvent.city_name
    })

     fetch('http://localhost:3000/events', {
       method: 'POST',
       body: postBody,
       headers: { 'Content-Type': 'application/json' }
      })
       .then(res => res.json())
       .then(json => console.log(json));
    }
  )
}

module.exports = app;
