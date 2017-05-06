// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var myRequest = 'Florida';

// 2. Skill Code =======================================================================================================


var Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context);

  // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
  // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    console.log('launched backlog');
    this.emit(':tell', 'You can add stories by saying add');
  },

  'Add': function () {
    console.log('in add');
    var intentObj = this.event.request.intent;
    var story = intentObj.slots.Story.value;
    console.log('raw story: ' + story);
    if (!story) {
      story = '';
    }
    if (story.length > 0) {
      story = story.substr(story.indexOf(" ") + 1).trim();
      if (story.toUpperCase() === 'ADD') {
        story = '';
      }
    }
    console.log('normalized story: ' + story);
    if (!story) {
      var slotToElicit = 'Story';
      var speechOutput = 'What story would you like to add?';
      var repromptSpeech = speechOutput;
      var updatedIntent = this.event.request.intent;
      console.log("attempting to elicit story");
      try {
        this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech, updatedIntent);
        console.log('elicit slot worked');
      } catch (err) {
        console.log("error elicit slot " + err);
      }

    } else {
      console.log('attempting to tell story');
      this.emit(':tell', 'My story is really ' + story);
    }

    /*
    httpsGet(myRequest,  (myResult) => {
            console.log("sent     : " + myRequest);
            console.log("received : " + myResult);

            this.emit(':tell', 'The population of ' + myRequest + ' is ' + myResult );

        }
    );
    */

  }
};